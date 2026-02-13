import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const reviewSchema = z.object({
  name: z.string().min(2).max(80).trim(),
  dogName: z.string().max(80).optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(5).max(1000).trim(),
});

export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json(reviews, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    },
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

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

  return NextResponse.json({ ok: true, review }, { status: 201 });
}
