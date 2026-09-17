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

const plans: Record<
  string,
  {
    amount: number;
    returnAmount: string;
  }
> = {
  "25000": {
    amount: 25000,
    returnAmount: "₹50,000 – ₹1,50,000",
  },
  "50000": {
    amount: 50000,
    returnAmount: "₹1,00,000 – ₹3,00,000",
  },
  "100000": {
    amount: 100000,
    returnAmount: "₹2,00,000 – ₹6,00,000",
  },
  "200000": {
    amount: 200000,
    returnAmount: "₹4,00,000 – ₹12,00,000",
  },
  "300000": {
    amount: 300000,
    returnAmount: "₹6,00,000 – ₹18,00,000",
  },
  "500000": {
    amount: 500000,
    returnAmount: "₹10,00,000 – ₹30,00,000",
  },
};

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!isAdmin(token)) {
      return NextResponse.json(
        { error: "Admin login required." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const clientId = String(body?.client_id || "").trim();
    const plan = String(body?.plan_id || body?.plan || "").trim();
    const rawStatus = String(body?.status || "pending").trim();
    const status = rawStatus === "verified" ? "approved" : rawStatus;
    const utr = String(body?.utr || "").trim();
    const paymentMethod = String(
      body?.payment_method || ""
    ).trim();

    if (!clientId || !plan) {
      return NextResponse.json(
        { error: "Client and investment plan are required." },
        { status: 400 }
      );
    }

    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid investment status." },
        { status: 400 }
      );
    }

    const selectedPlan = plans[plan];

    if (!selectedPlan) {
      return NextResponse.json(
        { error: "Invalid investment plan." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    );

    const updateData: Record<string, unknown> = {
      investment_status: status,
      investment_plan: plan,
      investment_amount: selectedPlan.amount,
      investment_return_amount:
        selectedPlan.returnAmount,
      investment_payment_status: status,
      investment_utr: utr || null,
      investment_payment_method:
        paymentMethod || null,
    };

    if (status === "approved") {
      const startDate = new Date();

      updateData.investment_start_date =
        startDate.toISOString();

      updateData.investment_verified_at =
        startDate.toISOString();

      updateData.investment_verified_by = "admin";
    }

    const { error } = await supabase
      .from("clients")
      .update(updateData)
      .eq("id", clientId);

    if (error) {
      console.error(
        "INVESTMENT UPDATE ERROR:",
        error
      );

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      status,
      message:
        status === "approved"
          ? "Investment approved successfully."
          : status === "rejected"
          ? "Investment rejected."
          : "Investment status updated.",
    });
  } catch (error) {
    console.error(
      "ADMIN INVESTMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Investment update failed.",
      },
      { status: 500 }
    );
  }
}
