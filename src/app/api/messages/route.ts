import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { createRateLimiter, getIP } from "@/lib/rate-limit";

// ✅ FIX: Rate limit — 5 messages per 15 minutes per IP.
const limiter = createRateLimiter({ windowMs: 15 * 60_000, max: 5 });

const messageSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(5).max(1500),
});

export async function POST(req: Request) {
  // ✅ FIX: Rate limiting
  const ip = getIP(req);
  if (!limiter.check(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 }
    );
  }

  const session = await auth();
  const body = await req.json().catch(() => null);
  const parsed = messageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  await prisma.message.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      userId: session?.user?.id,
    },
  });

  return NextResponse.json({ ok: true });
}