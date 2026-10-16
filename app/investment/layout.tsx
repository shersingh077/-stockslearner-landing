import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Investment Plan Enquiry",
  "Ask StockLearners about educational service options. No investment return is promised or guaranteed.",
  "/investment",
);

export default function InvestmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
