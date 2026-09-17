"use client";

import { useRouter } from "next/navigation";

const plans = [
  { id: "25000", investment: 25000, returnAmount: "₹50,000 – ₹1,50,000" },
  { id: "50000", investment: 50000, returnAmount: "₹1,00,000 – ₹3,00,000" },
  { id: "100000", investment: 100000, returnAmount: "₹2,00,000 – ₹6,00,000" },
  { id: "200000", investment: 200000, returnAmount: "₹4,00,000 – ₹12,00,000" },
  { id: "300000", investment: 300000, returnAmount: "₹6,00,000 – ₹18,00,000" },
  { id: "500000", investment: 500000, returnAmount: "₹10,00,000 – ₹30,00,000" },
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
              <p className="text-sm text-slate-400">Investment Amount</p>

              <h2 className="mt-1 text-3xl font-bold">
                ₹{plan.investment.toLocaleString("en-IN")}
              </h2>

              <div className="mt-5 rounded-xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">
                  Demo Return Amount
                </p>

                <p className="mt-1 text-xl font-semibold text-green-400">
                  {plan.returnAmount}
                </p>
              </div>

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
          Demo Investment Plans — amounts can be changed later.
        </p>
      </div>
    </main>
  );
}
