import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Privacy Policy",
  "How StockLearners handles account information, essential cookies, analytics choices and third-party services.",
  "/privacy",
);

export default function PrivacyPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Policy",
        item: `${SITE_URL}/privacy`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-200">
      <JsonLd data={breadcrumb} />
      <article className="mx-auto max-w-3xl space-y-5 leading-8 text-slate-300">
        <Link href="/" className="text-sky-300">StockLearners</Link>
        <h1 className="pt-4 text-4xl font-bold text-white">Privacy Policy</h1>
        <p>
          This policy explains how {SITE_NAME} handles information when you use
          this website. It is a general notice and should be reviewed against
          the operator&apos;s actual practices and applicable Indian privacy
          requirements before launch.
        </p>
        <h2 className="pt-3 text-2xl font-semibold text-white">Information you provide</h2>
        <p>
          If you register or contact us, we may process details such as your
          name, mobile number, email address, city, account credentials and
          messages. Account data is stored using the configured Supabase
          service. Passwords submitted through registration are hashed before
          storage.
        </p>
        <h2 className="pt-3 text-2xl font-semibold text-white">Cookies and analytics</h2>
        <p>
          Essential session cookies support sign-in, account and chat
          functionality. If configured, the site loads Google Analytics or
          Meta Pixel only after consent. You can reject non-essential analytics
          using the consent controls shown on the site; the current
          implementation stores this preference in your browser.
        </p>
        <h2 className="pt-3 text-2xl font-semibold text-white">Service providers and retention</h2>
        <p>
          Hosting, database, analytics and communication providers may process
          data to deliver their services under their own terms and privacy
          policies. Information is retained only as needed for the stated
          purposes, legal obligations and account operations. Contact the site
          operator to request access, correction or deletion where applicable.
        </p>
        <h2 className="pt-3 text-2xl font-semibold text-white">Contact</h2>
        <p>
          For privacy questions, use the{" "}
          <Link href="/contact" className="text-sky-300">contact page</Link>.
        </p>
        <p className="text-sm text-slate-400">
          Last updated: 16 October 2026. Obtain legal review before relying on
          this notice as a complete compliance policy.
        </p>
      </article>
    </main>
  );
}
