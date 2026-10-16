import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { sectors } from "@/lib/market-reference";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Indian Stock Market Sector Guides",
  "Explore educational guides to Indian banking, IT, energy, automobile, pharma, consumer, telecom and capital-goods sectors.",
  "/sector",
);

export default function SectorDirectoryPage() {
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
              name: "Sector guides",
              item: `${SITE_URL}/sector`,
            },
          ],
        }}
      />
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-400">
          Sector education
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          Indian Stock Market Sector Guides
        </h1>
        <p className="mt-5 max-w-3xl leading-8 text-slate-300">
          Learn the broad drivers and questions to investigate within selected
          sectors. Sector labels are general categories, not a substitute for
          company research or personalized advice.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {sectors.map((sector) => (
            <article
              key={sector.slug}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <h2 className="text-xl font-bold">
                <Link
                  href={`/sector/${sector.slug}`}
                  className="text-sky-300 hover:underline"
                >
                  {sector.name}
                </Link>
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                {sector.overview}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-100">
          Educational purpose only. Not investment advice. Markets are subject
          to risk.
        </p>
      </section>
    </main>
  );
}
