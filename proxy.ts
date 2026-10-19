import { NextResponse, type NextRequest } from "next/server";
import { parseSessionCookieValue, SESSION_COOKIE_NAME } from "@/lib/auth/session-cookie";

export const config = {
  matcher: ["/admin", "/admin/:path*", "/blog"],
};

// Fast signature-only check for redirect UX. Every admin Server Action /
// Server Component must independently re-validate the session against the
// database via requireAdmin() - Proxy is not a substitute for real authorization checks.
export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Old query-param blog category URLs (?category=x) 301 to the path-based
  // route. Done here rather than next.config.ts redirects() because that API
  // always re-merges the original query string into the destination, which
  // would leave a stray ?category= on the new URL.
  if (pathname === "/blog" && searchParams.has("category")) {
    const category = searchParams.get("category")!;
    const url = request.nextUrl.clone();
    url.pathname = `/blog/category/${category}`;
    url.searchParams.delete("category");
    return NextResponse.redirect(url, 308);
  }

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

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
