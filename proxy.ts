import { NextResponse, type NextRequest } from "next/server";
import { parseSessionCookieValue, SESSION_COOKIE_NAME } from "@/lib/auth/session-cookie";

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

// Fast signature-only check for redirect UX. Every admin Server Action /
// Server Component must independently re-validate the session against the
// database via requireAdmin() — Proxy is not a substitute for real authorization checks.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const secret = process.env.SESSION_SECRET;
  const cookieValue = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const sessionId = secret ? await parseSessionCookieValue(cookieValue, secret) : null;

  if (!sessionId) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}
