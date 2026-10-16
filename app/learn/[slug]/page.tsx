import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getLearningArticle, learningArticles } from "@/lib/learning-articles";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return learningArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getLearningArticle(slug);

  if (!article) return {};

  return pageMetadata(article.title, article.description, `/learn/${slug}`);
}

export default async function LearningArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const article = getLearningArticle(slug);

  if (!article) notFound();

  const url = `${SITE_URL}/learn/${article.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learning Guides",
        item: `${SITE_URL}/learn`,
      },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <article className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span aria-hidden="true"> / </span>
          <Link href="/learn" className="hover:text-white">
            Learning Guides
          </Link>
        </nav>

        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-sky-400">
          StockLearners Learning Guide
        </p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          {article.description}
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Published{" "}
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString("en-IN", {
              dateStyle: "long",
              timeZone: "UTC",
            })}
          </time>
        </p>

        <div className="mt-12 space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-white">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-300">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="mt-12 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm leading-6 text-amber-100">
          Educational purpose only. Not investment advice. Markets are subject
          to risk. Verify current information with official sources before
          making financial decisions.
        </aside>

        <section className="mt-12 border-t border-slate-800 pt-8">
          <h2 className="text-xl font-bold">More learning guides</h2>
          <ul className="mt-4 space-y-3">
            {learningArticles
              .filter((item) => item.slug !== article.slug)
              .map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/learn/${item.slug}`}
                    className="text-sky-300 underline-offset-4 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
