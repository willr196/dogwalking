import { NextResponse } from "next/server";

export function middleware() {
  const response = NextResponse.next();

  // Add security headers at the edge
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
