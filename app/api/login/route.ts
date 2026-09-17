import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

function createSessionToken(clientId: string) {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET is missing.");
  }

  const payload = Buffer.from(clientId).toString("base64url");

  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export async function POST(request: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY;

    if (!url || !secretKey) {
      return NextResponse.json(
        { error: "Supabase configuration is missing." },
        { status: 500 }
      );
    }

    const supabase = createClient(url, secretKey);

    const body = await request.json();

    const mobile = String(body.mobile || "").trim();
    const password = String(body.password || "");

    if (!mobile || !password) {
      return NextResponse.json(
        {
          error: "Mobile number and password are required.",
        },
        { status: 400 }
      );
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return NextResponse.json(
        {
          error: "Please enter a valid 10 digit mobile number.",
        },
        { status: 400 }
      );
    }

    const { data: client, error } = await supabase
      .from("clients")
      .select(
        "id, full_name, mobile, email, city, requirement, password_hash"
      )
      .eq("mobile", mobile)
      .maybeSingle();

    if (error) {
      console.error("LOGIN DATABASE ERROR:", error);

      return NextResponse.json(
        {
          error: "Database error: " + error.message,
        },
        { status: 500 }
      );
    }

    if (!client) {
      return NextResponse.json(
        {
          error: "Mobile number or password is incorrect.",
        },
        { status: 401 }
      );
    }

    if (!client.password_hash) {
      return NextResponse.json(
        {
          error: "Password is not configured for this account.",
        },
        { status: 500 }
      );
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      client.password_hash
    );

    if (!passwordCorrect) {
      return NextResponse.json(
        {
          error: "Mobile number or password is incorrect.",
        },
        { status: 401 }
      );
    }

    const token = createSessionToken(client.id);

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    });

    response.cookies.set("client_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
