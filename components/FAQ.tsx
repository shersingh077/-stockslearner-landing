import JsonLd from "@/components/JsonLd";

const faqs = [
  {
    question: "What is StockLearners?",
    answer:
      "StockLearners is a stock market learning platform that provides educational content, market insights and trading knowledge.",
  },
  {
    question: "Who can join?",
    answer:
      "Anyone interested in learning about the stock market, from beginners to experienced traders.",
  },
  {
    question: "Do you provide daily updates?",
    answer:
      "We share educational market updates and learning resources through our community. Market data or news availability may vary.",
  },
  {
    question: "Is trading risky?",
    answer:
      "Yes. Trading and investing involve risk. Always manage your capital carefully and never trade without proper knowledge.",
  },
  {
    question: "How do I contact StockLearners?",
    answer:
      "You can connect with us through the contact options listed on our official website.",
  },
  {
    question: "Is the content beginner friendly?",
    answer:
      "Our educational content is designed to help beginners build a foundation step by step. It is not individualized investment advice.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="bg-slate-50 py-28 px-6"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }}
      />
      <div className="max-w-5xl mx-auto">

        <div className="text-center">

          <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-5 py-2 font-semibold">
            FAQ
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">

            Frequently Asked

            <span className="text-blue-600">
              {" "}Questions
            </span>

          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Everything you need to know before joining the StockLearners community.
          </p>

        </div>

        <div className="mt-20 space-y-6">          {faqs.map((faq, index) => (

            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-xl"
            >

              <h3 className="text-xl font-bold text-slate-900">

                {faq.question}

              </h3>

              <p className="mt-4 leading-7 text-slate-600">

                {faq.answer}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}