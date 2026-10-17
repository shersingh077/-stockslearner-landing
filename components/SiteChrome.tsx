"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const appOnlyPrefixes = ["/admin", "/dashboard", "/chat", "/login", "/register"];

function shouldShowSiteChrome(pathname: string) {
  if (pathname === "/hi") return false;
  return !appOnlyPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default function SiteChrome({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  if (!shouldShowSiteChrome(pathname)) {
    return children;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[60] rounded-lg bg-white px-4 py-3 font-semibold text-slate-950 shadow-lg focus:not-sr-only"
      >
        Skip to content
      </a>
      <Navbar />
      <div id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
