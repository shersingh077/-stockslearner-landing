import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";

export const runtime = "nodejs";

function getClientId(token: string) {
  const secret = process.env.SESSION_SECRET;

  if (!secret) return null;

  const parts = token.split(".");

  if (parts.length !== 2) return null;

  const [payload, signature] = parts;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  if (signature !== expected) return null;

  try {
    return Buffer.from(payload, "base64url").toString("utf8");
  } catch {
    return null;
  }
}

async function getClientIdFromSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("client_session")?.value;

  if (!token) return null;

  return getClientId(token);
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  return createClient(url, secretKey);
}

export async function GET() {
  try {
    const clientId = await getClientIdFromSession();

    if (!clientId) {
      return NextResponse.json(
        { error: "Please login first." },
        { status: 401 }
      );
    }

    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("chat_messages")
      .select(
        "id, sender_type, message, created_at, attachment_url, attachment_name, payment_utr, message_type, enquiry_type"
      )
      .eq("client_id", clientId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("CHAT GET ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messages: data || [],
    });
  } catch (error) {
    console.error("CHAT GET ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load chat.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const clientId = await getClientIdFromSession();

    if (!clientId) {
      return NextResponse.json(
        { error: "Please login first." },
        { status: 401 }
      );
    }

    const contentType = request.headers.get("content-type") || "";

    let message = "";
    let paymentUtr = "";
    let attachmentUrl: string | null = null;
    let attachmentName: string | null = null;
    let messageType = "text";
    let enquiryType = "general";

    const supabase = getSupabase();

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      message = String(
        formData.get("message") || ""
      ).trim();

      paymentUtr = String(
        formData.get("payment_utr") || ""
      ).trim();

      const file = formData.get("screenshot");

      if (file instanceof File && file.size > 0) {
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            {
              error:
                "Only JPG, PNG and WEBP screenshots are allowed.",
            },
            { status: 400 }
          );
        }

        if (file.size > 5 * 1024 * 1024) {
          return NextResponse.json(
            {
              error:
                "Screenshot size must be less than 5 MB.",
            },
            { status: 400 }
          );
        }

        const extension =
          file.type === "image/png"
            ? "png"
            : file.type === "image/webp"
            ? "webp"
            : "jpg";

        const fileName = `${clientId}/${crypto.randomUUID()}.${extension}`;

        const fileBuffer = Buffer.from(
          await file.arrayBuffer()
        );

        const { error: uploadError } =
          await supabase.storage
            .from("payment-screenshots")
            .upload(fileName, fileBuffer, {
              contentType: file.type,
              upsert: false,
            });

        if (uploadError) {
          console.error(
            "SCREENSHOT UPLOAD ERROR:",
            uploadError
          );

          return NextResponse.json(
            {
              error:
                "Screenshot upload failed: " +
                uploadError.message,
            },
            { status: 500 }
          );
        }

        attachmentUrl = fileName;
        attachmentName = file.name;
        messageType = "payment";
      }
    } else {
      const body = await request.json();

      message = String(
        body?.message || ""
      ).trim();

      paymentUtr = String(
        body?.payment_utr || ""
      ).trim();
    }

    if (!message && !paymentUtr && !attachmentUrl) {
      return NextResponse.json(
        {
          error:
            "Message, UTR or screenshot is required.",
        },
        { status: 400 }
      );
    }

    if (paymentUtr || attachmentUrl) {
      messageType = "payment";
    }

    if (
      message.toLowerCase().includes("investment") ||
      message.includes("Investment Plan") ||
      message.includes("₹25,000") ||
      message.includes("₹50,000") ||
      message.includes("₹1,00,000") ||
      message.includes("₹2,00,000") ||
      message.includes("₹3,00,000") ||
      message.includes("₹5,00,000")
    ) {
      enquiryType = "investment";
    }

    const finalMessage =
      message ||
      "Payment details submitted.";

    const { data, error } = await supabase
      .from("chat_messages")
      .insert({
        client_id: clientId,
        sender_type: "client",
        message: finalMessage,
        attachment_url: attachmentUrl,
        attachment_name: attachmentName,
        payment_utr: paymentUtr || null,
        message_type: messageType,
        enquiry_type: enquiryType,
      })
      .select(
        "id, sender_type, message, created_at, attachment_url, attachment_name, payment_utr, message_type, enquiry_type"
      )
      .single();

    if (error) {
      console.error("CHAT POST ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: data,
    });
  } catch (error) {
    console.error("CHAT POST ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to send message.",
      },
      { status: 500 }
    );
  }
}
