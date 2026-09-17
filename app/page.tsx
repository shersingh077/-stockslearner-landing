import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />

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
              VIP Membership plans देखें और अपनी membership के लिए Admin से सीधे chat करें।
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