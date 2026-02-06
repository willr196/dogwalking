import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware: protects /admin routes by checking for a valid session cookie.
 *
 * NOTE: Full role-based checks still happen inside the admin page component
 * (server-side). This middleware acts as a first line of defence so that
 * unauthenticated users are redirected immediately — before any server
 * rendering takes place.
 */
export function middleware(request: NextRequest) {
  // NextAuth stores the session token in this cookie (name depends on
  // whether the app runs over HTTPS or not).
  const sessionToken =
    request.cookies.get("__Secure-next-auth.session-token")?.value ??
    request.cookies.get("next-auth.session-token")?.value;

  if (!sessionToken) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};