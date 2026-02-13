import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const bookingSchema = z.object({
  ownerName: z.string().min(2).max(80).trim(),
  email: z.string().email().max(200).trim().toLowerCase(),
  phone: z.string().min(6).max(30).trim(),
  dogName: z.string().min(1).max(80).trim(),
  dogBreed: z.string().max(80).optional().or(z.literal("")),
  dogSize: z.string().min(1).max(20),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().min(1).max(20),
  notes: z.string().max(500).optional().or(z.literal("")),
});

export async function GET() {
  const today = new Date();
  const bookings = await prisma.booking.findMany({
    where: { date: { gte: new Date(today.toDateString()) } },
    select: { date: true, timeSlot: true, status: true },
  });

  return NextResponse.json(bookings, {
    headers: {
      "Cache-Control": "private, no-cache, max-age=0",
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

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const date = new Date(`${data.date}T00:00:00`);

  // Validate date is in the future
  if (date <= new Date()) {
    return NextResponse.json({ error: "Date must be in the future" }, { status: 400 });
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        ownerName: data.ownerName,
        email: data.email,
        phone: data.phone,
        dogName: data.dogName,
        dogBreed: data.dogBreed || null,
        dogSize: data.dogSize,
        date,
        timeSlot: data.timeSlot,
        notes: data.notes || null,
        price: 18,
        status: "confirmed",
        userId: session.user.id,
      },
    });
    return NextResponse.json({ ok: true, booking }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Slot already booked" }, { status: 409 });
  }
}
