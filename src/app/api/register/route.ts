import { NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createRateLimiter, getIP } from "@/lib/rate-limit";
import { createVerificationToken, sendVerificationEmail } from "@/lib/email-verification";

// Rate limit: 5 registration attempts per 15 minutes per IP
const limiter = createRateLimiter({ windowMs: 15 * 60_000, max: 5 });

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export async function POST(req: Request) {
  const ip = getIP(req);
  if (!limiter.check(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 409 }
    );
  }

  const passwordHash = await hash(parsed.data.password, 10);
  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      // emailVerified stays null until they click the verification link
    },
  });

  // ✅ Send verification email
  const token = await createVerificationToken(parsed.data.email);
  await sendVerificationEmail(parsed.data.email, token);

  return NextResponse.json({
    ok: true,
    requiresVerification: true,
    message: "Account created! Please check your email to verify your account.",
  });
}