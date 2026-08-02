export default function Hero() {
  return (
    <section
      id="home"
      className="bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white py-24"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">

        <span className="inline-block bg-green-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
          🇮🇳 India's Professional Account Management Service
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold mt-8 leading-tight">
          Grow Your Capital
          <br />
          With Professional
          <span className="text-green-400"> Account Management</span>
        </h1>

        <p className="text-gray-300 mt-8 text-xl max-w-3xl mx-auto">
          Experience disciplined trading, professional risk management and
          transparent communication with our expert team.
        </p>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12">

          <a
            href="https://t.me/STOCK_LEARNER_official"
            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-lime-400 px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-110 animate-pulse shadow-[0_0_30px_#22c55e]"
          >
            🚀 Join Now
          </a>

          <a
            href="https://wa.me/919999999999"
            className="rounded-xl border-2 border-white px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            💬 WhatsApp
          </a>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">

          <div className="rounded-2xl bg-slate-800 p-6 border border-slate-700 hover:border-green-500 transition">
            <h2 className="text-4xl font-bold text-green-400">
              15K+
            </h2>

            <p className="mt-2 text-gray-300">
              Community Members
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-6 border border-slate-700 hover:border-green-500 transition">
            <h2 className="text-4xl font-bold text-green-400">
              7+
            </h2>

            <p className="mt-2 text-gray-300">
              Years Experience
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-6 border border-slate-700 hover:border-green-500 transition">
            <h2 className="text-4xl font-bold text-green-400">
              Expert
            </h2>

            <p className="mt-2 text-gray-300">
              Risk Management
            </p>
          </div>

          <div className="rounded-2xl bg-slate-800 p-6 border border-slate-700 hover:border-green-500 transition">
            <h2 className="text-4xl font-bold text-green-400">
              24×7
            </h2>

            <p className="mt-2 text-gray-300">
              Support
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}