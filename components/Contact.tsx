export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-white py-28 px-6"
    >
      <div className="max-w-5xl mx-auto text-center">

        <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 font-semibold text-blue-700">
          Contact Us
        </span>

        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
          Need a hand with StockLearners?
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          Start a conversation with our team from the website, or reach us on
          Telegram. Please don&apos;t share passwords, OTPs or sensitive
          financial information in chat.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/chat"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-700 px-7 py-3 font-bold text-white shadow-lg shadow-blue-700/15 transition-colors hover:bg-blue-800"
          >
            Chat with our team
          </a>

          <a
            href="https://t.me/+q1uO_JMMmfIwNDE1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-7 py-3 font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
          >
            Join Telegram community
          </a>

          <a
            href="https://t.me/prime_stocks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-7 py-3 font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
          >
            Contact @prime_stocks
          </a>
        </div>

      </div>

    </section>
  );
}