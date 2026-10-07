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
 * Reads from NEXT_PUBLIC_SITE_URL in production. Falls back to an RFC 2606
 * .example domain placeholder, consistent with siteConfig.contact.email below,
 * pending a real production domain being set via the env var.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.orbisleather.example";

/**
 * All values below are structural placeholders (RFC 2606 .example domain,
 * zeroed phone number, "#" social links) pending real brand information.
 */
export const siteConfig = {
  name: "ORBIS Signature Leather",
  shortName: "ORBIS",
  tagline: "Signature Leather",
  description:
    "Premium B2B wholesale leather manufacturing and private label production.",
  contact: {
    phone: "+00 (0) 000 000 000",
    email: "info@orbisleather.example",
    addressLines: ["Industrial District", "City, Country"],
  },
  whatsapp: {
    number: "10000000000",
    href: "https://wa.me/10000000000",
  },
  social: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Facebook", href: "#" },
  ],
} as const;
