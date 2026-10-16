import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Terms of Use",
  "Terms for using StockLearners educational content, accounts, community and paid services.",
  "/terms",
);

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-200">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="text-sky-300">StockLearners</Link>
        <h1 className="mt-8 text-4xl font-bold">Terms of Use</h1>
        <p className="mt-5 leading-8">
          By accessing this website, you agree to use its educational content
          and community features lawfully. Content may change or be withdrawn
          without notice and is provided for general information, not as a
          personalized financial service.
        </p>
        <h2 className="mt-8 text-2xl font-semibold">Market risk</h2>
        <p className="mt-3 leading-8">
          Educational purpose only. Not investment advice. Markets are subject
          to risk. You are responsible for independent research and decisions.
          No content promises profit, capital protection or a particular
          investment outcome.
        </p>
        <h2 className="mt-8 text-2xl font-semibold">Accounts and community</h2>
        <p className="mt-3 leading-8">
          Keep your login details confidential and provide accurate
          registration information. Do not misuse the website, attempt
          unauthorized access, or submit unlawful, abusive or misleading
          content.
        </p>
        <h2 className="mt-8 text-2xl font-semibold">Third-party services</h2>
        <p className="mt-3 leading-8">
          External links, payment services and community platforms are governed
          by their own terms. Any paid service must be governed by its disclosed
          price, duration, scope and applicable refund terms before payment.
        </p>
        <p className="mt-8 text-sm text-slate-400">
          Last updated: 16 October 2026. These terms require review and
          completion by the site operator and legal counsel.
        </p>
      </article>
    </main>
  );
}
