export default function Testimonials() {
  const topics = [
    {
      title: "Market foundations",
      text: "Learn what shares, exchanges and indices represent.",
    },
    {
      title: "Research literacy",
      text: "Build familiarity with company information and market terminology.",
    },
    {
      title: "Risk awareness",
      text: "Understand uncertainty, costs and why returns are never guaranteed.",
    },
  ];

  return (
    <section
      id="reviews"
      className="bg-white py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-5 py-2 font-semibold">
            Learning Community
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">

            Explore

            <span className="text-blue-600">
              {" "}Learning Topics
            </span>

          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">

            We will publish genuine learner feedback only with permission. In
            the meantime, explore the educational topics covered by StockLearners.

          </p>

        </div>

        <div className="grid gap-8 mt-20 md:grid-cols-2 lg:grid-cols-3">                  {topics.map((topic) => (

            <div
            key={topic.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
            >

              <h3 className="text-xl font-bold text-slate-900">
                {topic.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                {topic.text}
              </p>
            </div>

          ))}

        </div>

      </div>

    </section>
  );
}