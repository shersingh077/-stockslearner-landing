"use client";

import Link from "next/link";
import { useSyncExternalStore, useState } from "react";
import { stockReferences } from "@/lib/market-reference";

const storageKey = "stocklearners-watchlist-v1";
const serverSnapshot = "[]";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("stocklearners-watchlist-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("stocklearners-watchlist-change", callback);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(storageKey) ?? serverSnapshot;
  } catch (error) {
    console.error("Unable to read the local watchlist:", error);
    return serverSnapshot;
  }
}

function parseSymbols(snapshot: string) {
  try {
    const value: unknown = JSON.parse(snapshot);
    if (!Array.isArray(value)) return [];

    return value.filter(
      (symbol): symbol is string =>
        typeof symbol === "string" &&
        stockReferences.some((stock) => stock.symbol === symbol),
    );
  } catch (error) {
    console.error("Unable to parse the local watchlist:", error);
    return [];
  }
}

export default function Watchlist() {
  const [query, setQuery] = useState("");
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
  const symbols = parseSymbols(snapshot);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredStocks = stockReferences.filter(
    (stock) =>
      !symbols.includes(stock.symbol) &&
      (!normalizedQuery ||
        stock.symbol.toLowerCase().includes(normalizedQuery) ||
        stock.name.toLowerCase().includes(normalizedQuery)),
  );

  function updateSymbols(nextSymbols: string[]) {
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify([...new Set(nextSymbols)]),
      );
      window.dispatchEvent(new Event("stocklearners-watchlist-change"));
    } catch (error) {
      console.error("Unable to update the local watchlist:", error);
    }
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
        <h2 className="text-2xl font-bold">Saved stocks</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Saved on this browser only. This list does not include price alerts or
          live market data.
        </p>
        {symbols.length ? (
          <ul className="mt-5 space-y-3">
            {symbols.map((symbol) => {
              const stock = stockReferences.find(
                (item) => item.symbol === symbol,
              );
              if (!stock) return null;

              return (
                <li
                  key={symbol}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 p-4"
                >
                  <div>
                    <Link
                      href={`/stock/${stock.symbol.toLowerCase()}`}
                      className="font-semibold text-sky-300 hover:underline"
                    >
                      {stock.name}
                    </Link>
                    <p className="mt-1 text-sm text-slate-400">
                      {stock.symbol} · {stock.sector}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      updateSymbols(
                        symbols.filter((item) => item !== stock.symbol),
                      )
                    }
                    className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-rose-400 hover:text-rose-200"
                    aria-label={`Remove ${stock.name} from watchlist`}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-5 rounded-xl border border-dashed border-slate-700 p-5 text-sm text-slate-400">
            Your watchlist is empty. Add a stock from the reference list.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
        <h2 className="text-2xl font-bold">Add a stock</h2>
        <label
          htmlFor="watchlist-search"
          className="mt-4 block text-sm font-medium text-slate-300"
        >
          Search supported stock references
        </label>
        <input
          id="watchlist-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Company name or symbol"
          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none focus:border-sky-400"
        />
        <ul className="mt-4 max-h-96 space-y-2 overflow-auto">
          {filteredStocks.map((stock) => (
            <li
              key={stock.symbol}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 p-4"
            >
              <div>
                <p className="font-semibold">{stock.name}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {stock.symbol} · {stock.sector}
                </p>
              </div>
              <button
                type="button"
                onClick={() => updateSymbols([...symbols, stock.symbol])}
                className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400"
              >
                Add
              </button>
            </li>
          ))}
          {!filteredStocks.length && (
            <li className="p-4 text-sm text-slate-400">
              No unlisted stock references match that search.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
