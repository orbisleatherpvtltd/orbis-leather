import type { EmailMessage, EmailProvider } from "@/lib/email/types";

export function createConsoleProvider(): EmailProvider {
  return {
    async send(message: EmailMessage) {
      console.log("[EMAIL:console-provider] RESEND_API_KEY is not set — logging instead of sending.");
      console.log(`[EMAIL:console-provider] to=${message.to} subject="${message.subject}"`);
      console.log(message.text);
    },
  };
}
