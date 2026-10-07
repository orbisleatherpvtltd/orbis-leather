import { prisma } from "@/lib/db";
import { siteConfig } from "@/lib/site-config";

export const DEFAULT_SETTINGS: Record<string, string> = {
  "contact.phone": siteConfig.contact.phone,
  "contact.email": siteConfig.contact.email,
  "contact.address": siteConfig.contact.addressLines.join("\n"),
  "whatsapp.number": siteConfig.whatsapp.number,
  "whatsapp.href": siteConfig.whatsapp.href,
};

export const SETTINGS_LABELS: Record<string, string> = {
  "contact.phone": "Contact Phone",
  "contact.email": "Contact Email",
  "contact.address": "Contact Address",
  "whatsapp.number": "WhatsApp Number",
  "whatsapp.href": "WhatsApp Link",
};

/**
 * Merges DB-stored overrides on top of the static lib/site-config.ts defaults
 * so the admin panel always has sane values even before any setting is saved.
 */
export async function getSiteSettings(): Promise<Record<string, string>> {
  const rows = await prisma.siteSetting.findMany();
  const overrides: Record<string, string> = {};
  for (const row of rows) {
    overrides[row.key] = typeof row.value === "string" ? row.value : JSON.stringify(row.value);
  }
  return { ...DEFAULT_SETTINGS, ...overrides };
}
