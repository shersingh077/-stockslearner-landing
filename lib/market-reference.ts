export type StockReference = {
  symbol: string;
  name: string;
  sector: string;
  sectorSlug: string;
  overview: string;
  businessAreas: string[];
};

export type SectorReference = {
  slug: string;
  name: string;
  overview: string;
  considerations: string[];
};

export const sectors: SectorReference[] = [
  {
    slug: "banking",
    name: "Banking",
    overview:
      "Banks provide deposits, lending, payments and related financial services. Their performance can be influenced by credit quality, funding costs, interest rates, regulation and economic activity.",
    considerations: [
      "Compare asset quality, provisions and deposit growth across reporting periods.",
      "Review net interest margin alongside funding costs and loan mix.",
      "Read RBI policy decisions and bank disclosures; a policy rate alone does not determine a bank's share price.",
    ],
  },
  {
    slug: "information-technology",
    name: "Information Technology",
    overview:
      "Listed IT services companies provide software development, consulting, managed services and related digital work to Indian and international clients.",
    considerations: [
      "Track revenue by geography and service line as reported by each company.",
      "Currency movements and client spending can affect reported results.",
      "Compare employee costs, deal disclosures and cash generation over time.",
    ],
  },
  {
    slug: "energy",
    name: "Energy",
    overview:
      "The energy sector spans exploration, refining, fuel distribution, power and newer energy businesses. Companies can have very different exposures despite sharing a broad label.",
    considerations: [
      "Understand a company's mix of upstream, refining, retail and other businesses.",
      "Commodity prices, regulation, capital spending and transition plans can affect results.",
      "Use the latest annual report and exchange filings for company-specific information.",
    ],
  },
  {
    slug: "automobiles",
    name: "Automobiles",
    overview:
      "Automobile manufacturers and suppliers participate in passenger vehicles, commercial vehicles, two-wheelers and components, each with different demand and cost drivers.",
    considerations: [
      "Compare reported volumes, product mix and operating margins.",
      "Input costs, financing conditions and inventory can influence demand and profitability.",
      "Electric-vehicle disclosures are not a substitute for checking current financial performance.",
    ],
  },
  {
    slug: "pharmaceuticals",
    name: "Pharmaceuticals",
    overview:
      "Pharmaceutical companies develop, manufacture and distribute medicines in India and overseas. Business models can differ between branded generics, exports, APIs and research.",
    considerations: [
      "Review product and geography concentration in company filings.",
      "Regulatory observations, approvals and competition can affect operations.",
      "Distinguish company announcements from unverified social-media claims.",
    ],
  },
  {
    slug: "consumer-goods",
    name: "Consumer Goods",
    overview:
      "Consumer-goods businesses sell products such as packaged foods, personal-care items, household products and other everyday goods.",
    considerations: [
      "Look at volume growth, pricing and product mix separately where disclosed.",
      "Input costs, distribution reach and rural or urban demand can affect results.",
      "Past growth does not ensure future returns or make a security suitable for every investor.",
    ],
  },
  {
    slug: "telecommunications",
    name: "Telecommunications",
    overview:
      "Telecommunications operators provide mobile, broadband and enterprise connectivity. Network investment, spectrum, subscriber mix and regulation shape the sector.",
    considerations: [
      "Read disclosures on subscribers, average revenue and capital expenditure.",
      "Spectrum obligations, competition and network investment can affect cash flows.",
      "Check reported debt and regulatory disclosures rather than relying only on subscriber headlines.",
    ],
  },
  {
    slug: "capital-goods",
    name: "Capital Goods",
    overview:
      "Capital-goods companies supply engineering, construction, equipment and infrastructure-related services to public and private customers.",
    considerations: [
      "Review order inflows, order execution and working-capital needs.",
      "Projects can face delays, cost changes and customer concentration.",
      "An announced order is not the same as recognized revenue or profit.",
    ],
  },
];

