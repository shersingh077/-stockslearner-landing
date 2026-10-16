import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { stockReferences } from "@/lib/market-reference";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Indian Stock Company Guides",
  "Browse StockLearners company reference pages for selected NSE-listed companies. These pages contain no live prices or buy/sell recommendations.",
  "/stock",
);

export default function StockDirectoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Stock reference",
              item: `${SITE_URL}/stock`,
            },
          ],
        }}
      />
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-400">
          Company reference
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          Stock Company Guides
        </h1>
        <p className="mt-5 max-w-3xl leading-8 text-slate-300">
          Start with a company&apos;s broad business context, then verify current
          financials and disclosures from the exchange and company filings.
          These educational summaries do not include live quotes, forecasts or
          investment recommendations.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {stockReferences.map((stock) => (
            <article
              key={stock.symbol}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <h2 className="text-lg font-bold">
                <Link
                  href={`/stock/${stock.symbol.toLowerCase()}`}
                  className="text-sky-300 hover:underline"
                >
                  {stock.name}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                {stock.symbol} · {stock.sector}
              </p>
              <p className="mt-3 leading-7 text-slate-300">{stock.overview}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-100">
          Educational purpose only. Not investment advice. Markets are subject
          to risk. Company summaries may not reflect recent changes; always
          check official filings.
        </p>
      </section>
    </main>
  );
}
