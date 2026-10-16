import type { Metadata } from "next";

export const SITE_URL = "https://stockslearner.online";
export const SITE_NAME = "StockLearners";
export const SITE_TITLE =
  "StockLearners - Learn Stock Market, SIP Plans, Live News & Research";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/logo.jpeg",
          width: 512,
          height: 512,
          alt: `${SITE_NAME} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.jpeg"],
    },
  };
}

export function jsonLd(value: object): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
