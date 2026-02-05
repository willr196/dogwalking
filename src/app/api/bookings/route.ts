import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const bookingSchema = z.object({
  ownerName: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  dogName: z.string().min(1).max(80),
  dogBreed: z.string().max(80).optional().or(z.literal("")),
  dogSize: z.string().min(1).max(20),
  date: z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/),
  timeSlot: z.string().min(1).max(20),
  notes: z.string().max(500).optional().or(z.literal("")),
});

export async function GET() {
  const today = new Date();
  const bookings = await prisma.booking.findMany({
    where: { date: { gte: new Date(today.toDateString()) } },
    select: { date: true, timeSlot: true, status: true },
  });
  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const data = parsed.data;
  const date = new Date(`${data.date}T00:00:00`);

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
    return NextResponse.json({ ok: true, booking });
  } catch (err) {
    return NextResponse.json({ error: "Slot already booked" }, { status: 409 });
  }
}
