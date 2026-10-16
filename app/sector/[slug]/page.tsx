import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import {
  getSectorReference,
  getStocksForSector,
  sectors,
} from "@/lib/market-reference";
import { SITE_URL, pageMetadata } from "@/lib/seo";

type SectorPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return sectors.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorReference(slug);
  if (!sector) return {};

  return pageMetadata(
    `${sector.name} Sector Guide`,
    `${sector.overview} Educational sector guide from StockLearners, with company references and research questions.`,
    `/sector/${sector.slug}`,
  );
}

export default async function SectorGuidePage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = getSectorReference(slug);
  if (!sector) notFound();

  const stocks = getStocksForSector(sector.slug);
  const url = `${SITE_URL}/sector/${sector.slug}`;

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
              name: "Sectors",
              item: `${SITE_URL}/sector`,
            },
            { "@type": "ListItem", position: 3, name: sector.name, item: url },
          ],
        }}
      />
      <article className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/sector" className="hover:text-white">Sectors</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{sector.name}</span>
        </nav>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-sky-400">
          StockLearners sector guide
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          {sector.name} Sector
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          {sector.overview}
        </p>
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Questions for sector research</h2>
          <ul className="mt-4 list-inside list-disc space-y-3 leading-7 text-slate-300">
            {sector.considerations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        {stocks.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold">Selected company references</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Examples only—not a complete sector list or investment
              recommendation.
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {stocks.map((stock) => (
                <li
                  key={stock.symbol}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-4"
                >
                  <Link
                    href={`/stock/${stock.symbol.toLowerCase()}`}
                    className="font-semibold text-sky-300 hover:underline"
                  >
                    {stock.name} ({stock.symbol})
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <aside className="mt-10 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-100">
          Educational purpose only. Not investment advice. Markets are subject
          to risk. Sector factors may affect companies differently; verify
          current information in official filings.
        </aside>
      </article>
    </main>
  );
}
