import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Stock Market Learning Guides",
  "Original educational guides from StockLearners on Indian markets, SIPs and IPOs.",
  "/learn",
);

export default function LearnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
