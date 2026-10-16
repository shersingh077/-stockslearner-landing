import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { officialSources } from "@/lib/market-reference";
import { SITE_URL, pageMetadata } from "@/lib/seo";

const questions = [
  {
    question: "Does StockLearners publish tomorrow's Nifty support and resistance?",
    answer:
      "No. A live market-data and research process is not connected, so StockLearners does not publish current Nifty or Bank Nifty levels or forecasts on this page.",
  },
  {
    question: "Can support or resistance levels predict the market?",
    answer:
      "No. Technical levels are interpretations of historical price and volume data. They can fail, and they do not guarantee a future market direction.",
  },
  {
    question: "Where can I check official index information?",
    answer:
      "Use the official NSE and BSE websites to review exchange-published market information. Verify timestamps, data conditions and the relevant index before making decisions.",
  },
];

export const metadata: Metadata = pageMetadata(
  "Nifty Levels Tomorrow: Official Data Checklist",
  "Learn how traders study Nifty and Bank Nifty levels, and where to verify index information. StockLearners does not fabricate tomorrow's support, resistance or predictions.",
  "/nifty-levels-tomorrow",
);

export default function NiftyLevelsTomorrowPage() {
  const sources = officialSources.filter((source) =>
    ["nse", "bse"].includes(source.id),
  );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Nifty levels tomorrow",
                  item: `${SITE_URL}/nifty-levels-tomorrow`,
                },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: questions.map(({ question, answer }) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
              })),
            },
          ],
        }}
      />
      <article className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Nifty levels tomorrow</span>
        </nav>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-sky-400">
          Nifty and Bank Nifty education
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          Nifty Levels Tomorrow: A Verification Guide
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          No current support, resistance or forecast is published here. Without
          a verified live market-data source and a documented research process,
          specific levels would be unsubstantiated. Check exchange data
          directly and treat any technical interpretation as uncertain.
        </p>
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">A learning checklist for index levels</h2>
          <ol className="mt-4 list-inside list-decimal space-y-3 leading-7 text-slate-300">
            <li>Verify the index, date, timestamp and exchange data conditions.</li>
            <li>Define the chart timeframe before marking prior highs and lows.</li>
            <li>Compare a level with broader context; avoid treating one indicator as a prediction.</li>
            <li>Decide in advance what would invalidate a hypothesis and limit potential loss.</li>
            <li>Account for volatility, gaps, execution costs and the possibility of being wrong.</li>
          </ol>
        </section>
        <section className="mt-8 rounded-2xl border border-sky-400/30 bg-sky-400/5 p-6">
          <h2 className="text-xl font-bold">Verify index information</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {sources.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-600 px-4 py-2 text-sky-200 hover:border-sky-400"
              >
                {source.name}
              </a>
            ))}
          </div>
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {questions.map(({ question, answer }) => (
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
        <aside className="mt-8 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-100">
          Educational purpose only. Not investment advice. Markets are subject
          to risk. Index levels and technical analysis are not guarantees of
          future price movements.
        </aside>
      </article>
    </main>
  );
}
