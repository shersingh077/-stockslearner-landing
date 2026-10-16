import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "StockLearners VIP Membership",
  "Review StockLearners VIP membership options and contact the team for current access details.",
  "/vip",
);

export default function VipLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
