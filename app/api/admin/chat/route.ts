import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";

export const runtime = "nodejs";

function isAdmin(token?: string) {
  if (!token || !process.env.SESSION_SECRET) return false;

  const parts = token.split(".");

  if (parts.length !== 2) return false;

  const [payload, signature] = parts;

  if (payload !== "admin") return false;

  const expected = crypto
    .createHmac("sha256", process.env.SESSION_SECRET)
    .update(payload)
    .digest("base64url");

  return signature === expected;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  return createClient(url, secretKey);
}

async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  return isAdmin(token);
}

export async function GET(request: Request) {
  try {
    const admin = await checkAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Admin login required." },
        { status: 401 }
      );
    }

    const supabase = getSupabase();

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("client_id");

    if (!clientId) {
      const { data, error } = await supabase
        .from("clients")
        .select(
          "id, full_name, mobile, email, city"
        )
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        clients: data || [],
      });
    }

    const { data, error } = await supabase
      .from("chat_messages")
      .select(`
        id,
        client_id,
        sender_type,
        message,
        created_at,
        attachment_url,
        attachment_name,
        payment_utr,
        message_type
      `)
      .eq("client_id", clientId)
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      console.error(
        "ADMIN CHAT GET ERROR:",
        error
      );

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
    console.error(
      "ADMIN CHAT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load admin chat.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const admin = await checkAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Admin login required." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const clientId = String(
      body?.client_id || ""
    ).trim();

    const message = String(
      body?.message || ""
    ).trim();

    if (!clientId || !message) {
      return NextResponse.json(
        {
          error:
            "Client and message are required.",
        },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("chat_messages")
      .insert({
        client_id: clientId,
        sender_type: "admin",
        message,
        message_type: "text",
      })
      .select(`
        id,
        client_id,
        sender_type,
        message,
        created_at,
        attachment_url,
        attachment_name,
        payment_utr,
        message_type
      `)
      .single();

    if (error) {
      console.error(
        "ADMIN CHAT POST ERROR:",
        error
      );

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
    console.error(
      "ADMIN CHAT POST ERROR:",
      error
    );

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
