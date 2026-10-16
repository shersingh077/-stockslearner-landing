"use client";

import { useRouter } from "next/navigation";

const plans = [
  { id: "25000", investment: 25000 },
  { id: "50000", investment: 50000 },
  { id: "100000", investment: 100000 },
  { id: "200000", investment: 200000 },
  { id: "300000", investment: 300000 },
  { id: "500000", investment: 500000 },
];

export default function InvestmentPage() {
  const router = useRouter();

  function handleInvest(plan: (typeof plans)[number]) {
    const message = `मैं ₹${plan.investment.toLocaleString(
      "en-IN"
    )} Investment Plan में interested हूँ। कृपया मुझे इसकी पूरी जानकारी और payment details बताएं।`;

    router.push(`/chat?message=${encodeURIComponent(message)}`);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            💰 Investment Plans
          </h1>

          <p className="mt-3 text-slate-400">
            अपनी पसंद का Investment Plan चुनें और Admin से Chat करें।
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg"
            >
              <p className="text-sm text-slate-400">Inquiry amount</p>

              <h2 className="mt-1 text-3xl font-bold">
                ₹{plan.investment.toLocaleString("en-IN")}
              </h2>

              <button
                onClick={() => handleInvest(plan)}
                className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500"
              >
                Invest Now →
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          This page submits an inquiry only. It does not accept or manage
          investment funds and does not promise returns.
        </p>
        <p className="mt-3 text-center text-xs text-amber-300">
          Educational purpose only. Not investment advice. Markets are subject
          to risk.
        </p>
      </div>
    </main>
  );
}
