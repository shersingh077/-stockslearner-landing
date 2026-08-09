export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-extrabold text-blue-500">
              StocksLearner
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Learn stock market with professional educational content,
              technical analysis and disciplined risk management.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-5 text-xl font-bold text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">

              <a href="#home" className="transition hover:text-blue-400">
                Home
              </a>

              <a href="#services" className="transition hover:text-blue-400">
                Services
              </a>

              <a href="#process" className="transition hover:text-blue-400">
                Process
              </a>

              <a href="#reviews" className="transition hover:text-blue-400">
                Reviews
              </a>

              <a href="#faq" className="transition hover:text-blue-400">
                FAQ
              </a>

              <a href="#contact" className="transition hover:text-blue-400">
                Contact
              </a>

            </div>

          </div>

          {/* Community */}

          <div>

            <h3 className="mb-5 text-xl font-bold text-white">
              Community
            </h3>

            <p className="mb-6 text-slate-400">
              Join our official Telegram community.
            </p>            <a
              href="https://t.me/+q1uO_JMMmfIwNDE1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-blue-600 px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
            >
              🚀 Join Telegram
            </a>

          </div>

        </div>

        <div className="mt-14 border-t border-slate-800 pt-8 text-center">

          <p className="text-slate-500">
            © 2026 StocksLearner. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}