export default function ServicesPage() {
  const services = [
    {
      title: "Professional Account Management",
      desc: "Experienced traders manage your account with disciplined risk management and a transparent trading approach.",
      icon: "📈",
    },
    {
      title: "Stock Market Learning",
      desc: "Learn technical analysis, price action, risk management and trading psychology with practical guidance.",
      icon: "🎓",
    },
    {
      title: "Telegram Premium Community",
      desc: "Get market updates, educational content and important trading insights through our Telegram community.",
      icon: "🚀",
    },
    {
      title: "Risk Management",
      desc: "Capital protection comes first. Every strategy focuses on disciplined risk management.",
      icon: "🛡️",
    },
    {
      title: "Market Analysis",
      desc: "Daily market analysis based on technical structure, momentum and price action.",
      icon: "📊",
    },
    {
      title: "24×7 Support",
      desc: "Our team is available to help you with guidance and support whenever required.",
      icon: "💬",
    },
  ];

  return (
    <section
      id="services"
      className="bg-gradient-to-b from-black via-slate-950 to-black py-24 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="inline-block bg-green-500/20 border border-green-500 text-green-400 px-5 py-2 rounded-full font-semibold">
            Our Services
          </span>

          <h2 className="text-5xl font-extrabold mt-6">
            Everything You Need
            <span className="text-green-400"> To Grow</span>
          </h2>

          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
            Professional trading services designed to help you learn,
            manage risk and stay connected with market opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-slate-700 bg-slate-900/60 backdrop-blur-md p-8 transition-all duration-300 hover:border-green-500 hover:-translate-y-2 hover:shadow-[0_0_30px_#22c55e33]"
            >
              <div className="text-5xl mb-5">{item.icon}</div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-green-400">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

        <div className="text-center mt-20">

          <a
            href="https://t.me/STOCK_LEARNER_official"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-green-500 hover:bg-green-400 text-white text-lg font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_20px_#22c55e]"
          >
            🚀 Join Telegram Community
          </a>

        </div>

      </div>
    </section>
  );
}