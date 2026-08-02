export default function Contact() {
  return (
    <section className="bg-[#061325] py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-5xl font-bold text-white">
          Ready To Start?
        </h2>

        <p className="text-gray-400 mt-5 text-lg">
          Contact our team today and start your trading journey.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-10">

          <a
            href="https://t.me/STOCK_LEARNER_official""
            className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl text-white font-bold text-lg transition"
          >
            Join Telegram
          </a>

          <a
            href="https://wa.me/919999999999"
            className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-xl text-white font-bold text-lg transition"
          >
            WhatsApp
          </a>

        </div>

      </div>
    </section>
  );
}