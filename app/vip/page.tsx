"use client";

import { useRouter } from "next/navigation";

const plans = [
  {
    id: "1_month",
    title: "1 Month",
    price: 4999,
    duration: "30 Days",
  },
  {
    id: "3_months",
    title: "3 Months",
    price: 9999,
    duration: "90 Days",
    popular: true,
  },
  {
    id: "1_year",
    title: "1 Year",
    price: 19999,
    duration: "365 Days",
  },
];

export default function VipPage() {
  const router = useRouter();

  function handleBuy(plan: (typeof plans)[number]) {
    const message = `मैं ${plan.title} VIP Membership ₹${plan.price.toLocaleString(
      "en-IN"
    )} लेना चाहता हूँ।`;

    router.push(`/chat?message=${encodeURIComponent(message)}`);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
            ⭐ VIP MEMBERSHIP
          </div>

          <h1 className="text-4xl font-bold sm:text-5xl">
            Upgrade to VIP
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Get access to exclusive StocksLearner VIP benefits and premium
            services.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-6 shadow-xl ${
                plan.popular
                  ? "border-yellow-500 bg-slate-900"
                  : "border-slate-800 bg-slate-900"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow-500 px-4 py-1 text-xs font-bold text-black">
                  MOST POPULAR
                </div>
              )}

              <div className="text-center">
                <h2 className="text-2xl font-bold">{plan.title}</h2>

                <div className="mt-5 text-4xl font-extrabold">
                  ₹{plan.price.toLocaleString("en-IN")}
                </div>

                <p className="mt-2 text-sm text-slate-400">
                  Valid for {plan.duration}
                </p>
              </div>

              <div className="my-7 space-y-3 text-sm text-slate-300">
                <p>✓ VIP Member Access</p>
                <p>✓ Premium Services</p>
                <p>✓ Exclusive Client Benefits</p>
                <p>✓ Secure Account Access</p>
              </div>

              <button
                onClick={() => handleBuy(plan)}
                className="w-full rounded-lg bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-slate-500">
          Select a VIP plan to chat with Admin and get payment details.
        </div>
      </div>
    </main>
  );
}
