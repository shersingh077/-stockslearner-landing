"use client";

import Link from "next/link";

declare global {
  interface Window {
    fbq?: (...args: string[]) => void;
  }
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#071326] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_15%,rgba(37,99,235,0.35),transparent_35%),linear-gradient(135deg,transparent_55%,rgba(14,165,233,0.08))]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/[0.08] px-4 py-2 text-sm font-semibold text-sky-200">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sky-300" />
            Stock market education for India
          </p>

          <h1 className="mt-7 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Build your market knowledge with{" "}
            <span className="text-sky-300">StockLearners.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Clear guides, practical calculators and official-source research
            references to help you understand the market—one concept at a time.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/learn"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-sky-300 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-sky-950/20 transition-colors hover:bg-sky-200"
            >
              Explore learning guides
            </Link>
            <Link
              href="/chat"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Chat with our team
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Educational information only. Not investment advice. Markets
            involve risk.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-sky-200">
                A clear place to begin
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Learn at your own pace
              </h2>
            </div>
            <span className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1.5 text-xs font-semibold text-slate-300">
              Education
            </span>
          </div>

          <div className="mt-7 space-y-3">
            {[
              {
                number: "01",
                title: "Start with the basics",
                description: "Understand shares, exchanges and orders.",
                href: "/learn/share-market-basics",
              },
              {
                number: "02",
                title: "Explore verified sources",
                description: "Find official market and regulator resources.",
                href: "/news",
              },
              {
                number: "03",
                title: "Try practical calculators",
                description: "Explore estimates with your own assumptions.",
                href: "/calculators",
              },
            ].map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-slate-950/35 p-4 transition-colors hover:border-sky-300/30 hover:bg-slate-950/60"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-300/10 text-sm font-bold text-sky-200">
                  {item.number}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-white">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-400">
                    {item.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-lg text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-sky-200"
                >
                  →
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-slate-400">
            Live prices and personalized investment recommendations are not
            provided on this page.
          </p>
        </div>
      </div>
    </section>
  );
}