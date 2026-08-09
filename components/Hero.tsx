"use client";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#071326] via-[#0B1F3A] to-[#102A56] py-24 lg:py-32"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-blue-500/20 blur-3xl"></div>

        <div className="absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-sky-400/20 blur-3xl"></div>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-200">

              🚀 India's Trusted Stock Market Learning Community

            </span>

            <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight text-white">

              Learn The

              <span className="block text-sky-400">
                Stock Market
              </span>

              With Confidence

            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-300">

              Learn technical analysis, risk management,
              trading psychology and daily market insights
              with StocksLearner.

            </p>

            {/* Buttons */}

            <div className="mt-12 flex flex-wrap gap-5">

              <a
                href="https://t.me/+q1uO_JMMmfIwNDE1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== "undefined" && typeof window.fbq === "function") {
                    window.fbq("track", "Lead");
                  }
                }}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-bold text-white transition-all duration-300 shadow-xl shadow-blue-500/30"
              >
                🚀 Join Telegram
              </a>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/30 px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                💬 WhatsApp
              </a>

            </div>

            {/* Trust Badges */}

            <div className="mt-12 flex flex-wrap gap-6 text-sm text-slate-300">

              <div className="flex items-center gap-2">
                ✅ Daily Market Updates
              </div>

              <div className="flex items-center gap-2">
                📚 Trading Education
              </div>

              <div className="flex items-center gap-2">
                🛡 Risk Management
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-slate-300 text-sm">
                    Today's Market
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-white">
                    Market Dashboard
                  </h3>

                </div>

                <div className="rounded-full bg-green-500/20 px-4 py-2 text-green-300 font-semibold">
                  LIVE
                </div>

              </div>

              <div className="mt-10 space-y-6">

                <div className="flex justify-between border-b border-white/10 pb-4">

                  <span className="text-slate-300">
                    NIFTY 50
                  </span>

                  <span className="font-bold text-sky-400">
                    +1.24%
                  </span>

                </div>

                <div className="flex justify-between border-b border-white/10 pb-4">

                  <span className="text-slate-300">
                    SENSEX
                  </span>

                  <span className="font-bold text-sky-400">
                    +0.82%
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-300">
                    BANK NIFTY
                  </span>

                  <span className="font-bold text-sky-400">
                    +1.65%
                  </span>

                </div>

              </div>

              <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 p-10 flex items-center justify-center">

                <span className="text-7xl">
                  📈
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 text-center">

            <h2 className="text-4xl font-extrabold text-sky-400">
              15K+
            </h2>

            <p className="mt-2 text-slate-300">
              Community Members
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 text-center">

            <h2 className="text-4xl font-extrabold text-sky-400">
              7+
            </h2>

            <p className="mt-2 text-slate-300">
              Years Experience
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 text-center">

            <h2 className="text-4xl font-extrabold text-sky-400">
              Daily
            </h2>

            <p className="mt-2 text-slate-300">
              Market Insights
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 text-center">

            <h2 className="text-4xl font-extrabold text-sky-400">
              24×7
            </h2>

            <p className="mt-2 text-slate-300">
              Community Support
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}