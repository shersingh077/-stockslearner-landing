import {
  ArrowUpRight,
  BookOpen,
  Calculator,
  FileText,
  Landmark,
  Search,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";

const learningPaths = [
  {
    icon: BookOpen,
    eyebrow: "Build your foundation",
    title: "Learn the essentials",
    description:
      "Start with clear explainers on shares, market basics, SIPs and IPO terminology.",
    href: "/learn",
    link: "Browse learning guides",
  },
  {
    icon: Landmark,
    eyebrow: "Use primary sources",
    title: "Research with context",
    description:
      "Find official exchange, regulator and government links alongside practical market checklists.",
    href: "/news",
    link: "Explore market references",
  },
  {
    icon: Calculator,
    eyebrow: "Practice with your inputs",
    title: "Try the calculators",
    description:
      "Explore SIP, lump-sum, CAGR, brokerage, margin, position-size and retirement illustrations.",
    href: "/calculators",
    link: "Open the calculators",
  },
];

const portalTools = [
  {
    icon: FileText,
    title: "IPO information",
    description: "Learn how to verify IPO details and understand GMP limitations.",
    href: "/ipo",
  },
  {
    icon: Search,
    title: "Company directory",
    description: "Browse selected company references by name, symbol or sector.",
    href: "/screener",
  },
  {
    icon: ShieldCheck,
    title: "Market checklists",
    description: "Use source-led checklists for market context and index research.",
    href: "/market-today",
  },
];

export default function Home() {
  return (
    <main id="home" className="min-h-screen bg-slate-50">
      <Hero />

      <section
        id="services"
        aria-labelledby="learning-paths-title"
        className="px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
              Learn with clarity
            </p>
            <h2
              id="learning-paths-title"
              className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl"
            >
              Start with what you want to understand.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Explore educational resources and tools at your own pace. We
              distinguish reference material from live market data and
              investment advice.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {learningPaths.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/[0.06] sm:p-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-blue-700">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                    {item.link}
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="tools-title"
        className="border-y border-slate-200 bg-white px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                StockLearners portal
              </p>
              <h2
                id="tools-title"
                className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl"
              >
                Useful references, without the noise.
              </h2>
            </div>
            <Link
              href="/stock"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
            >
              Browse all stock guides
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {portalTools.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-blue-200 hover:bg-blue-50/60"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                    <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-bold text-slate-950">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      {item.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {[
              ["Sector guides", "/sector"],
              ["Personal watchlist", "/watchlist"],
              ["Nifty levels guide", "/nifty-levels-tomorrow"],
              ["Market today", "/market-today"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-800"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="membership"
        aria-labelledby="membership-title"
        className="px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-7 rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl shadow-slate-900/10 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-300">
              Membership
            </p>
            <h2
              id="membership-title"
              className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Explore StockLearners VIP.
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Review the current membership information. Enquiries continue
              through the existing website chat; online card or UPI checkout
              is not connected.
            </p>
          </div>
          <Link
            href="/vip"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-300 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-sky-200"
          >
            View membership details
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <FAQ />
      <Contact />
    </main>
  );
}
