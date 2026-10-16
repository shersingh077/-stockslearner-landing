export type LearningArticle = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const learningArticles: LearningArticle[] = [
  {
    slug: "share-market-basics",
    title: "Share Market Basics: A Beginner's Guide for India",
    description:
      "Understand shares, exchanges, demat accounts, indices and the risks beginners should know before investing.",
    publishedAt: "2026-10-16T08:00:00.000Z",
    updatedAt: "2026-10-16T08:00:00.000Z",
    sections: [
      {
        heading: "What is a share?",
        paragraphs: [
          "A share represents a small ownership interest in a company. When you buy a listed share, your investment value can rise or fall with the company's prospects, market conditions and investor expectations. A share does not promise a profit or a fixed return.",
          "Investors commonly distinguish long-term investing from short-term trading. They have different time horizons, research needs, costs and risks; neither approach guarantees a positive outcome.",
        ],
      },
      {
        heading: "How the Indian market works",
        paragraphs: [
          "In India, listed securities trade on exchanges such as the NSE and BSE through registered market intermediaries. A demat account holds securities electronically, while a trading account is used to place orders. Before opening accounts, check the intermediary's registration, fee schedule and grievance process.",
          "Indices such as the Nifty 50 and Sensex track selected groups of listed companies. An index level describes the index's calculated value; it is not a forecast of what an individual share will do.",
        ],
      },
      {
        heading: "A measured way to get started",
        paragraphs: [
          "Learn basic financial statements, diversification, order types, taxes and costs before risking money. Decide how much loss you could tolerate, avoid borrowing to speculate, and never invest money needed for near-term expenses.",
          "This guide is general education, not a personalized recommendation. Consider a SEBI-registered investment adviser for advice based on your financial circumstances.",
        ],
      },
    ],
  },
  {
    slug: "sip-investing-basics",
    title: "SIP Investing Basics: How a Systematic Investment Plan Works",
    description:
      "Learn what a mutual fund SIP is, how contributions work, and why calculator projections are not guaranteed returns.",
    publishedAt: "2026-10-16T08:05:00.000Z",
    updatedAt: "2026-10-16T08:05:00.000Z",
    sections: [
      {
        heading: "What is a SIP?",
        paragraphs: [
          "A Systematic Investment Plan (SIP) is a way to invest a chosen amount into a mutual fund at regular intervals. The SIP is a contribution method; it is not itself a fund, a guarantee, or a protection against market losses.",
          "The number of units bought at each instalment depends on the fund's applicable net asset value and transaction rules. The value of those units can go down as well as up.",
        ],
      },
      {
        heading: "Before setting up contributions",
        paragraphs: [
          "Understand the scheme's investment objective, riskometer, costs, exit load and tax treatment. Match the fund and investment horizon to your own goals and risk tolerance rather than choosing a scheme only from past performance.",
          "Keep emergency savings separate and check that recurring contributions remain affordable. SIP instructions may need to be stopped or changed through the fund house, registrar or platform used to set them up.",
        ],
      },
      {
        heading: "About SIP calculators",
        paragraphs: [
          "A calculator that assumes a constant annual rate is a mathematical illustration, not a forecast. Mutual fund returns vary, are not assured, and may be negative over some periods. Actual results also depend on the timing and terms of each contribution.",
          "Use projections only to compare hypothetical scenarios. Read scheme documents and consult a qualified professional if you need personalized financial advice.",
        ],
      },
    ],
  },
  {
    slug: "ipo-gmp-explained",
    title: "IPO GMP Explained: Meaning, Limits and Investor Risks",
    description:
      "Learn what grey market premium means, why it is unofficial, and why GMP cannot predict an IPO listing price.",
    publishedAt: "2026-10-16T08:10:00.000Z",
    updatedAt: "2026-10-16T08:10:00.000Z",
    sections: [
      {
        heading: "What does GMP mean?",
        paragraphs: [
          "IPO grey market premium (GMP) is an informal reference to trading interest in an IPO application or shares before official exchange listing. It is not an exchange-quoted price, an official valuation, or a regulated indication of what an investor will receive.",
          "Different sources may report inconsistent figures, and there may be no independently verifiable transaction behind a published number. A reported GMP can change quickly or be inaccurate.",
        ],
      },
      {
        heading: "Why GMP is not a listing forecast",
        paragraphs: [
          "The eventual listing price is determined by market orders after listing and can be higher or lower than the issue price. Informal grey-market signals may not reflect the demand, liquidity, disclosures or broader conditions that apply on listing day.",
          "Do not base an application solely on GMP, social posts or unverified screenshots. Read the offer document, understand the company's risks and financials, and make decisions according to your own circumstances.",
        ],
      },
      {
        heading: "Where to verify IPO information",
        paragraphs: [
          "For official issue dates, price bands, allotment and offer documents, use the exchange, issuer, registrar and SEBI-hosted sources. Treat third-party commentary as unverified unless its source and methodology are clear.",
          "This page is for education only. It is not investment advice or an endorsement of any IPO.",
        ],
      },
    ],
  },
];

export function getLearningArticle(slug: string) {
  return learningArticles.find((article) => article.slug === slug);
}
