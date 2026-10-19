export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Products", href: "/products" },
  { label: "Quality", href: "/quality-compliance" },
  { label: "Blog / Resources", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];

export const requestQuoteHref = "/request-quote";

/**
 * Reads from NEXT_PUBLIC_SITE_URL in production. Falls back to the real
 * production domain so canonical/og:url tags are never wrong by default.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.orbisleatherpvtltd.com";

export const siteConfig = {
  name: "ORBIS Signature Leather",
  brandName: "ORBIS Leather",
  alternateName: "ORBIS Signature Leather",
  shortName: "ORBIS",
  tagline: "Signature Leather",
  description:
    "Premium B2B wholesale leather manufacturing and private label production.",
  contact: {
    phone: "+92 333 4544557",
    email: "inquiry@orbisleatherpvtltd.com",
    addressLines: ["Sector 35 B, Landhi Town", "Karachi, Pakistan"],
  },
  whatsapp: {
    number: "923334544557",
    href: "https://wa.me/923334544557?text=Hi%20ORBIS%2C%20I%20would%20like%20to%20ask%20about%20leather%20jackets%20(MOQ%205%20per%20style).",
  },
  // No real social profile URLs yet — keep empty so the footer hides the
  // icons rather than linking to dead "#" placeholders. Repopulate once the
  // owner provides real Instagram/LinkedIn/Facebook URLs, and add them to
  // organizationJsonLd()'s `sameAs` in lib/seo/schema.ts at the same time.
  social: [] as { label: string; href: string }[],
} as const;
