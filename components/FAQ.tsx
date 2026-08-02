export default function FAQ() {
  const faqs = [
    {
      question: "What is Account Management?",
      answer:
        "Our team manages your trading account using a disciplined trading approach.",
    },
    {
      question: "What is the minimum capital?",
      answer:
        "The minimum capital requirement depends on your trading plan. Contact us for details.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply contact us on WhatsApp or Telegram and complete the onboarding process.",
    },
    {
      question: "Do you provide support?",
      answer:
        "Yes, our support team is available to assist you throughout the process.",
    },
  ];

  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-white">
          Frequently Asked Questions
        </h2>

        <div className="mt-12 space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-700 bg-slate-800 p-6"
            >
              <h3 className="text-xl font-semibold text-white">
                {faq.question}
              </h3>

              <p className="mt-3 text-gray-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}