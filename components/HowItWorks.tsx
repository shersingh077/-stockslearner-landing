export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Contact Us",
      desc: "Contact us on Telegram or WhatsApp to discuss your requirements.",
    },
    {
      number: "02",
      title: "Account Verification",
      desc: "Complete the onboarding and verification process securely.",
    },
    {
      number: "03",
      title: "Start Trading",
      desc: "Our experts manage your account with proper risk management.",
    },
  ];

  return (
    <section className="bg-[#07162f] py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-white">
          How It Works
        </h2>

        <p className="text-center text-gray-400 mt-4">
          Simple onboarding process
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#10284f] border border-blue-700 rounded-xl p-8"
            >
              <h3 className="text-5xl font-bold text-green-400 mb-5">
                {step.number}
              </h3>

              <h4 className="text-2xl font-semibold text-white mb-3">
                {step.title}
              </h4>

              <p className="text-gray-300">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}