import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Investment Risk Disclaimer",
  "StockLearners content is educational only, is not investment advice, and does not promise returns.",
  "/disclaimer",
);

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-200">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="text-sky-300">StockLearners</Link>
        <h1 className="mt-8 text-4xl font-bold">Investment Risk Disclaimer</h1>
        <p className="mt-5 text-lg font-semibold leading-8 text-amber-200">
          Educational purpose only. Not investment advice. Markets are subject
          to risk.
        </p>
        <p className="mt-5 leading-8">
          StockLearners publishes general educational material. It does not
          consider your financial position, objectives, experience or risk
          tolerance and should not be treated as a recommendation to buy, sell
          or hold a security or financial product.
        </p>
        <p className="mt-5 leading-8">
          Securities and derivatives can lose value, including the full amount
          invested. Historical performance, examples, projections and
          calculator outputs do not guarantee future outcomes. Verify prices,
          filings and announcements with official sources; data can be delayed
          or unavailable.
        </p>
        <p className="mt-5 leading-8">
          StockLearners does not claim to be a SEBI-registered investment
          adviser or research analyst. Consult a SEBI-registered professional
          for advice appropriate to your circumstances.
        </p>
      </article>
    </main>
  );
}
