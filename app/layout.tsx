import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { defaultOgImage } from "@/lib/seo/metadata";
import { siteConfig, siteUrl } from "@/lib/site-config";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const description =
  "Leather jacket manufacturer in Karachi, since 2001. Private label and custom embroidery jackets from 5 pieces per style. Request a quote.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.brandName,
    template: `%s - ${siteConfig.brandName}`,
  },
  description,
  openGraph: {
    title: "Leather Jacket Manufacturer Pakistan | MOQ 5 Pieces | ORBIS",
    description,
    url: siteUrl,
    siteName: siteConfig.brandName,
    locale: "en_US",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leather Jacket Manufacturer Pakistan | MOQ 5 Pieces | ORBIS",
    description,
    images: [defaultOgImage.url],
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
