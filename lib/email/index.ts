import type { EmailProvider } from "@/lib/email/types";
import { createResendProvider } from "@/lib/email/resend-provider";
import { createConsoleProvider } from "@/lib/email/console-provider";

function getEmailProvider(): EmailProvider {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (apiKey && from) {
    return createResendProvider(apiKey, from);
  }
  return createConsoleProvider();
}

export type InquiryEmailData = {
  type: "QUOTE" | "CONTACT";
  name: string;
  companyName?: string | null;
  email: string;
  country?: string | null;
  productInterest?: string | null;
  quantityEstimate?: string | null;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function safeSend(subject: string, to: string, html: string, text: string): Promise<void> {
  try {
    await getEmailProvider().send({ to, subject, html, text });
  } catch (error) {
    console.error(`Failed to send email "${subject}" to ${to}:`, error);
  }
}

export async function notifyAdminOfInquiry(inquiry: InquiryEmailData): Promise<void> {
  const to = process.env.EMAIL_TO;
  if (!to) {
    console.error("EMAIL_TO is not set — skipping admin inquiry notification.");
    return;
  }

  const subject =
    inquiry.type === "QUOTE" ? "New B2B quote request received" : "New contact message received";

  const rows: Array<[string, string | null | undefined]> = [
    ["Name", inquiry.name],
    ["Company", inquiry.companyName],
    ["Email", inquiry.email],
    ["Country", inquiry.country],
    ["Product Interest", inquiry.productInterest],
    ["Estimated Quantity", inquiry.quantityEstimate],
  ];

  const textLines = rows
    .filter(([, value]) => !!value)
    .map(([label, value]) => `${label}: ${value}`);
  textLines.push("", "Message:", inquiry.message);

  const htmlRows = rows
    .filter(([, value]) => !!value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;">${escapeHtml(label)}</td><td>${escapeHtml(String(value))}</td></tr>`,
    )
    .join("");

  const html = `
    <h2>${escapeHtml(subject)}</h2>
    <table>${htmlRows}</table>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(inquiry.message).replace(/\n/g, "<br />")}</p>
  `;

  await safeSend(subject, to, html, textLines.join("\n"));
}

export async function sendInquiryConfirmation(inquiry: InquiryEmailData): Promise<void> {
  const subject = "We received your request";
  const text = `Hi ${inquiry.name},\n\nThank you for reaching out. We reply within 24 hours.\n\nYour message:\n${inquiry.message}`;
  const html = `
    <p>Hi ${escapeHtml(inquiry.name)},</p>
    <p>Thank you for reaching out. We reply within 24 hours.</p>
    <p><strong>Your message:</strong></p>
    <p>${escapeHtml(inquiry.message).replace(/\n/g, "<br />")}</p>
  `;

  await safeSend(subject, inquiry.email, html, text);
}
