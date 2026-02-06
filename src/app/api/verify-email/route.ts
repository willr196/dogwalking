import { NextResponse } from "next/server";
import { verifyEmailToken } from "@/lib/email-verification";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/sign-in?error=missing-token", req.url)
    );
  }

  const result = await verifyEmailToken(token);

  if (!result.ok) {
    return NextResponse.redirect(
      new URL(`/sign-in?error=${encodeURIComponent(result.error)}`, req.url)
    );
  }

  // Redirect to sign-in with a success message
  return NextResponse.redirect(
    new URL("/sign-in?verified=true", req.url)
  );
}
