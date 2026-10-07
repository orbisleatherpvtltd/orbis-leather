import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/schema";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <GoogleAnalytics />
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
