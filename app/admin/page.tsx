import { cookies } from "next/headers";
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

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!isAdmin(token)) {
    return <AdminLogin />;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );

  const { data: clients, error } = await supabase
    .from("clients")
    .select(`
      id,
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
      payment_id,
      vip_utr,
      vip_payment_method,
      vip_verified_at,
      vip_verified_by,
      investment_status,
      investment_plan,
      investment_amount,
      investment_return_amount,
      investment_start_date,
      investment_expiry_date,
      investment_payment_status,
      investment_utr,
      investment_payment_method
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        Database Error: {error.message}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-4 text-white sm:p-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              StocksLearner Admin Panel
            </h1>

            <p className="mt-2 text-slate-400">
              Registered Clients: {clients?.length || 0}
            </p>
          </div>

          <div className="flex gap-2">
            <a
              href="/admin/chat"
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
            >
              💬 Admin Chat
            </a>

            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-500"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full min-w-[1500px] text-left text-sm">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Mobile</th>
                <th className="px-4 py-4">Email</th>
                <th className="px-4 py-4">City</th>
                <th className="px-4 py-4">Requirement</th>
                <th className="px-4 py-4">VIP Status</th>
                <th className="px-4 py-4">VIP Plan</th>
                <th className="px-4 py-4">Payment</th>
                <th className="px-4 py-4">VIP Expiry</th>
                <th className="px-4 py-4">Investment</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {clients?.map((client) => {
                const expiry = client.vip_expiry_date
                  ? new Date(client.vip_expiry_date)
                  : null;

                const vipActive =
                  Boolean(client.is_vip) &&
                  Boolean(expiry) &&
                  expiry!.getTime() > Date.now();

                return (
                  <tr
                    key={client.id}
                    className="border-t border-slate-800 align-top"
                  >
                    <td className="px-4 py-4 font-medium">
                      {client.full_name}
                    </td>

                    <td className="px-4 py-4">
                      {client.mobile}
                    </td>

                    <td className="px-4 py-4">
                      {client.email || "-"}
                    </td>

                    <td className="px-4 py-4">
                      {client.city || "-"}
                    </td>

                    <td className="px-4 py-4 capitalize">
                      {client.requirement || "-"}
                    </td>

                    <td className="px-4 py-4">
                      {vipActive ? (
                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                          ✓ ACTIVE
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-bold text-slate-300">
                          NOT ACTIVE
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      {client.vip_plan || "-"}
                    </td>

                    <td className="px-4 py-4">
                      <div>
                        <p
                          className={`font-semibold ${
                            client.payment_status === "verified"
                              ? "text-green-400"
                              : client.payment_status === "pending"
                              ? "text-yellow-400"
                              : "text-slate-400"
                          }`}
                        >
                          {client.payment_status || "Not Paid"}
                        </p>

                        {client.vip_utr && (
                          <p className="mt-1 text-xs text-slate-500">
                            UTR: {client.vip_utr}
                          </p>
                        )}

                        {client.vip_payment_method && (
                          <p className="mt-1 text-xs text-slate-500">
                            Method: {client.vip_payment_method}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-300">
                      {expiry
                        ? expiry.toLocaleString("en-IN")
                        : "-"}
                    </td>

                    <td className="px-4 py-4">
                      <div className="min-w-[220px]">
                        <p className={`font-bold ${
                          client.investment_status === "verified"
                            ? "text-green-400"
                            : client.investment_status === "pending"
                            ? "text-yellow-400"
                            : client.investment_status === "rejected"
                            ? "text-red-400"
                            : "text-slate-500"
                        }`}>
                          {client.investment_status === "verified"
                            ? "✓ ACTIVE"
                            : client.investment_status === "pending"
                            ? "⏳ PENDING"
                            : client.investment_status === "rejected"
                            ? "✕ REJECTED"
                            : "— NONE"}
                        </p>

                        {client.investment_plan && (
                          <p className="mt-2 text-xs text-slate-300">
                            Plan: ₹{Number(client.investment_plan).toLocaleString("en-IN")}
                          </p>
                        )}

                        {client.investment_amount && (
                          <p className="mt-1 text-xs text-slate-400">
                            Amount: ₹{Number(client.investment_amount).toLocaleString("en-IN")}
                          </p>
                        )}

                        {client.investment_return_amount && (
                          <p className="mt-1 text-xs text-green-400">
                            Demo Return: {client.investment_return_amount}
                          </p>
                        )}

                        {client.investment_payment_status && (
                          <p className="mt-1 text-xs text-slate-500">
                            Payment: {client.investment_payment_status}
                          </p>
                        )}

                        {client.investment_utr && (
                          <p className="mt-1 text-xs text-slate-500">
                            UTR: {client.investment_utr}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-2">

                        <a
                          href={`/admin/vip/${client.id}`}
                          className="rounded-lg bg-yellow-500 px-4 py-2 text-center text-xs font-bold text-black hover:bg-yellow-400"
                        >
                          ⭐ Manage VIP
                        </a>

                        <a
                          href={`/admin/chat?client_id=${client.id}`}
                          className="rounded-lg bg-slate-800 px-4 py-2 text-center text-xs font-semibold hover:bg-slate-700"
                        >
                          💬 Chat
                        </a>

                      </div>
                    </td>
                  </tr>
                );
              })}

              {!clients?.length && (
                <tr>
                  <td
                    colSpan={11}
                    className="px-4 py-10 text-center text-slate-400"
                  >
                    No clients registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}

function AdminLogin() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-md">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">
            Admin Login
          </h1>

          <p className="mt-3 text-slate-400">
            StocksLearner Administration
          </p>
        </div>

        <form
          action="/api/admin/login"
          method="POST"
          className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Admin Password
            </label>

            <input
              name="password"
              type="password"
              required
              placeholder="Enter admin password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
          >
            Login to Admin Panel
          </button>
        </form>

      </div>
    </main>
  );
}
