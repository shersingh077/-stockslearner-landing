"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

       <a
  href="#home"
  className="flex items-center gap-3"
>
  <img
    src="/logo.jpeg?v=2"
    alt="StocksLearner"
    className="h-12 w-12 rounded-xl shadow-lg"
  />

  <div>

    <h2 className="text-2xl font-extrabold text-blue-600 leading-none">
      StocksLearner
    </h2>

    <p className="text-[11px] text-slate-500 tracking-widest uppercase">
      Stock Market Education
    </p>

  </div>

  </a>

        {/* Desktop Menu */}

        <nav className="hidden md:flex items-center gap-8 text-slate-700 font-medium">

          {navLinks.map((item) => (

            <a
              key={item.name}
              href={item.href}
              className="hover:text-blue-600 transition-all duration-300"
            >
              {item.name}
            </a>

          ))}

        </nav>

        {/* Join Button */}

        <a
          href="https://t.me/STOCK_LEARNER_official"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 transition-all duration-300 shadow-lg shadow-blue-500/20"
        >
          Join Telegram →
        </a>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-700"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>      {/* Mobile Menu */}

      {menuOpen && (

        <div className="md:hidden bg-white border-t border-slate-200">

          <div className="flex flex-col py-4">

            {navLinks.map((item) => (

              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 text-slate-700 hover:text-blue-600 transition"
              >
                {item.name}
              </a>

            ))}

            <div className="px-6 pt-4">

              <a
                href="https://t.me/STOCK_LEARNER_official"
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