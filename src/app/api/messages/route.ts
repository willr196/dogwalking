import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const messageSchema = z.object({
  name: z.string().min(2).max(80).trim(),
  email: z.string().email().max(200).trim().toLowerCase(),
  message: z.string().min(5).max(1500).trim(),
});

export async function POST(req: Request) {
  const session = await auth();

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

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

  return NextResponse.json({ ok: true }, { status: 201 });
}
