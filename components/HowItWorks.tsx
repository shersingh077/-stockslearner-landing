export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "🚀",
      title: "Join Community",
      desc: "Become part of the StocksLearner community and receive educational market updates.",
    },
    {
      number: "02",
      icon: "📚",
      title: "Learn Trading",
      desc: "Understand technical analysis, trading psychology and disciplined risk management.",
    },
    {
      number: "03",
      icon: "📈",
      title: "Practice & Improve",
      desc: "Apply your learning consistently and build confidence with practical market knowledge.",
    },
    {
      number: "04",
      icon: "🎯",
      title: "Grow Together",
      desc: "Continue learning with regular insights, discussions and educational content.",
    },
  ];

  return (
    <section
      id="process"
      className="bg-slate-50 py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-5 py-2 font-semibold">
            Our Process
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">
            How It
            <span className="text-blue-600"> Works</span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
            A simple step-by-step learning process designed to help you build knowledge and confidence in the stock market.
          </p>

        </div>

        <div className="grid gap-8 mt-20 md:grid-cols-2 lg:grid-cols-4">          {steps.map((step, index) => (

            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-4xl">

                  {step.icon}

                </div>

                <span className="text-2xl font-bold text-blue-600">

                  {step.number}

                </span>

              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">

                {step.title}

              </h3>

              <p className="mt-4 leading-7 text-slate-600">

                {step.desc}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}