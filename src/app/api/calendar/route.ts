import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

/**
 * Parse a 12‑hour time slot string (e.g. "8:00 AM") into 24‑hour hours and minutes.
 */
function parseTimeSlot(slot: string): { hours: number; minutes: number } {
  // slot is like "8:00 AM" or "12:30 PM". Split into time and meridian.
  const [timePart, meridian] = slot.split(" ");
  const [hoursStr, minutesStr] = timePart.split(":");
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (meridian === "PM" && hours < 12) {
    hours += 12;
  }
  if (meridian === "AM" && hours === 12) {
    hours = 0;
  }
  return { hours, minutes };
}

/**
 * Format a Date object into an iCalendar date/time string (UTC) like
 * `YYYYMMDDThhmmssZ`.
 */
function formatICSDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    "Z"
  );
}

export async function GET() {
  // Restrict access: only authenticated users may fetch the calendar.
  const session = await auth();
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const allowedEmail = process.env.BOOKING_NOTIFICATION_EMAIL || "willrobb11@gmail.com";
  // Only allow the site owner (notification email) to access the feed.
  if (session.user.email !== allowedEmail) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Fetch all future confirmed bookings (meet & greets).
  const today = new Date();
  const bookings = await prisma.booking.findMany({
    where: {
      date: { gte: new Date(today.toDateString()) },
      status: "confirmed",
    },
    orderBy: { date: "asc" },
  });

  // Build events.
  const events = bookings
    .map((b) => {
      // b.date is a Date object at UTC midnight (as stored). Combine with time slot to get start time.
      const { hours, minutes } = parseTimeSlot(b.timeSlot);
      const start = new Date(Date.UTC(b.date.getUTCFullYear(), b.date.getUTCMonth(), b.date.getUTCDate(), hours, minutes));
      // Meet & greet duration: 20 minutes
      const end = new Date(start.getTime() + 20 * 60 * 1000);
      return [
        "BEGIN:VEVENT",
        `UID:booking-${b.id}@willswalks`,
        `DTSTAMP:${formatICSDate(new Date())}`,
        `DTSTART:${formatICSDate(start)}`,
        `DTEND:${formatICSDate(end)}`,
        `SUMMARY:Meet & Greet - ${b.dogName}`,
        `DESCRIPTION:Meet & greet for ${b.dogName} (Size: ${b.dogSize}) with ${b.ownerName}`,
        "END:VEVENT",
      ].join("\n");
    })
    .join("\n");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WillsWalks//Booking Calendar//EN",
    events,
    "END:VCALENDAR",
  ].join("\n");

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "attachment; filename=bookings.ics",
    },
  });
}
