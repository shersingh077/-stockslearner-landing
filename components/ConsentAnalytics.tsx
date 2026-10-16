"use client";

import Script from "next/script";
import Link from "next/link";
import { useSyncExternalStore } from "react";

type ConsentChoice = "accepted" | "rejected" | null;

const consentStorageKey = "stocklearners-consent-v1";
const configuredGoogleAnalyticsId =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const googleAnalyticsId =
  configuredGoogleAnalyticsId &&
  /^(G-[A-Z0-9]+|UA-\d+-\d+)$/.test(configuredGoogleAnalyticsId)
    ? configuredGoogleAnalyticsId
    : undefined;
const configuredMetaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const metaPixelId =
  configuredMetaPixelId && /^\d{5,20}$/.test(configuredMetaPixelId)
    ? configuredMetaPixelId
    : undefined;

if (configuredGoogleAnalyticsId && !googleAnalyticsId) {
  console.error("Invalid Google Analytics ID format.");
}

if (configuredMetaPixelId && !metaPixelId) {
  console.error("Invalid Meta Pixel ID format.");
}

const hasOptionalAnalytics = Boolean(googleAnalyticsId || metaPixelId);

function subscribeToConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("stocklearners-consent-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("stocklearners-consent-change", callback);
  };
}

function getConsentChoice(): ConsentChoice {
  try {
    const storedChoice = window.localStorage.getItem(consentStorageKey);
    return storedChoice === "accepted" || storedChoice === "rejected"
      ? storedChoice
      : null;
  } catch (error) {
    console.error("Unable to read analytics consent preference:", error);
    return null;
  }
}

export default function ConsentAnalytics() {
  const choice = useSyncExternalStore(
    subscribeToConsent,
    getConsentChoice,
    () => null,
  );

  function chooseConsent(nextChoice: Exclude<ConsentChoice, null>) {
    try {
      window.localStorage.setItem(consentStorageKey, nextChoice);
      window.dispatchEvent(new Event("stocklearners-consent-change"));
    } catch (error) {
      console.error("Unable to save analytics consent preference:", error);
    }
  }

  return (
    <>
      {choice === "accepted" && googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsId)}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `}
          </Script>
        </>
      )}
      {choice === "accepted" && metaPixelId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];
              t=b.createElement(e);
              t.async=!0;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s);
              }(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        </>
      )}

      {choice === null && hasOptionalAnalytics && (
        <section
          aria-label="Cookie preferences"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-700 bg-slate-950 p-4 text-white shadow-2xl sm:p-5"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl text-sm leading-6 text-slate-300">
              We use essential cookies for sign-in. With your permission, we
              also use analytics to understand site usage. Read our{" "}
              <Link href="/privacy" className="underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <button
                type="button"
                onClick={() => chooseConsent("rejected")}
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold hover:bg-slate-800"
              >
                Reject analytics
              </button>
              <button
                type="button"
                onClick={() => chooseConsent("accepted")}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500"
              >
                Accept analytics
              </button>
            </div>
          </div>
        </section>
      )}

      {choice !== null && hasOptionalAnalytics && (
        <button
          type="button"
          onClick={() => {
            try {
              window.localStorage.removeItem(consentStorageKey);
              window.dispatchEvent(new Event("stocklearners-consent-change"));
            } catch (error) {
              console.error("Unable to reset analytics consent:", error);
            }
          }}
          className="fixed bottom-3 left-3 z-50 rounded-full border border-slate-500 bg-slate-950 px-3 py-2 text-xs text-white shadow-lg hover:bg-slate-800"
          aria-label="Open cookie preferences"
        >
          Cookie settings
        </button>
      )}
    </>
  );
}
