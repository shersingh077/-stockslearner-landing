export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      role: "Stock Market Learner",
      text: "Excellent learning experience. The market analysis and educational content are easy to understand.",
    },
    {
      name: "Priya Verma",
      role: "Telegram Member",
      text: "Daily updates and risk management concepts have improved my confidence in the stock market.",
    },
    {
      name: "Amit Singh",
      role: "Community Member",
      text: "Professional guidance, transparent communication and quality educational content.",
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
            Testimonials
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">

            What Our

            <span className="text-blue-600">
              {" "}Community Says
            </span>

          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">

            Trusted by learners across India for quality education,
            market insights and disciplined learning.

          </p>

        </div>

        <div className="grid gap-8 mt-20 md:grid-cols-2 lg:grid-cols-3">          {reviews.map((review, index) => (

            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
            >

              <div className="text-yellow-400 text-2xl">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="mt-6 leading-7 italic text-slate-600">

                "{review.text}"

              </p>

              <div className="mt-8">

                <h3 className="text-xl font-bold text-slate-900">

                  {review.name}

                </h3>

                <p className="mt-1 text-sm font-medium text-blue-600">

                  {review.role}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}