import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

const title = "StockLearners - हिंदी में शेयर मार्केट सीखें";
const description =
  "StockLearners के साथ शेयर मार्केट की बुनियादी बातें, SIP और IPO GMP को हिंदी में समझें। जानकारी शैक्षिक है, निवेश सलाह नहीं।";

export const metadata: Metadata = {
  ...pageMetadata(title, description, "/hi"),
  alternates: {
    canonical: `${SITE_URL}/hi`,
    languages: {
      "en-IN": SITE_URL,
      "hi-IN": `${SITE_URL}/hi`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/hi`,
    siteName: SITE_NAME,
    locale: "hi_IN",
    type: "website",
    images: [{ url: "/logo.jpeg", width: 512, height: 512, alt: "StockLearners" }],
  },
};

const questions = [
  {
    question: "क्या StockLearners निवेश की सलाह देता है?",
    answer:
      "नहीं। StockLearners की सामग्री केवल शिक्षा के लिए है, व्यक्तिगत निवेश सलाह नहीं।",
  },
  {
    question: "क्या SIP में रिटर्न निश्चित होता है?",
    answer:
      "नहीं। म्यूचुअल फंड का मूल्य बाजार के साथ घट-बढ़ सकता है और रिटर्न की गारंटी नहीं होती।",
  },
  {
    question: "IPO GMP क्या आधिकारिक listing price बताता है?",
    answer:
      "नहीं। GMP अनौपचारिक grey market संकेत है और listing price की भविष्यवाणी या गारंटी नहीं है।",
  },
];

export default function HindiHomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        description,
        url: `${SITE_URL}/hi`,
        inLanguage: "hi-IN",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "FAQPage",
        mainEntity: questions.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <main lang="hi" className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <JsonLd data={schema} />
      <div className="mx-auto max-w-4xl">
        <nav className="flex items-center justify-between">
          <Link href="/" className="font-bold text-sky-300">
            StockLearners
          </Link>
          <Link href="/" hrefLang="en-IN" className="text-sm underline">
            English
          </Link>
        </nav>

        <section className="py-20">
          <p className="font-semibold text-sky-300">
            भारत के लिए शेयर मार्केट शिक्षा
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">
            StockLearners के साथ हिंदी में शेयर मार्केट सीखें
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            शेयर, बाजार सूचकांक, SIP और IPO से जुड़े शब्दों को सरल भाषा में
            समझें। हर लेख शैक्षिक जानकारी देता है—यह व्यक्तिगत निवेश सलाह या
            live market data नहीं है।
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/learn"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
            >
              सीखने के लेख देखें
            </Link>
            <Link
              href="/disclaimer"
              className="rounded-xl border border-slate-600 px-6 py-3 font-semibold hover:bg-slate-800"
            >
              जोखिम जानकारी
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">सीखने के विषय</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              ["शेयर बाजार की शुरुआत", "/learn/share-market-basics"],
              ["SIP की बुनियाद", "/learn/sip-investing-basics"],
              ["IPO GMP को समझें", "/learn/ipo-gmp-explained"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-sky-200 hover:border-blue-500"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold">अक्सर पूछे जाने वाले सवाल</h2>
          <div className="mt-5 space-y-4">
            {questions.map(({ question, answer }) => (
              <details
                key={question}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <summary className="cursor-pointer font-semibold">
                  {question}
                </summary>
                <p className="mt-3 leading-7 text-slate-300">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-14 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 leading-7 text-amber-100">
          केवल शैक्षिक उद्देश्य के लिए। निवेश सलाह नहीं। बाजार जोखिम के अधीन
          हैं। किसी भी निर्णय से पहले आधिकारिक जानकारी और योग्य सलाहकार से
          पुष्टि करें।
        </p>
        <footer className="mt-10 flex flex-wrap gap-5 text-sm text-slate-400">
          <Link href="/about">हमारे बारे में</Link>
          <Link href="/contact">संपर्क</Link>
          <Link href="/privacy">गोपनीयता नीति</Link>
          <Link href="/terms">उपयोग की शर्तें</Link>
        </footer>
      </div>
    </main>
  );
}
