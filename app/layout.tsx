import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site-config";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const description =
  "ORBIS Signature Leather — premium B2B wholesale leather manufacturing and private label production.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ORBIS Signature Leather",
    template: "%s | ORBIS Signature Leather",
  },
  description,
  openGraph: {
    title: "ORBIS Signature Leather",
    description,
    siteName: "ORBIS Signature Leather",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ORBIS Signature Leather",
    description,
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="min-h-screen bg-paper text-ink" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
