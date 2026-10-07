import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How ORBIS Signature Leather collects, uses, and protects your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <PagePlaceholder title="Privacy Policy" />;
}
