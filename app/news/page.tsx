import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { officialSources } from "@/lib/market-reference";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Indian Stock Market News Sources",
  "Find official Indian exchange, regulator and government sources for market-moving announcements, rates, inflation and public issues. StockLearners does not fabricate live headlines.",
  "/news",
);

const categories = [
  {
    title: "Company announcements and results",
    summary:
      "Check exchange disclosures for company filings, board outcomes, corporate actions and published results.",
    sourceIds: ["nse", "bse"],
  },
  {
    title: "RBI, banking and monetary policy",
    summary:
      "Use central-bank announcements and official releases for policy and banking information.",
    sourceIds: ["rbi"],
  },
  {
    title: "Inflation and economic statistics",
    summary:
      "Find published economic indicators and statistical releases at the official source.",
    sourceIds: ["mospi"],
  },
  {
    title: "Budget and government announcements",
    summary:
      "Verify government policy announcements and budget-related materials against official publications.",
    sourceIds: ["finmin", "pib"],
  },
  {
    title: "IPO and securities regulation",
    summary:
      "Consult regulator and exchange sources for offer documents, public-issue notices and securities regulation.",
    sourceIds: ["sebi", "nse", "bse"],
  },
  {
    title: "Commodity-market information",
    summary:
      "Use exchange-published commodity-market information and announcements rather than unsourced price messages.",
    sourceIds: ["mcx"],
  },
];

export default function NewsPage() {
  const sourceById = new Map(officialSources.map((source) => [source.id, source]));

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
              name: "Official market news sources",
              item: `${SITE_URL}/news`,
            },
          ],
        }}
      />
      <section className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">News sources</span>
        </nav>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-sky-400">
          StockLearners source directory
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          Indian Market News & Official Sources
        </h1>
        <p className="mt-5 max-w-3xl leading-8 text-slate-300">
          Verify market-moving announcements at their original exchange,
          regulator or government publisher. This page does not scrape or
          republish third-party articles and does not display a live news feed;
          no news provider or licensed feed is connected yet.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {categories.map((category) => (
            <article
              key={category.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <h2 className="text-xl font-bold">{category.title}</h2>
              <p className="mt-3 leading-7 text-slate-300">
                {category.summary}
              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {category.sourceIds.map((id) => {
                  const source = sourceById.get(id);
                  if (!source) return null;

                  return (
                    <li key={source.id}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-lg border border-sky-400/40 px-3 py-2 text-sm font-semibold text-sky-200 hover:bg-sky-400/10"
                      >
                        {source.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
        <aside className="mt-8 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-100">
          External links go to third-party official websites and may change.
          Confirm dates, context and publication details on the original
          source. A headline or announcement is not by itself an investment
          recommendation.
        </aside>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/market-today" className="text-sky-300 hover:underline">
            Open the Market Today checklist
          </Link>
          <Link href="/ipo" className="text-sky-300 hover:underline">
            Read the IPO information guide
          </Link>
        </div>
      </section>
    </main>
  );
}
