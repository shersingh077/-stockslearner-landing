import type { Metadata } from "next";
import Link from "next/link";
import StockScreener from "@/components/StockScreener";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Indian Stock Company Screener",
  "Search selected Indian company reference pages by name, NSE symbol and broad sector. This educational directory does not rank securities or use live financial metrics.",
  "/screener",
);

export default function ScreenerPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-16 text-white sm:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Company screener",
              item: `${SITE_URL}/screener`,
            },
          ],
        }}
      />
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Company screener</span>
        </nav>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-sky-400">
          StockLearners research tool
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          Indian Stock Company Screener
        </h1>
        <p className="mt-5 max-w-3xl leading-8 text-slate-300">
          Explore a small, selected directory of company reference pages by
          company name, exchange symbol or broad sector. This is not a ranking
          or investment screener: there are no live prices, valuation metrics,
          financial filters or buy/sell signals.
        </p>
        <StockScreener />
        <aside className="mt-8 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-100">
          Educational purpose only. Not investment advice. Markets are subject
          to risk. Company descriptions are broad orientation only; verify
          current financial information and disclosures with official sources.
        </aside>
      </div>
    </main>
  );
}
