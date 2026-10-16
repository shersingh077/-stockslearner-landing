import type { Metadata } from "next";
import Link from "next/link";
import Calculators from "@/components/Calculators";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, pageMetadata } from "@/lib/seo";

const calculatorQuestions = [
  {
    question: "Are the calculator return assumptions guaranteed?",
    answer:
      "No. Return and inflation rates are assumptions entered by the user for mathematical illustrations. Actual outcomes can differ and investments can lose value.",
  },
  {
    question: "Does the brokerage estimator include all trading charges?",
    answer:
      "No. It estimates percentage-based brokerage on buy and sell turnover only. Taxes, exchange charges, stamp duty, GST and broker-specific fees are excluded.",
  },
  {
    question: "Is the position-size result a trade recommendation?",
    answer:
      "No. It is an arithmetic estimate based on the entered account capital, risk percentage and entry-to-stop distance. It does not assess suitability, liquidity, gaps or execution risk.",
  },
];

export const metadata: Metadata = pageMetadata(
  "SIP, CAGR, Brokerage & Retirement Calculators",
  "Use free SIP, lump-sum, CAGR, brokerage, margin, position-size and retirement calculators from StockLearners. All projections are illustrative, not investment advice.",
  "/calculators",
);

export default function CalculatorsPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "StockLearners Calculators",
        item: `${SITE_URL}/calculators`,
      },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: calculatorQuestions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16 text-white sm:px-8">
      <JsonLd data={breadcrumb} />
      <JsonLd data={faqSchema} />
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Calculators</span>
        </nav>
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-400">
          StockLearners tools
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          Stock Market Calculators
        </h1>
        <p className="mt-5 max-w-3xl leading-8 text-slate-300">
          Explore common financial calculations for learning and planning.
          Assumed returns are user inputs, not forecasts or promises. Brokerage
          estimates exclude applicable taxes and other charges.
        </p>

        <Calculators />

        <aside className="mt-10 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-100">
          Educational purpose only. Not investment advice. Markets are subject
          to risk. These tools do not account for every fee, tax, product rule
          or personal circumstance. Verify calculations independently and
          consult a qualified professional where appropriate.
        </aside>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">Calculator questions</h2>
          <div className="mt-5 space-y-3">
            {calculatorQuestions.map(({ question, answer }) => (
              <details
                key={question}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <summary className="cursor-pointer font-semibold">
                  {question}
                </summary>
                <p className="mt-3 leading-7 text-slate-300">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
