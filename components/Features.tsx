export default function Features() {
  const features = [
    {
      icon: "📈",
      title: "Stock Market Learning",
      desc: "Learn technical analysis, chart reading and trading concepts from beginner to advanced level.",
    },
    {
      icon: "📊",
      title: "Market Analysis",
      desc: "Daily educational market analysis to help you understand market movements and trends.",
    },
    {
      icon: "🛡️",
      title: "Risk Management",
      desc: "Understand capital protection and disciplined trading through proper risk management.",
    },
    {
      icon: "🎯",
      title: "Trading Psychology",
      desc: "Develop discipline, patience and emotional control for long-term success.",
    },
    {
      icon: "👨‍💻",
      title: "Community Support",
      desc: "Join an active community of learners and stay updated with educational content.",
    },
    {
      icon: "🚀",
      title: "Continuous Learning",
      desc: "Regular educational content, market insights and practical learning resources.",
    },
  ];

  return (
    <section
      id="services"
      className="bg-white py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-5 py-2 font-semibold">
            Why StocksLearner
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">

            Learn Smarter With

            <span className="text-blue-600">
              {" "}StocksLearner
            </span>

          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">

            Professional stock market education with structured learning,
            market insights and practical risk management.

          </p>

        </div>

        <div className="grid gap-8 mt-20 md:grid-cols-2 lg:grid-cols-3">          {features.map((item, index) => (

            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
            >

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-4xl">

                {item.icon}

              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">

                {item.title}

              </h3>

              <p className="mt-4 leading-7 text-slate-600">

                {item.desc}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}