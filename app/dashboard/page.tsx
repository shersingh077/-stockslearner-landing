import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

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

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("client_session")?.value;

  if (!token) {
    redirect("/login");
  }

  const clientId = getClientId(token);

  if (!clientId) {
    redirect("/login");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        Server configuration error.
      </main>
    );
  }

  const supabase = createClient(url, secretKey);

  const { data: client, error } = await supabase
    .from("clients")
    .select(`
      full_name,
      mobile,
      email,
      city,
      requirement,
      created_at,
      is_vip,
      vip_plan,
      vip_start_date,
      vip_expiry_date,
      payment_status,
       investment_status,
       investment_plan,
       investment_amount,
       investment_return_amount,
       investment_start_date,
       investment_expiry_date,
       investment_payment_status
    `)
    .eq("id", clientId)
    .maybeSingle();

  if (error || !client) {
    redirect("/login");
  }

  const expiryDate = client.vip_expiry_date
    ? new Date(client.vip_expiry_date)
    : null;

  const vipActive =
    Boolean(client.is_vip) &&
    Boolean(expiryDate) &&
    expiryDate!.getTime() > Date.now();

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-4xl">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Client Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Welcome, {client.full_name}
            </p>
          </div>

          <div className="flex gap-2">
            <a
              href="/chat"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500"
            >
              💬 Help & Contact
            </a>

            <a
              href="/vip"
              className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-bold text-black hover:bg-yellow-400"
            >
              ⭐ VIP
            </a>
          </div>
        </div>

        {/* VIP MEMBERSHIP CARD */}

        <div
          className={`mb-8 rounded-2xl border p-6 shadow-xl ${
            vipActive
              ? "border-yellow-500 bg-yellow-500/10"
              : "border-slate-800 bg-slate-900"
          }`}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold text-slate-400">
                VIP MEMBERSHIP
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {vipActive
                  ? "⭐ VIP ACTIVE"
                  : expiryDate && expiryDate.getTime() <= Date.now()
                  ? "VIP EXPIRED"
                  : "VIP NOT ACTIVE"}
              </h2>

              {vipActive && (
                <p className="mt-2 text-sm text-slate-300">
                  Your VIP membership is currently active.
                </p>
              )}
            </div>

            {!vipActive && (
              <a
                href="/vip"
                className="rounded-lg bg-yellow-500 px-5 py-3 text-center font-bold text-black hover:bg-yellow-400"
              >
                Upgrade to VIP
              </a>
            )}
          </div>

          {vipActive && (
            <div className="mt-6 grid gap-4 border-t border-yellow-500/20 pt-6 sm:grid-cols-3">

              <div className="rounded-lg bg-slate-900/70 p-4">
                <p className="text-xs text-slate-500">
                  VIP PLAN
                </p>

                <p className="mt-1 font-semibold">
                  {client.vip_plan || "-"}
                </p>
              </div>

              <div className="rounded-lg bg-slate-900/70 p-4">
                <p className="text-xs text-slate-500">
                  START DATE
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {client.vip_start_date
                    ? new Date(
                        client.vip_start_date
                      ).toLocaleDateString("en-IN")
                    : "-"}
                </p>
              </div>

              <div className="rounded-lg bg-slate-900/70 p-4">
                <p className="text-xs text-slate-500">
                  EXPIRY DATE
                </p>

                <p className="mt-1 text-sm font-semibold text-yellow-400">
                  {expiryDate
                    ? expiryDate.toLocaleDateString("en-IN")
                    : "-"}
                </p>
              </div>

            </div>
          )}

          {client.payment_status && (
            <div className="mt-4 text-xs text-slate-500">
              Payment Status:{" "}
              <span className="font-semibold text-green-400">
                {client.payment_status}
              </span>
            </div>
          )}
        </div>

        {/* INVESTMENT CARD */}

        {client.investment_status !== "none" && (
          <div className="mb-8 rounded-2xl border border-green-500 bg-green-500/10 p-6 shadow-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-400">
                  INVESTMENT
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {client.investment_status === "approved" || client.investment_status === "verified"
                    ? "💰 INVESTMENT ACTIVE"
                    : client.investment_status === "rejected"
                    ? "❌ INVESTMENT REJECTED"
                    : "⏳ INVESTMENT PENDING"}
                </h2>
              </div>

              <a
                href="/chat"
                className="rounded-lg bg-blue-600 px-5 py-3 text-center font-bold hover:bg-blue-500"
              >
                💬 Chat with Admin
              </a>
            </div>

            <div className="mt-6 grid gap-4 border-t border-green-500/20 pt-6 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-900/70 p-4">
                <p className="text-xs text-slate-500">
                  INVESTMENT PLAN
                </p>
                <p className="mt-1 font-semibold">
                  {client.investment_plan || "-"}
                </p>
              </div>

              <div className="rounded-lg bg-slate-900/70 p-4">
                <p className="text-xs text-slate-500">
                  INVESTMENT AMOUNT
                </p>
                <p className="mt-1 font-semibold">
                  {client.investment_amount
                    ? `₹${Number(client.investment_amount).toLocaleString("en-IN")}`
                    : "-"}
                </p>
              </div>

              <div className="rounded-lg bg-slate-900/70 p-4">
                <p className="text-xs text-slate-500">
                  RETURN AMOUNT
                </p>
                <p className="mt-1 font-semibold text-green-400">
                  {client.investment_return_amount || "-"}
                </p>
              </div>

              <div className="rounded-lg bg-slate-900/70 p-4">
                <p className="text-xs text-slate-500">
                  PAYMENT STATUS
                </p>
                <p className="mt-1 font-semibold capitalize">
                  {client.investment_payment_status || "-"}
                </p>
              </div>
            </div>

            {client.investment_start_date && (
              <p className="mt-4 text-xs text-slate-500">
                Start Date:{" "}
                {new Date(
                  client.investment_start_date
                ).toLocaleDateString("en-IN")}
              </p>
            )}
          </div>
        )}

        {/* PROFILE */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

          <h2 className="mb-6 text-2xl font-semibold">
            Your Profile
          </h2>

          <div className="space-y-4">

            <div className="rounded-lg bg-slate-800 p-4">
              <p className="text-sm text-slate-400">
                Full Name
              </p>

              <p className="mt-1 font-medium">
                {client.full_name}
              </p>
            </div>

            <div className="rounded-lg bg-slate-800 p-4">
              <p className="text-sm text-slate-400">
                Mobile Number
              </p>

              <p className="mt-1 font-medium">
                {client.mobile}
              </p>
            </div>

            <div className="rounded-lg bg-slate-800 p-4">
              <p className="text-sm text-slate-400">
                Email
              </p>

              <p className="mt-1 font-medium">
                {client.email || "Not provided"}
              </p>
            </div>

            <div className="rounded-lg bg-slate-800 p-4">
              <p className="text-sm text-slate-400">
                City
              </p>

              <p className="mt-1 font-medium">
                {client.city || "Not provided"}
              </p>
            </div>

            <div className="rounded-lg bg-slate-800 p-4">
              <p className="text-sm text-slate-400">
                Requirement
              </p>

              <p className="mt-1 font-medium capitalize">
                {client.requirement || "Not provided"}
              </p>
            </div>

          </div>

          <form
            action="/api/logout"
            method="POST"
            className="mt-8"
          >
            <button
              type="submit"
              className="rounded-lg bg-red-600 px-5 py-3 font-semibold hover:bg-red-500"
            >
              Logout
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}
