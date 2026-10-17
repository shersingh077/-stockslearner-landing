import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Contact StockLearners",
  "Contact StockLearners for account, community and educational-content questions.",
  "/contact",
);

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-3xl">
        <Link href="/" className="text-sky-300">StockLearners</Link>
        <h1 className="mt-8 text-4xl font-bold">Contact StockLearners</h1>
        <p className="mt-5 max-w-2xl leading-8 text-slate-300">
          For questions about your account, community access or educational
          content, start a conversation through the website or use our official
          Telegram links. Do not send passwords, OTPs or sensitive financial
          information in chat.
        </p>
        <Link
          href="/chat"
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
        >
          Start a website chat
        </Link>
        <a
          href="https://t.me/+q1uO_JMMmfIwNDE1"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex rounded-xl border border-slate-600 px-6 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Join Telegram community
        </a>
        <a
          href="https://t.me/prime_stocks"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex rounded-xl border border-slate-600 px-6 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Contact @prime_stocks on Telegram
        </a>
        <p className="mt-8 text-sm leading-6 text-slate-400">
          For privacy questions, see our{" "}
          <Link href="/privacy" className="text-sky-300 underline">
            Privacy Policy
          </Link>
          . Market content is educational only and is not investment advice.
        </p>
      </section>
    </main>
  );
}