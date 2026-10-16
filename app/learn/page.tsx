import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { learningArticles } from "@/lib/learning-articles";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Stock Market Learning Guides",
  "Original beginner-friendly guides from StockLearners on Indian share market basics, SIPs and IPO grey market premium.",
  "/learn",
);

export default function LearningGuidesPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: `${SITE_NAME} Learning Guides`,
        item: `${SITE_URL}/learn`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <JsonLd data={breadcrumb} />
      <section className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-400">
          StockLearners Library
        </p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          Stock Market Learning Guides
        </h1>
        <p className="mt-5 max-w-3xl leading-8 text-slate-300">
          Clear, original explainers about market fundamentals, investment
          concepts and risk. These guides are educational and do not provide
          personalized recommendations.
        </p>
        <div className="mt-10 grid gap-5">
          {learningArticles.map((article) => (
            <article
              key={article.slug}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h2 className="text-xl font-bold">
                <Link
                  href={`/learn/${article.slug}`}
                  className="text-sky-300 underline-offset-4 hover:underline"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="mt-3 leading-7 text-slate-300">
                {article.description}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-10 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm text-amber-100">
          Educational purpose only. Not investment advice. Markets are subject
          to risk.
        </p>
      </section>
    </main>
  );
}
