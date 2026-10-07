import type { EmailMessage, EmailProvider } from "@/lib/email/types";

export function createResendProvider(apiKey: string, from: string): EmailProvider {
  return {
    async send(message: EmailMessage) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: message.to,
          subject: message.subject,
          html: message.html,
          text: message.text,
        }),
      });

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(`Resend request failed (${response.status}): ${body}`);
      }
    },
  };
}
