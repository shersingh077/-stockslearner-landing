import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { officialSources } from "@/lib/market-reference";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "IPO Information and Official Sources in India",
  "Learn how to verify Indian IPO dates, offer documents, price bands and allotment information with official SEBI and exchange sources. No unverified GMP feed.",
  "/ipo",
);

export default function IpoPage() {
  const sources = officialSources.filter((source) =>
    ["sebi", "nse", "bse"].includes(source.id),
  );

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
              name: "IPO information",
              item: `${SITE_URL}/ipo`,
            },
          ],
        }}
      />
      <article className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">IPO information</span>
        </nav>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-sky-400">
          Initial Public Offering guide
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          IPO Information: Verify Before You Apply
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          StockLearners does not currently publish a live IPO calendar,
          allotment status, issue subscription data or grey-market premium
          feed. For current details, use the issuer, registrar, SEBI and official
          exchange disclosures.
        </p>
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">What to verify in an IPO</h2>
          <ol className="mt-4 list-inside list-decimal space-y-3 leading-7 text-slate-300">
            <li>Read the offer document and understand disclosed risk factors.</li>
            <li>Confirm issue dates, price band and lot size from official notices.</li>
            <li>
              Review the issuer&apos;s financial statements, objects and use of
              proceeds.
            </li>
            <li>Use the registrar or exchange for official allotment information.</li>
            <li>Treat unofficial GMP estimates as unverified and non-predictive.</li>
          </ol>
        </section>
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {sources.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-sky-400/30 bg-sky-400/5 p-5 hover:border-sky-300"
            >
              <h2 className="font-bold text-sky-200">{source.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {source.description}
              </p>
              <span className="mt-4 inline-block text-sm underline underline-offset-4">
                Visit official site
              </span>
            </a>
          ))}
        </section>
        <p className="mt-8 leading-7 text-slate-300">
          Learn more about{" "}
          <Link
            href="/learn/ipo-gmp-explained"
            className="text-sky-300 underline"
          >
            what IPO GMP means and its limitations
          </Link>
          .
        </p>
        <aside className="mt-8 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-100">
          Educational purpose only. Not investment advice. Markets are subject
          to risk. An IPO application can result in a loss; no listing gain or
          outcome is assured.
        </aside>
      </article>
    </main>
  );
}
