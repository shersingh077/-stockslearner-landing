import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Refund Policy",
  "Review the StockLearners refund and cancellation terms before purchasing a paid service.",
  "/refund-policy",
);

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-200">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="text-sky-300">StockLearners</Link>
        <h1 className="mt-8 text-4xl font-bold">Refund and Cancellation Policy</h1>
        <p className="mt-5 leading-8">
          Before making a payment, ask the StockLearners team to confirm the
          service, price, access period, renewal terms and any applicable
          cancellation or refund conditions in writing.
        </p>
        <p className="mt-5 leading-8">
          No payment should be treated as a deposit for investment or as a
          promise of returns. If a payment is duplicated, unauthorized, or
          access to a paid service is not provided as agreed, contact the team
          with your transaction reference so the issue can be reviewed.
        </p>
        <p className="mt-5 leading-8">
          Any statutory rights available to you under applicable law are not
          limited by this notice. Contact us through the{" "}
          <Link href="/contact" className="text-sky-300">contact page</Link>{" "}
          before payment if terms are unclear.
        </p>
        <p className="mt-8 text-sm text-slate-400">
          Last updated: 16 October 2026. The operator must confirm final
          commercial terms before accepting paid orders.
        </p>
      </article>
    </main>
  );
}
