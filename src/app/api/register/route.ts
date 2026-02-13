import { NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcryptjs";
import { UserRole, WalkerApprovalStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  createVerificationToken,
  sendVerificationEmail,
} from "@/lib/email-verification";

const schema = z.object({
  name: z.string().min(2).max(80).trim(),
  email: z.string().email().max(200).trim().toLowerCase(),
  password: z.string().min(8).max(100),
  accountType: z.enum(["owner", "walker"]).optional().default("owner"),
});

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const passwordHash = await hash(parsed.data.password, 12);
  const createdUser = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role: parsed.data.accountType === "walker" ? UserRole.WALKER : UserRole.USER,
      walkerApprovalStatus:
        parsed.data.accountType === "walker"
          ? WalkerApprovalStatus.PENDING
          : WalkerApprovalStatus.NOT_APPLICABLE,
    },
  });

  try {
    const verificationToken = await createVerificationToken(createdUser.email);
    await sendVerificationEmail(createdUser.email, verificationToken);
  } catch (error) {
    console.error("Failed to create/send verification token", error);
    await prisma.user.delete({ where: { id: createdUser.id } }).catch(() => {
      // best-effort rollback
    });
    return NextResponse.json(
      { error: "Could not create account. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { ok: true, requiresEmailVerification: true },
    { status: 201 }
  );
}
