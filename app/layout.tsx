import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ConsentAnalytics from "@/components/ConsentAnalytics";
import JsonLd from "@/components/JsonLd";
import SiteChrome from "@/components/SiteChrome";
import { SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ["Stock Learners", "Stock Learner"],
      url: SITE_URL,
      logo: `${SITE_URL}/logo.jpeg`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: ["Stock Learners", "Stock Learner"],
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["en-IN", "hi-IN"],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "StockLearners",

  title: {
    default: SITE_TITLE,
    template: "%s | StockLearners",
  },

  description:
    "StockLearners: stock market news and share market learning in India. Explore Nifty and Bank Nifty education, IPO GMP explainers, SIP tools and market research.",

  keywords: [
    "stocklearners",
    "stock learners",
    "stock learner",
    "share market news today",
    "Nifty prediction",
    "Bank Nifty levels",
    "stock market Hindi",
    "IPO GMP",
    "SIP calculator",
    "SIP plans",
    "learn stock market in India",
  ],

  authors: [{ name: "StockLearners" }],
  creator: "StockLearners",
  publisher: "StockLearners",

  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "hi-IN": "/hi",
      "x-default": "/",
    },
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },

  openGraph: {
    title: SITE_TITLE,
    description:
      "Stock market news and share market education in India. Learn about Nifty, IPOs, SIPs and market risk with StockLearners.",
    url: SITE_URL,
    siteName: "StockLearners",
    images: [
      {
        url: "/logo.jpeg",
        width: 512,
        height: 512,
        alt: "StockLearners Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "Learn stock market in Hindi and English with StockLearners. Explore SIP plans, live news, and market research.",
    images: ["/logo.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "0Nvm-72By-7BTfrCcyD1M0C_2ddyul5IKPb_dXBOFAE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={organizationSchema} />
      </head>

      <body className="min-h-full flex flex-col">
        <SiteChrome>{children}</SiteChrome>
        <ConsentAnalytics />
      </body>
    </html>
  );
}