import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for working with ORBIS Signature Leather.",
  path: "/terms",
  noindex: true,
});

export default function TermsPage() {
  return <PagePlaceholder title="Terms & Conditions" />;
}
