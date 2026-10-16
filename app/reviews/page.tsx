import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "StockLearners Community",
  "Learn what StockLearners covers and how to access educational market resources.",
  "/reviews",
);

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">StockLearners Community</h1>
        <p className="mt-5 leading-8 text-slate-300">
          We publish verified learner feedback only with permission. Until
          authentic reviews are available, this page focuses on what learners
          can explore: market basics, risk awareness, IPO terminology and
          long-term investing concepts.
        </p>
        <p className="mt-5 leading-8 text-slate-300">
          We do not claim guaranteed results or publish fabricated performance
          claims. Educational purpose only. Not investment advice. Markets are
          subject to risk.
        </p>
      </section>
    </main>
  );
}