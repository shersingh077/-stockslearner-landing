import Link from "next/link";

const resourceLinks = [
  { href: "/learn", label: "Learning guides" },
  { href: "/news", label: "Official market sources" },
  { href: "/market-today", label: "Market checklist" },
  { href: "/stock", label: "Stock guides" },
  { href: "/sector", label: "Sector guides" },
  { href: "/ipo", label: "IPO information" },
  { href: "/screener", label: "Company directory" },
  { href: "/calculators", label: "Calculators" },
  { href: "/watchlist", label: "Personal watchlist" },
  { href: "/nifty-levels-tomorrow", label: "Nifty levels guide" },
];

const policyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
  { href: "/disclaimer", label: "Risk disclaimer" },
  { href: "/refund-policy", label: "Refund policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-12 md:grid-cols-[1.15fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="inline-flex rounded-md text-2xl font-extrabold tracking-tight text-white"
            >
              StockLearners
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              A learning-first market education portal with practical tools,
              selected company references and links to official sources.
            </p>
            <p className="mt-5 max-w-sm text-xs leading-6 text-slate-500">
              Educational information only—not personalized investment advice.
              Investments are subject to market risk.
            </p>
          </div>

          <nav aria-label="Learning resources">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
              Explore
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-sm text-slate-400 transition-colors hover:text-sky-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <nav aria-label="Company and policies">
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
                StockLearners
              </h2>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                {policyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-sm text-slate-400 transition-colors hover:text-sky-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/chat"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-600"
              >
                Chat with our team
              </Link>
              <a
                href="https://t.me/prime_stocks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-900"
              >
                Telegram contact
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 StockLearners. All rights reserved.</p>
          <p>Learn carefully. Verify information. Understand the risks.</p>
        </div>
      </div>
    </footer>
  );
}
