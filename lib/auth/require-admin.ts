import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { sha256Hex } from "@/lib/auth/crypto";
import { parseSessionCookieValue, SESSION_COOKIE_NAME } from "@/lib/auth/session-cookie";

export type CurrentAdmin = {
  id: string;
  email: string;
  name: string;
  role: string;
};

/**
 * Authoritative, DB-backed session check. Distinct from middleware.ts, which
 * only verifies the cookie signature (fast, Edge-compatible, no DB access) to
 * redirect anonymous visitors early — every Server Action and protected page
 * must still call this before reading/mutating admin data.
 */
export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return null;

  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const sessionId = await parseSessionCookieValue(raw, secret);
  if (!sessionId) return null;

  const tokenHash = await sha256Hex(sessionId);
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { admin: true },
  });

  if (!session || session.expiresAt.getTime() < Date.now()) return null;

  return {
    id: session.admin.id,
    email: session.admin.email,
    name: session.admin.name,
    role: session.admin.role,
  };
}

export async function requireAdmin(): Promise<CurrentAdmin> {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
