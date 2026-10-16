import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "About StockLearners",
  "Learn about StockLearners, our educational approach to stock market learning in India and our commitment to clear risk disclosures.",
  "/about",
);

export default function AboutPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "About StockLearners",
        item: `${SITE_URL}/about`,
      },
    ],
  };

  return (
    <main className="flex min-h-screen items-center bg-slate-950 px-6 py-24 text-white">
      <JsonLd data={breadcrumb} />
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="font-semibold text-blue-400 transition hover:text-blue-300"
        >
          StockLearners
        </Link>

        <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">
          About StockLearners
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          StockLearners helps people in India learn about the stock market
          through accessible education, market insights, and practical lessons
          in technical analysis, trading psychology, and risk management.
        </p>

        <p className="mt-5 leading-7 text-slate-400">
          Our goal is to make stock market learning easier to approach for
          beginners and lifelong learners. Educational content is for learning
          purposes and is not individualized investment advice.
        </p>
        <p className="mt-5 leading-7 text-slate-400">
          StockLearners does not promise profits or guaranteed returns. Verify
          market information with official sources and consult a SEBI-registered
          professional for advice tailored to your circumstances.
        </p>

        <Link
          href="/#home"
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
