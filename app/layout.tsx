import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://stockslearner.online";

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
  "@type": "Organization",
  name: "StockLearners",
  alternateName: ["Stock Learners", "Stock Learner"],
  url: siteUrl,
  logo: `${siteUrl}/logo.jpeg`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "StockLearners",

  title: {
    default: "StockLearners - Learn Stock Market, SIP Plans, Live News & Research",
    template: "%s | StockLearners",
  },

  description:
    "StockLearners helps you learn stock market in Hindi and English, explore SIP plans, follow live market news, and understand research and risk management in India.",

  keywords: [
    "stocklearners",
    "stock learners",
    "stock learner",
    "stock learning India",
    "learn stock market in Hindi",
    "stock market",
    "stock market learning",
    "SIP plans",
    "live stock market news",
    "stock market research",
    "trading education",
    "technical analysis",
    "trading psychology",
    "risk management",
  ],

  authors: [{ name: "StockLearners" }],
  creator: "StockLearners",
  publisher: "StockLearners",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: "StockLearners - Learn Stock Market, SIP Plans, Live News & Research",
    description:
      "Learn stock market in Hindi and English with StockLearners. Explore SIP plans, live news, research, and risk management.",
    url: siteUrl,
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
    title: "StockLearners - Learn Stock Market, SIP Plans, Live News & Research",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S74LMKD309"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S74LMKD309');
          `}
        </Script>



        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];
            t=b.createElement(e);
            t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s);
            }(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1595334955533581');
            fbq('track', 'PageView');
          `}
        </Script>

      </head>

      <body className="min-h-full flex flex-col">

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1595334955533581&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>



        {children}
      </body>
    </html>
  );
}