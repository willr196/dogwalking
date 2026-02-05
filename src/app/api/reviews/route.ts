import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const reviewSchema = z.object({
  name: z.string().min(2).max(80),
  dogName: z.string().max(80).optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(5).max(1000),
});

export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: {
      name: parsed.data.name,
      dogName: parsed.data.dogName || null,
      rating: parsed.data.rating,
      text: parsed.data.text,
      userId: session.user.id,
    },
  });

  return NextResponse.json({ ok: true, review });
}
