import { hmacSha256Hex, timingSafeEqualHex } from "@/lib/auth/crypto";

/**
 * Edge-compatible (no Prisma/Node APIs) helpers for the admin session cookie.
 * The cookie carries `<sessionId>.<hmacSignature>` so middleware can verify it
 * with just SESSION_SECRET (no DB round-trip). The DB only ever stores a
 * SHA-256 hash of sessionId, so a DB leak alone can't produce a valid cookie.
 */

export const SESSION_COOKIE_NAME = "obris_admin_session";

export async function buildSessionCookieValue(sessionId: string, secret: string): Promise<string> {
  const signature = await hmacSha256Hex(sessionId, secret);
  return `${sessionId}.${signature}`;
}

export async function parseSessionCookieValue(
  value: string | undefined,
  secret: string,
): Promise<string | null> {
  if (!value) return null;
  const separatorIndex = value.indexOf(".");
  if (separatorIndex === -1) return null;

  const sessionId = value.slice(0, separatorIndex);
  const signature = value.slice(separatorIndex + 1);
  if (!sessionId || !signature) return null;

  const expected = await hmacSha256Hex(sessionId, secret);
  return timingSafeEqualHex(expected, signature) ? sessionId : null;
}
