"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { sectors, stockReferences } from "@/lib/market-reference";

export default function StockScreener() {
  const [query, setQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return stockReferences.filter((stock) => {
      const matchesSector =
        sectorFilter === "all" || stock.sectorSlug === sectorFilter;
      const matchesQuery =
        !normalizedQuery ||
        stock.name.toLowerCase().includes(normalizedQuery) ||
        stock.symbol.toLowerCase().includes(normalizedQuery);
      return matchesSector && matchesQuery;
    });
  }, [query, sectorFilter]);

  return (
    <section className="mt-8">
      <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-200">
          Search by company or NSE symbol
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="e.g. Reliance or INFY"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-base text-white outline-none focus:border-sky-400"
          />
        </label>
        <label className="block text-sm font-medium text-slate-200">
          Sector
          <select
            value={sectorFilter}
            onChange={(event) => setSectorFilter(event.currentTarget.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-base text-white outline-none focus:border-sky-400"
          >
            <option value="all">All selected sectors</option>
            {sectors.map((sector) => (
              <option key={sector.slug} value={sector.slug}>
                {sector.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-3 text-sm text-slate-400" aria-live="polite">
        Showing {matches.length} of {stockReferences.length} selected company
        references. This tool filters names and sectors only; it does not screen
        by financial performance, price or valuation.
      </p>
      {matches.length ? (
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((stock) => (
            <li
              key={stock.symbol}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <h2 className="font-bold">
                <Link
                  href={`/stock/${stock.symbol.toLowerCase()}`}
                  className="text-sky-300 hover:underline"
                >
                  {stock.name}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                {stock.symbol} ·{" "}
                <Link
                  href={`/sector/${stock.sectorSlug}`}
                  className="hover:text-sky-300 hover:underline"
                >
                  {stock.sector}
                </Link>
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {stock.overview}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 rounded-xl border border-dashed border-slate-700 p-5 text-slate-400">
          No selected company references match those filters.
        </p>
      )}
    </section>
  );
}