export const stockReferences: StockReference[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Limited",
    sector: "Energy",
    sectorSlug: "energy",
    overview:
      "Reliance Industries Limited is a diversified Indian company with businesses spanning energy, retail, digital services and other reported segments.",
    businessAreas: [
      "Energy and materials",
      "Retail",
      "Digital services",
      "Other businesses described in company filings",
    ],
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Limited",
    sector: "Banking",
    sectorSlug: "banking",
    overview:
      "HDFC Bank Limited is an Indian banking company. Review its current financial results, regulatory disclosures and official exchange filings for updated information.",
    businessAreas: [
      "Retail and wholesale banking",
      "Deposits and lending",
      "Payments and related financial services",
    ],
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Limited",
    sector: "Banking",
    sectorSlug: "banking",
    overview:
      "ICICI Bank Limited is an Indian banking company. Its current business and financial position should be assessed from the bank's own disclosures and official filings.",
    businessAreas: [
      "Retail and corporate banking",
      "Deposits and lending",
      "Payments and related financial services",
    ],
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    sector: "Banking",
    sectorSlug: "banking",
    overview:
      "State Bank of India is a public-sector bank in India. Consult its published results and official filings for current business, financial and regulatory information.",
    businessAreas: [
      "Retail and corporate banking",
      "Deposits and lending",
      "Payments and related financial services",
    ],
  },
  {
    symbol: "INFY",
    name: "Infosys Limited",
    sector: "Information Technology",
    sectorSlug: "information-technology",
    overview:
      "Infosys Limited provides information technology services and consulting. Its results can reflect client demand, geography, service mix and currency movements.",
    businessAreas: [
      "Information technology services",
      "Consulting",
      "Digital and business services",
    ],
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services Limited",
    sector: "Information Technology",
    sectorSlug: "information-technology",
    overview:
      "Tata Consultancy Services Limited provides IT services, consulting and business solutions to clients in India and internationally.",
    businessAreas: [
      "Information technology services",
      "Consulting",
      "Business solutions",
    ],
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Limited",
    sector: "Telecommunications",
    sectorSlug: "telecommunications",
    overview:
      "Bharti Airtel Limited operates telecommunications and related connectivity businesses. Refer to current company reporting for segment and operating details.",
    businessAreas: [
      "Mobile connectivity",
      "Broadband and fixed connectivity",
      "Enterprise and related digital services",
    ],
  },
  {
    symbol: "LT",
    name: "Larsen & Toubro Limited",
    sector: "Capital Goods",
    sectorSlug: "capital-goods",
    overview:
      "Larsen & Toubro Limited is an Indian engineering and infrastructure company with operations across multiple reported business segments.",
    businessAreas: [
      "Engineering and construction",
      "Infrastructure and project execution",
      "Other businesses described in company filings",
    ],
  },
  {
    symbol: "ITC",
    name: "ITC Limited",
    sector: "Consumer Goods",
    sectorSlug: "consumer-goods",
    overview:
      "ITC Limited is a diversified Indian company. Its businesses and segment performance should be checked against the latest annual report and exchange disclosures.",
    businessAreas: [
      "Fast-moving consumer goods",
      "Hotels and paperboards businesses",
      "Other reported businesses",
    ],
  },
  {
    symbol: "SUNPHARMA",
    name: "Sun Pharmaceutical Industries Limited",
    sector: "Pharmaceuticals",
    sectorSlug: "pharmaceuticals",
    overview:
      "Sun Pharmaceutical Industries Limited operates in the pharmaceutical sector. Current product, geography and financial information is available in company filings.",
    businessAreas: [
      "Pharmaceutical products",
      "Branded and generic medicines",
      "Other businesses described in company filings",
    ],
  },
];

export const officialSources = [
  {
    id: "nse",
    name: "National Stock Exchange of India",
    description:
      "Use the exchange for market information, listed-company disclosures and public issue information.",
    url: "https://www.nseindia.com/",
  },
  {
    id: "bse",
    name: "BSE",
    description:
      "Exchange market information, index references, corporate announcements and public issue resources.",
    url: "https://www.bseindia.com/",
  },
  {
    id: "sebi",
    name: "Securities and Exchange Board of India",
    description:
      "Regulatory circulars, investor education, intermediary registration and official announcements.",
    url: "https://www.sebi.gov.in/",
  },
  {
    id: "rbi",
    name: "Reserve Bank of India",
    description:
      "Monetary policy, banking regulation, official releases and financial-system information.",
    url: "https://www.rbi.org.in/",
  },
  {
    id: "mospi",
    name: "Ministry of Statistics and Programme Implementation",
    description:
      "Official statistics and publications, including national economic indicators.",
    url: "https://www.mospi.gov.in/",
  },
  {
    id: "finmin",
    name: "Ministry of Finance",
    description:
      "Official government information on Union Budget material and finance-related announcements.",
    url: "https://finmin.gov.in/",
  },
  {
    id: "mcx",
    name: "Multi Commodity Exchange of India",
    description:
      "Exchange source for commodity-market information and exchange announcements.",
    url: "https://www.mcxindia.com/",
  },
  {
    id: "pib",
    name: "Press Information Bureau",
    description:
      "Government press releases and official policy announcements.",
    url: "https://pib.gov.in/",
  },
];

export function getStockReference(symbol: string) {
  return stockReferences.find(
    (stock) => stock.symbol.toLowerCase() === symbol.toLowerCase(),
  );
}

export function getSectorReference(slug: string) {
  return sectors.find((sector) => sector.slug === slug);
}

export function getStocksForSector(sectorSlug: string) {
  return stockReferences.filter((stock) => stock.sectorSlug === sectorSlug);
}
