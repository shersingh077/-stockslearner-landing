export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      text: "Excellent account management service. My experience has been very professional.",
    },
    {
      name: "Priya Verma",
      text: "Risk management is amazing. Every trade is handled with discipline.",
    },
    {
      name: "Amit Singh",
      text: "Daily market updates and transparent communication. Highly recommended.",
    },
  ];

  return (
    <section className="bg-[#081526] py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-white">
          What Our Clients Say
        </h2>

        <p className="text-center text-gray-400 mt-4">
          Trusted by traders across India
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#10284f] border border-blue-700 rounded-xl p-8"
            >
              <div className="text-yellow-400 text-2xl mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-300 italic">
                "{review.text}"
              </p>

              <h3 className="mt-6 text-white font-bold text-lg">
                {review.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}