import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";

export const runtime = "nodejs";

function verifyClientToken(token: string) {
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

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();

    const clientToken =
      cookieStore.get("client_session")?.value;

    const adminToken =
      cookieStore.get("admin_session")?.value;

    const clientId = clientToken
      ? verifyClientToken(clientToken)
      : null;

    const adminAccess = isAdmin(adminToken);

    if (!clientId && !adminAccess) {
      return NextResponse.json(
        { error: "Login required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json(
        { error: "File path is required." },
        { status: 400 }
      );
    }

    if (
      path.includes("..") ||
      path.startsWith("/") ||
      path.includes("\\")
    ) {
      return NextResponse.json(
        { error: "Invalid file path." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    );

    /*
     * Client केवल अपनी screenshot देख सकता है.
     * Admin सभी screenshots देख सकता है.
     */

    if (clientId && !adminAccess) {
      const { data: message, error } = await supabase
        .from("chat_messages")
        .select("id")
        .eq("client_id", clientId)
        .eq("attachment_url", path)
        .maybeSingle();

      if (error || !message) {
        return NextResponse.json(
          { error: "File not found." },
          { status: 404 }
        );
      }
    }

    const { data, error } = await supabase.storage
      .from("payment-screenshots")
      .createSignedUrl(path, 300);

    if (error || !data?.signedUrl) {
      console.error(
        "SIGNED URL ERROR:",
        error
      );

      return NextResponse.json(
        {
          error:
            error?.message ||
            "Unable to open screenshot.",
        },
        { status: 500 }
      );
    }

    return NextResponse.redirect(data.signedUrl);
  } catch (error) {
    console.error("CHAT FILE ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to open file.",
      },
      { status: 500 }
    );
  }
}
