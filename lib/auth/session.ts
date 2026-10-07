import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { sha256Hex } from "@/lib/auth/crypto";
import { buildSessionCookieValue, SESSION_COOKIE_NAME } from "@/lib/auth/session-cookie";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;

function requireSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not configured");
  return secret;
}

export async function createSession(adminId: string): Promise<void> {
  const sessionId = crypto.randomUUID();
  const tokenHash = await sha256Hex(sessionId);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await prisma.session.create({ data: { tokenHash, adminId, expiresAt } });

  const cookieValue = await buildSessionCookieValue(sessionId, requireSessionSecret());
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  cookieStore.delete(SESSION_COOKIE_NAME);

  if (!raw) return;
  const separatorIndex = raw.indexOf(".");
  if (separatorIndex === -1) return;

  const sessionId = raw.slice(0, separatorIndex);
  const tokenHash = await sha256Hex(sessionId);
  await prisma.session.deleteMany({ where: { tokenHash } }).catch(() => undefined);
}
