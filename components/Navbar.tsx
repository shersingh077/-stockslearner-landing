"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Learn", href: "/learn" },
  { name: "Markets", href: "/news" },
  { name: "Stocks", href: "/stock" },
  { name: "Tools", href: "/calculators" },
  { name: "IPO", href: "/ipo" },
  { name: "Membership", href: "/vip" },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-lg"
          aria-label="StockLearners home"
        >
          <Image
            src="/logo.jpeg"
            alt=""
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-xl object-cover"
          />
          <span>
            <span className="block text-xl font-extrabold leading-5 tracking-tight text-slate-950">
              StockLearners
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Learn with clarity
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 text-sm font-semibold text-slate-600 lg:flex xl:gap-7"
        >
          {navLinks.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-md py-2 transition-colors hover:text-blue-700 ${
                  active ? "text-blue-700" : ""
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            href="/hi"
            lang="hi"
            hrefLang="hi-IN"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            हिंदी
          </Link>
          <Link
            href="/chat"
            className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-800"
          >
            Chat with us
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-slate-200 bg-white px-4 pb-5 pt-2 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {navLinks.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 text-sm font-semibold transition-colors hover:bg-slate-50 ${
                    active ? "text-blue-700" : "text-slate-700"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
              <Link
                href="/hi"
                lang="hi"
                hrefLang="hi-IN"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
              >
                हिंदी में देखें
              </Link>
              <Link
                href="/chat"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white"
              >
                Chat with us
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
