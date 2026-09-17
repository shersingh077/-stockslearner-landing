import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

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

export default async function ManageVipPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!isAdmin(token)) {
    redirect("/admin");
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );

  const { data: client, error } = await supabase
    .from("clients")
    .select(`
      id,
      full_name,
      mobile,
      email,
      city,
      requirement,
      is_vip,
      vip_plan,
      vip_start_date,
      vip_expiry_date,
      payment_status,
      payment_id,
      vip_utr,
      vip_payment_method,
      vip_verified_at,
      vip_verified_by
    `)
    .eq("id", id)
    .maybeSingle();

  if (error || !client) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold">
            Client not found
          </h1>

          <p className="mt-3 text-slate-400">
            {error?.message || "This client does not exist."}
          </p>

          <a
            href="/admin"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold"
          >
            ← Back to Admin
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-4 text-white sm:p-8">
      <div className="mx-auto max-w-3xl">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              ⭐ Manage VIP
            </h1>

            <p className="mt-2 text-slate-400">
              Verify payment and activate VIP membership.
            </p>
          </div>

          <a
            href="/admin"
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold hover:bg-slate-700"
          >
            ← Admin
          </a>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

          <div className="mb-8 rounded-xl bg-slate-800 p-5">
            <h2 className="text-xl font-bold">
              {client.full_name}
            </h2>

            <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <p>
                <span className="text-slate-500">Mobile:</span>{" "}
                {client.mobile}
              </p>

              <p>
                <span className="text-slate-500">Email:</span>{" "}
                {client.email || "-"}
              </p>

              <p>
                <span className="text-slate-500">City:</span>{" "}
                {client.city || "-"}
              </p>

              <p>
                <span className="text-slate-500">Requirement:</span>{" "}
                {client.requirement || "-"}
              </p>
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-slate-700 p-5">
            <h2 className="mb-4 text-lg font-bold">
              Current VIP Status
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">

              <div>
                <p className="text-xs text-slate-500">
                  VIP Status
                </p>

                <p
                  className={`mt-1 font-bold ${
                    client.is_vip
                      ? "text-green-400"
                      : "text-slate-300"
                  }`}
                >
                  {client.is_vip
                    ? "✓ ACTIVE"
                    : "NOT ACTIVE"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  VIP Plan
                </p>

                <p className="mt-1 font-semibold">
                  {client.vip_plan || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Start Date
                </p>

                <p className="mt-1">
                  {client.vip_start_date
                    ? new Date(
                        client.vip_start_date
                      ).toLocaleString("en-IN")
                    : "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Expiry Date
                </p>

                <p className="mt-1">
                  {client.vip_expiry_date
                    ? new Date(
                        client.vip_expiry_date
                      ).toLocaleString("en-IN")
                    : "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Payment Status
                </p>

                <p className="mt-1 font-semibold">
                  {client.payment_status || "Not Paid"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  UTR
                </p>

                <p className="mt-1">
                  {client.vip_utr || "-"}
                </p>
              </div>

            </div>
          </div>

          <form
            action="/api/admin/vip"
            method="POST"
            className="space-y-5"
          >
            <input
              type="hidden"
              name="client_id"
              value={client.id}
            />

            <div>
              <label className="mb-2 block text-sm font-medium">
                VIP Plan
              </label>

              <select
                name="plan"
                required
                defaultValue={client.vip_plan || ""}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-yellow-500"
              >
                <option value="" disabled>
                  Select VIP Plan
                </option>

                <option value="1_month">
                  1 Month — ₹4,999
                </option>

                <option value="3_months">
                  3 Months — ₹9,999
                </option>

                <option value="1_year">
                  1 Year — ₹19,999
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Payment Status
              </label>

              <select
                name="payment_status"
                defaultValue={client.payment_status || "pending"}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-yellow-500"
              >
                <option value="pending">
                  Pending
                </option>

                <option value="verified">
                  Verified
                </option>

                <option value="rejected">
                  Rejected
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Payment Method
              </label>

              <input
                name="payment_method"
                type="text"
                defaultValue={client.vip_payment_method || ""}
                placeholder="UPI / Bank Transfer / Other"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                UTR / Transaction ID
              </label>

              <input
                name="utr"
                type="text"
                defaultValue={client.vip_utr || ""}
                placeholder="Enter UTR / Transaction ID"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-yellow-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-5 py-3.5 font-bold hover:bg-green-500"
            >
              ✓ Verify Payment & Activate VIP
            </button>

            <p className="text-center text-xs text-slate-500">
              VIP expiry will be calculated automatically from the
              selected plan.
            </p>
          </form>

        </div>
      </div>
    </main>
  );
}
