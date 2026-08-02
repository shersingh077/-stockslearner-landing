export default function Features() {
  const features = [
    {
      title: "Professional Account Management",
      desc: "Experienced traders manage your account with disciplined strategies.",
    },
    {
      title: "Risk Management",
      desc: "Every trade follows strict risk management rules to protect capital.",
    },
    {
      title: "Daily Market Analysis",
      desc: "Get regular updates, market insights and trading opportunities.",
    },
    {
      title: "Transparent Communication",
      desc: "Stay informed with clear reports and regular performance updates.",
    },
  ];

  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white">
          Why Choose Our Service
        </h2>

        <p className="text-center text-gray-400 mt-4">
          Professional trading with disciplined risk management.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-green-500 transition"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>

              <p className="text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}