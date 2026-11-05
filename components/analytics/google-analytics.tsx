"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

const CONSENT_KEY = "orbis-analytics-consent";

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    setConsent(stored === "accepted" || stored === "declined" ? stored : null);
    setReady(true);
  }, []);

  if (!measurementId) return null;

  function choose(value: "accepted" | "declined") {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  }

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}');
            `}
          </Script>
        </>
      )}
      {ready && consent === null && (
        <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl bg-ink p-5 text-paper shadow-2xl sm:inset-x-6">
          <p className="text-body text-paper/90">
            We use cookies to understand how visitors use our site. You can accept or decline analytics cookies.{" "}
            <Link href="/privacy-policy" className="link-underline text-paper">
              Privacy Policy
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="rounded-full bg-paper px-5 py-2 text-caption font-semibold text-ink"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose("declined")}
              className="rounded-full border border-paper/30 px-5 py-2 text-caption font-semibold text-paper"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
