import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import {
  getStockReference,
  stockReferences,
} from "@/lib/market-reference";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

type StockPageProps = {
  params: Promise<{ symbol: string }>;
};

export function generateStaticParams() {
  return stockReferences.map(({ symbol }) => ({
    symbol: symbol.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: StockPageProps): Promise<Metadata> {
  const { symbol } = await params;
  const stock = getStockReference(symbol);
  if (!stock) return {};

  return pageMetadata(
    `${stock.name} (${stock.symbol}) Company Guide`,
    `${stock.overview} Educational company reference from StockLearners, not investment advice or live market data.`,
    `/stock/${stock.symbol.toLowerCase()}`,
  );
}

export default async function StockReferencePage({ params }: StockPageProps) {
  const { symbol } = await params;
  const stock = getStockReference(symbol);
  if (!stock) notFound();

  const url = `${SITE_URL}/stock/${stock.symbol.toLowerCase()}`;

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
              name: "Stocks",
              item: `${SITE_URL}/stock`,
            },
            { "@type": "ListItem", position: 3, name: stock.symbol, item: url },
          ],
        }}
      />
      <article className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/stock" className="hover:text-white">Stocks</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{stock.symbol}</span>
        </nav>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-sky-400">
          {SITE_NAME} company reference · {stock.symbol}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          {stock.name}
        </h1>
        <p className="mt-3 text-slate-400">
          NSE symbol: {stock.symbol} · Sector:{" "}
          <Link
            href={`/sector/${stock.sectorSlug}`}
            className="text-sky-300 hover:underline"
          >
            {stock.sector}
          </Link>
        </p>
        <p className="mt-8 text-lg leading-8 text-slate-300">
          {stock.overview}
        </p>
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Broad business areas</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 leading-7 text-slate-300">
            {stock.businessAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            This is a general orientation, not a complete or up-to-date
            description of every business. Confirm the latest segment
            information in the company&apos;s annual report and exchange filings.
          </p>
        </section>
        <section className="mt-8 rounded-2xl border border-sky-400/30 bg-sky-400/5 p-6">
          <h2 className="text-xl font-bold">Verify current information</h2>
          <p className="mt-3 leading-7 text-slate-300">
            No live price, technical level or buy/sell view is provided on this
            page. Visit the official exchanges and search for the company
            symbol to review current quotes and disclosures.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <a
              href={`https://www.nseindia.com/get-quotes/equity?symbol=${encodeURIComponent(stock.symbol)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-sky-500 px-4 py-2 font-semibold text-slate-950 hover:bg-sky-400"
            >
              Search on NSE
            </a>
            <a
              href="https://www.bseindia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-600 px-4 py-2 font-semibold hover:border-sky-400"
            >
              Visit BSE
            </a>
          </div>
        </section>
        <aside className="mt-8 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-100">
          Educational purpose only. Not investment advice. Markets are subject
          to risk. No company described here is a recommendation to buy, sell
          or hold a security.
        </aside>
      </article>
    </main>
  );
}
