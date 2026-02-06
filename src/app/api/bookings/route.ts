import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { WALK_PRICE } from "@/components/willswalks/constants";
import { createRateLimiter, getIP } from "@/lib/rate-limit";
import { Prisma } from "@prisma/client";

// Rate limit: 20 booking attempts per minute per IP
const limiter = createRateLimiter({ windowMs: 60_000, max: 20 });

const bookingSchema = z.object({
  ownerName: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  dogName: z.string().min(1).max(80),
  dogBreed: z.string().max(80).optional().or(z.literal("")),
  dogSize: z.string().min(1).max(20),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().min(1).max(20),
  notes: z.string().max(500).optional().or(z.literal("")),
});

export async function GET() {
  // ✅ FIX: Only return the minimal data needed for the booking form to
  // show which slots are taken — no status, no other booking details.
  const today = new Date();
  const bookings = await prisma.booking.findMany({
    where: {
      date: { gte: new Date(today.toDateString()) },
      status: "confirmed",
    },
    select: { date: true, timeSlot: true },
  });
  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  // ✅ FIX: Rate limiting
  const ip = getIP(req);
  if (!limiter.check(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

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

  // ✅ FIX: Use explicit UTC midnight to avoid timezone-dependent parsing.
  // The original `new Date(`${date}T00:00:00`)` parses in the server's
  // local timezone, which causes off-by-one date bugs when deployed to
  // cloud providers running in UTC.
  const date = new Date(`${data.date}T00:00:00.000Z`);

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
        // ✅ FIX: Use the shared constant instead of a hardcoded value.
        price: WALK_PRICE,
        status: "confirmed",
        userId: session.user.id,
      },
    });
    return NextResponse.json({ ok: true, booking });
  } catch (err) {
    // ✅ FIX: Discriminate between unique constraint violations (= slot
    // already booked) and unexpected errors (= something else went wrong).
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Slot already booked" },
        { status: 409 }
      );
    }

    console.error("[bookings] Unexpected error creating booking:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}