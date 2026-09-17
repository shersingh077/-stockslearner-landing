import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY;

    if (!url || !secretKey) {
      console.error("Supabase environment variables are missing.");

      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    const supabase = createClient(url, secretKey);

    const body = await request.json();

    const full_name = String(body.full_name || "").trim();
    const mobile = String(body.mobile || "").trim();
    const email = String(body.email || "").trim();
    const city = String(body.city || "").trim();
    const requirement = String(body.requirement || "").trim();
    const password = String(body.password || "");

    if (!full_name || !mobile || !password) {
      return NextResponse.json(
        {
          error: "Name, mobile number and password are required.",
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

    if (password.length < 6) {
      return NextResponse.json(
        {
          error: "Password must be at least 6 characters.",
        },
        { status: 400 }
      );
    }

    const { data: existingClient, error: checkError } = await supabase
      .from("clients")
      .select("id")
      .eq("mobile", mobile)
      .maybeSingle();

    if (checkError) {
      console.error("CHECK CLIENT ERROR:", checkError);

      return NextResponse.json(
        {
          error: `Database check failed: ${checkError.message}`,
        },
        { status: 500 }
      );
    }

    if (existingClient) {
      return NextResponse.json(
        {
          error: "This mobile number is already registered.",
        },
        { status: 409 }
      );
    }

    const password_hash = await bcrypt.hash(password, 12);

    const { data, error: insertError } = await supabase
      .from("clients")
      .insert({
        full_name,
        mobile,
        email: email || null,
        city: city || null,
        requirement: requirement || null,
        password_hash,
      })
      .select("id, full_name, mobile, email, city, requirement, created_at")
      .single();

    if (insertError) {
      console.error("INSERT CLIENT ERROR:", insertError);

      return NextResponse.json(
        {
          error: `Database save failed: ${insertError.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful.",
        client: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

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