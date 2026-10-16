import type { Metadata } from "next";
import Watchlist from "@/components/Watchlist";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Personal Stock Watchlist",
  "Save selected Indian company references in this browser. StockLearners watchlist does not show live market prices or provide buy and sell alerts.",
  "/watchlist",
);

export default function WatchlistPage() {
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
              name: "Watchlist",
              item: `${SITE_URL}/watchlist`,
            },
          ],
        }}
      />
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-400">
          Private browser tool
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          Your Stock Watchlist
        </h1>
        <p className="mt-5 max-w-3xl leading-8 text-slate-300">
          Save and revisit selected company reference pages. Your list stays in
          this browser and is not synced to an account or sent to StockLearners.
          Live quotes, market alerts and recommendations are not available.
        </p>
        <Watchlist />
        <aside className="mt-8 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-100">
          A saved symbol is only a personal bookmark—not a suggestion to buy,
          sell or hold. Educational purpose only. Not investment advice.
          Markets are subject to risk.
        </aside>
      </div>
    </main>
  );
}
