import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "How StockLearners Works",
  "Explore the StockLearners learning process: start with market basics, learn risk concepts and continue studying at your own pace.",
  "/process",
);

export default function ProcessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        Our Process
      </h1>
    </main>
  );
}