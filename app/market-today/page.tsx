import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { officialSources } from "@/lib/market-reference";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata(
  "Market Today: Official Indian Market Checklist",
  "A daily checklist for verifying Indian market indices, company announcements, policy and economic releases from official sources. No simulated live prices.",
  "/market-today",
);

const checklist = [
  {
    title: "Market indices and exchange notices",
    description:
      "Open official exchange pages to review current index information, market status and notices.",
    sourceIds: ["nse", "bse"],
  },
  {
    title: "Company filings and results",
    description:
      "Check company-specific exchange filings and read the original announcement before drawing conclusions.",
    sourceIds: ["nse", "bse"],
  },
  {
    title: "Rates and banking policy",
    description:
      "Verify monetary-policy and regulatory information against central-bank publications.",
    sourceIds: ["rbi"],
  },
  {
    title: "Inflation and official economic data",
    description:
      "Look up the source release, publication date, measurement period and any revisions.",
    sourceIds: ["mospi"],
  },
  {
    title: "Government and budget announcements",
    description:
      "Read the full official release and distinguish an announced policy from its eventual market impact.",
    sourceIds: ["finmin", "pib"],
  },
];

export default function MarketTodayPage() {
  const sourceById = new Map(officialSources.map((source) => [source.id, source]));
  const date = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

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
              name: "Market Today checklist",
              item: `${SITE_URL}/market-today`,
            },
          ],
        }}
      />
      <article className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Market Today</span>
        </nav>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-sky-400">
          Daily verification checklist · {date}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          Market Today: Check the Official Sources
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          This page is a source-checking guide, not a generated market report.
          StockLearners has no connected live-price provider or verified
          automated news feed, so it does not show fabricated Nifty, Sensex,
          commodity or crypto values or claim current market movers.
        </p>
        <div className="mt-8 space-y-4">
          {checklist.map((item) => (
            <section
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="mt-2 leading-7 text-slate-300">
                {item.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {item.sourceIds.map((id) => {
                  const source = sourceById.get(id);
                  if (!source) return null;
                  return (
                    <a
                      key={source.id}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-sky-200 hover:border-sky-400"
                    >
                      {source.name}
                    </a>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
        <aside className="mt-8 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-100">
          Educational purpose only. Not investment advice. Markets are subject
          to risk. Market hours, data availability and official-source pages can
          change; verify timestamps and data conditions at the source.
        </aside>
        <p className="mt-6 text-sm text-slate-400">
          For verified source links by topic, visit{" "}
          <Link href="/news" className="text-sky-300 hover:underline">
            the StockLearners news source directory
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
