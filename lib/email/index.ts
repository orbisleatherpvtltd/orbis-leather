import type { EmailProvider } from "@/lib/email/types";
import { createResendProvider } from "@/lib/email/resend-provider";
import { createConsoleProvider } from "@/lib/email/console-provider";
import { siteConfig, siteUrl } from "@/lib/site-config";

function getEmailProvider(): EmailProvider {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (apiKey && from) {
    return createResendProvider(apiKey, from);
  }
  return createConsoleProvider();
}

export type InquiryNotification = {
  name: string;
  email: string;
  inquiryType: string;
  quantityPerStyle?: string;
  country: string;
  rows: Array<[string, string]>;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function absoluteFileUrl(value: string) {
  return value
    .split("\n")
    .map((line) => (line.startsWith("/") ? new URL(line, siteUrl).toString() : line))
    .join("\n");
}

async function safeSend(subject: string, to: string, html: string, text: string): Promise<void> {
  try {
    await getEmailProvider().send({ to, subject, html, text });
  } catch (error) {
    console.error(`Failed to send email "${subject}" to ${to}:`, error);
  }
}

export async function notifyAdminOfInquiry(inquiry: InquiryNotification): Promise<void> {
  const to = process.env.EMAIL_TO || siteConfig.contact.email;
  const subject = inquiry.quantityPerStyle
    ? `New inquiry: ${inquiry.inquiryType} - ${inquiry.quantityPerStyle} pcs - ${inquiry.country}`
    : `New inquiry: ${inquiry.inquiryType} - ${inquiry.country}`;

  const rows = inquiry.rows.map(([label, value]) => [
    label,
    label === "Design files" ? absoluteFileUrl(value) : value,
  ]) as Array<[string, string]>;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top;">${escapeHtml(label)}</td><td>${escapeHtml(value).replace(/\n/g, "<br />")}</td></tr>`,
    )
    .join("");

  const html = `<h2>${escapeHtml(subject)}</h2><table>${htmlRows}</table>`;
  await safeSend(subject, to, html, text);
}

export async function sendInquiryConfirmation(inquiry: { name: string; email: string }): Promise<void> {
  const subject = "We received your inquiry | ORBIS";
  const text = `Hi ${inquiry.name},

Thank you for contacting ORBIS. We have received your inquiry and our team will reply within 1 business day.

If your question is urgent, message us on WhatsApp: ${siteConfig.contact.phone}.

ORBIS
Leather jacket manufacturer in Karachi, since 2001
${siteConfig.contact.email}`;

  const html = `
    <p>Hi ${escapeHtml(inquiry.name)},</p>
    <p>Thank you for contacting ORBIS. We have received your inquiry and our team will reply within 1 business day.</p>
    <p>If your question is urgent, message us on WhatsApp: ${escapeHtml(siteConfig.contact.phone)}.</p>
    <p>ORBIS<br />Leather jacket manufacturer in Karachi, since 2001<br />${escapeHtml(siteConfig.contact.email)}</p>
  `;

  await safeSend(subject, inquiry.email, html, text);
}
