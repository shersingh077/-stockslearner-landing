import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />

      <section className="bg-slate-900 px-6 py-12" aria-labelledby="market-tools">
        <div className="mx-auto max-w-6xl">
          <h2
            id="market-tools"
            className="text-center text-2xl font-bold text-white sm:text-3xl"
          >
            Explore StockLearners
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Official News Sources", "/news"],
              ["Market Today Checklist", "/market-today"],
              ["Stock Company Guides", "/stock"],
              ["Company Screener", "/screener"],
              ["Sector Guides", "/sector"],
              ["IPO Information", "/ipo"],
              ["Nifty Levels Guide", "/nifty-levels-tomorrow"],
              ["Calculators", "/calculators"],
              ["Personal Watchlist", "/watchlist"],
              ["Learning Guides", "/learn"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-center font-semibold text-sky-200 transition hover:border-sky-400 hover:bg-slate-800"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-slate-900 to-slate-950 p-8 text-center shadow-2xl">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-yellow-400">
              Premium Membership
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              💎 VIP Membership
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              VIP Membership plans{" "}
              <span lang="hi">
                देखें और अपनी membership के लिए Admin से सीधे chat करें।
              </span>
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5">
                <p className="text-sm text-slate-400">1 Month</p>
                <p className="mt-2 text-2xl font-bold text-white">₹4,999</p>
              </div>

              <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-5">
                <p className="text-sm text-yellow-400">3 Months</p>
                <p className="mt-2 text-2xl font-bold text-white">₹9,999</p>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5">
                <p className="text-sm text-slate-400">1 Year</p>
                <p className="mt-2 text-2xl font-bold text-white">₹19,999</p>
              </div>
            </div>

            <a
              href="/vip"
              className="mt-8 inline-flex rounded-xl bg-yellow-500 px-7 py-3 font-bold text-slate-950 transition hover:bg-yellow-400"
            >
              💎 VIP Membership देखें
            </a>
          </div>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}