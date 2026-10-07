"use client";

import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-paper px-6 text-center text-ink">
        <p className="text-eyebrow font-medium uppercase tracking-[0.16em] text-leather">
          ORBIS Signature Leather
        </p>
        <h1 className="text-h2 font-bold">Something went wrong</h1>
        <p className="max-w-md text-body text-ink/70">
          An unexpected error occurred while loading the application.
        </p>
        <button
          type="button"
          onClick={retry}
          className="bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors duration-200 hover:bg-leather"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
