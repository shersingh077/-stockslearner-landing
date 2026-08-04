export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-white py-28 px-6"
    >
      <div className="max-w-5xl mx-auto text-center">

        <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-5 py-2 font-semibold">
          Contact Us
        </span>

        <h2 className="mt-6 text-5xl font-extrabold text-slate-900">

          Ready To Join

          <span className="text-blue-600">
            {" "}StocksLearner?
          </span>

        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-slate-600">

          Join our official Telegram community to receive
          educational content, market insights and regular updates.

        </p>

        <div className="mt-14 flex flex-col sm:flex-row justify-center gap-5">          <a
            href="https://t.me/STOCK_LEARNER_official"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
          >
            🚀 Join Telegram
          </a>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-10 py-4 text-lg font-semibold text-slate-800 transition-all duration-300 hover:bg-slate-900 hover:text-white"
          >
            💬 WhatsApp
          </a>

        </div>

      </div>

    </section>
  );
}