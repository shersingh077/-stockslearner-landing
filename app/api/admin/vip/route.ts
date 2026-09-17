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

    const contentType =
      request.headers.get("content-type") || "";

    let clientId = "";
    let plan = "";
    let paymentStatus = "pending";
    let paymentMethod = "";
    let utr = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();

      clientId = String(body?.client_id || "").trim();
      plan = String(body?.plan || "").trim();
      paymentStatus = String(
        body?.payment_status || "pending"
      ).trim();
      paymentMethod = String(
        body?.payment_method || ""
      ).trim();
      utr = String(body?.utr || "").trim();
    } else {
      const formData = await request.formData();

      clientId = String(
        formData.get("client_id") || ""
      ).trim();

      plan = String(
        formData.get("plan") || ""
      ).trim();

      paymentStatus = String(
        formData.get("payment_status") || "pending"
      ).trim();

      paymentMethod = String(
        formData.get("payment_method") || ""
      ).trim();

      utr = String(
        formData.get("utr") || ""
      ).trim();
    }

    if (!clientId || !plan) {
      return NextResponse.json(
        { error: "Client and VIP plan are required." },
        { status: 400 }
      );
    }

    const plans: Record<
      string,
      {
        name: string;
        price: number;
        days: number;
      }
    > = {
      "1_month": {
        name: "1 Month",
        price: 4999,
        days: 30,
      },

      "3_months": {
        name: "3 Months",
        price: 9999,
        days: 90,
      },

      "1_year": {
        name: "1 Year",
        price: 19999,
        days: 365,
      },
    };

    const selectedPlan = plans[plan];

    if (!selectedPlan) {
      return NextResponse.json(
        { error: "Invalid VIP plan." },
        { status: 400 }
      );
    }

    if (
      !["pending", "verified", "rejected"].includes(
        paymentStatus
      )
    ) {
      return NextResponse.json(
        { error: "Invalid payment status." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    );

    /*
     * Payment verified होने पर ही VIP activate होगा.
     */

    if (paymentStatus === "verified") {
      const startDate = new Date();

      const expiryDate = new Date(startDate);

      expiryDate.setDate(
        expiryDate.getDate() + selectedPlan.days
      );

      const { error } = await supabase
        .from("clients")
        .update({
          is_vip: true,
          vip_plan: selectedPlan.name,
          vip_start_date: startDate.toISOString(),
          vip_expiry_date: expiryDate.toISOString(),
          payment_status: "verified",
          payment_id: utr || null,
          vip_utr: utr || null,
          vip_payment_method: paymentMethod || null,
          vip_verified_at: startDate.toISOString(),
          vip_verified_by: "admin",
        })
        .eq("id", clientId);

      if (error) {
        console.error("VIP ACTIVATION ERROR:", error);

        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      if (contentType.includes("application/json")) {
        return NextResponse.json({
          success: true,
          status: "verified",
          message: "VIP activated successfully.",
        });
      }

      return NextResponse.redirect(
        new URL(
          `/admin/vip/${clientId}?success=activated`,
          request.url
        )
      );
    }

    /*
     * Pending या rejected payment में VIP active नहीं होगा.
     */

    const { error } = await supabase
      .from("clients")
      .update({
        is_vip: false,
        vip_plan: selectedPlan.name,
        payment_status: paymentStatus,
        payment_id: utr || null,
        vip_utr: utr || null,
        vip_payment_method: paymentMethod || null,
      })
      .eq("id", clientId);

    if (error) {
      console.error("VIP PAYMENT UPDATE ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (contentType.includes("application/json")) {
      return NextResponse.json({
        success: true,
        status: paymentStatus,
        message: "VIP payment status updated successfully.",
      });
    }

    return NextResponse.redirect(
      new URL(
        `/admin/vip/${clientId}?success=updated`,
        request.url
      )
    );
  } catch (error) {
    console.error("ADMIN VIP ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "VIP update failed.",
      },
      { status: 500 }
    );
  }
}
