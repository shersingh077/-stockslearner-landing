import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

function createAdminToken() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET is missing.");
  }

  const payload = "admin";

  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let password = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      password = String(body?.password || "");
    } else {
      const formData = await request.formData();
      password = String(formData.get("password") || "");
    }

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD is missing from .env.local" },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "Incorrect admin password." },
        { status: 401 }
      );
    }

    const token = createAdminToken();

    const response = NextResponse.json({
      success: true,
      message: "Admin login successful.",
    });

    response.cookies.set({
      name: "admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Admin login failed.",
      },
      { status: 500 }
    );
  }
}
