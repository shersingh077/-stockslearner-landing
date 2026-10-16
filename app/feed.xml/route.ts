import { learningArticles } from "@/lib/learning-articles";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = learningArticles
    .map((article) => {
      const url = `${SITE_URL}/learn/${article.slug}`;

      return `<item>
        <title>${escapeXml(article.title)}</title>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <description>${escapeXml(article.description)}</description>
        <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>${SITE_NAME} Learning</title>
      <link>${SITE_URL}</link>
      <description>Original educational guides about markets, investing and IPOs.</description>
      <language>en-IN</language>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
