"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "News", href: "/news" },
    { name: "Stocks", href: "/stock" },
    { name: "Screener", href: "/screener" },
    { name: "Sectors", href: "/sector" },
    { name: "IPO", href: "/ipo" },
    { name: "Market Today", href: "/market-today" },
    { name: "Nifty Levels", href: "/nifty-levels-tomorrow" },
    { name: "Watchlist", href: "/watchlist" },
    { name: "Learning Guides", href: "/learn" },
    { name: "Calculators", href: "/calculators" },
    { name: "Membership", href: "/vip" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-5 justify-between">

        {/* Logo */}

       <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="StockLearners"
            width={48}
            height={48}
            className="h-12 w-12 rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-extrabold text-blue-600 leading-none">
              StockLearners
            </h2>
            <p className="text-[11px] text-slate-500 tracking-widest uppercase">
              Stock Market Education
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-4 text-sm font-medium text-slate-700 xl:flex">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="whitespace-nowrap transition-colors hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Join Button */}

        <a
          href="https://t.me/+q1uO_JMMmfIwNDE1"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden 2xl:inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 transition-all duration-300 shadow-lg shadow-blue-500/20"
        >
          Join Telegram →
        </a>

        <a
          href="/hi"
          lang="hi"
          hrefLang="hi-IN"
          className="hidden xl:inline-flex shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-600"
        >
          हिंदी
        </a>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto text-slate-700 xl:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>      {/* Mobile Menu */}

      {menuOpen && (

        <div className="bg-white border-t border-slate-200 xl:hidden">

          <div className="flex flex-col py-4">

            {navLinks.map((item) => (

              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 text-slate-700 hover:text-blue-600 transition"
              >
                {item.name}
              </Link>

            ))}

            <a
              href="/hi"
              lang="hi"
              hrefLang="hi-IN"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-3 font-semibold text-blue-600"
            >
              हिंदी में देखें
            </a>

            <div className="px-6 pt-4">

              <a
                href="https://t.me/+q1uO_JMMmfIwNDE1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block text-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition-all duration-300 shadow-lg shadow-blue-500/20"
              >
                Join Telegram →
              </a>

            </div>

          </div>

        </div>

      )}

    </header>
  );
}