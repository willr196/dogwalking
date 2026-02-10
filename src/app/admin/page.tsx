import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { siteConfig } from "@/lib/site.config";
import { AdminTabs } from "./AdminTabs";
import type {
  Booking as PrismaBooking,
  Review as PrismaReview,
  Message as PrismaMessage,
} from "@prisma/client";

export const dynamic = "force-dynamic";

async function cancelBooking(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return;
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.booking.update({ where: { id }, data: { status: "cancelled" } });
}

async function deleteReview(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return;
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.review.delete({ where: { id } });
}

async function deleteMessage(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return;
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.message.delete({ where: { id } });
}

async function markMessageRead(formData: FormData) {
  "use server";
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return;
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.message.update({ where: { id }, data: { read: true } });
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; bp?: string; rp?: string; mp?: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/sign-in");
  }

  const params = await searchParams;
  const activeTab = params.tab || "overview";
  const bookingsPage = Math.max(1, parseInt(params.bp || "1"));
  const reviewsPage = Math.max(1, parseInt(params.rp || "1"));
  const messagesPage = Math.max(1, parseInt(params.mp || "1"));
  const PER_PAGE = 10;

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(todayStart.getTime() + 86400000);
  const weekEnd = new Date(todayStart.getTime() + 7 * 86400000);

  const [
    totalConfirmedBookings,
    upcomingCount,
    todayBookings,
    totalReviews,
    totalMessages,
    unreadMessages,
    recentBookings,
    recentMessages,
    allBookingsPage,
    allReviewsPage,
    allMessagesPage,
    scheduleBookings,
    totalBookingsForPagination,
  ] = await Promise.all([
    prisma.booking.count({ where: { status: "confirmed" } }),
    prisma.booking.count({
      where: { status: "confirmed", date: { gte: todayStart } },
    }),
    prisma.booking.findMany({
      where: { date: { gte: todayStart, lt: todayEnd }, status: "confirmed" },
      orderBy: { timeSlot: "asc" },
    }),
    prisma.review.count(),
    prisma.message.count(),
    prisma.message.count({ where: { read: false } }),
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      skip: (bookingsPage - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      skip: (reviewsPage - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      skip: (messagesPage - 1) * PER_PAGE,
      take: PER_PAGE,
    }),
    prisma.booking.findMany({
      where: { date: { gte: todayStart, lt: weekEnd }, status: "confirmed" },
      orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
    }),
    prisma.booking.count(),
  ]);

  const confirmedBookings = await prisma.booking.findMany({
    where: { status: "confirmed" },
    select: { price: true },
  });
  const revenue = confirmedBookings.reduce(
    (s, b) => s + (b.price ?? siteConfig.pricing.standardPrice),
    0
  );

  const avgRating =
    totalReviews > 0
      ? (
          (await prisma.review.aggregate({ _avg: { rating: true } }))._avg
            .rating || 0
        ).toFixed(1)
      : "—";

  const totalReviewsForPagination = totalReviews;
  const totalMessagesForPagination = totalMessages;

  const scheduleDays: {
    date: string;
    dayName: string;
    isToday: boolean;
    bookings: typeof scheduleBookings;
  }[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(todayStart.getTime() + i * 86400000);
    const iso = d.toISOString().split("T")[0];
    scheduleDays.push({
      date: iso,
      dayName: d.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      isToday: i === 0,
      bookings: scheduleBookings.filter(
        (b) => b.date.toISOString().split("T")[0] === iso
      ),
    });
  }

  return (
    <AdminTabs
      activeTab={activeTab}
      stats={{
        totalBookings: totalConfirmedBookings,
        upcomingCount,
        todayCount: todayBookings.length,
        revenue,
        totalReviews,
        avgRating: String(avgRating),
        totalMessages,
        unreadMessages,
      }}
      todayBookings={todayBookings.map(serializeBooking)}
      scheduleDays={scheduleDays.map((d) => ({
        ...d,
        bookings: d.bookings.map(serializeBooking),
      }))}
      recentBookings={recentBookings.map(serializeBooking)}
      recentMessages={recentMessages.map(serializeMessage)}
      allBookings={allBookingsPage.map(serializeBooking)}
      allReviews={allReviewsPage.map(serializeReview)}
      allMessages={allMessagesPage.map(serializeMessage)}
      pagination={{
        bookings: {
          page: bookingsPage,
          total: totalBookingsForPagination,
          perPage: PER_PAGE,
        },
        reviews: {
          page: reviewsPage,
          total: totalReviewsForPagination,
          perPage: PER_PAGE,
        },
        messages: {
          page: messagesPage,
          total: totalMessagesForPagination,
          perPage: PER_PAGE,
        },
      }}
      actions={{ cancelBooking, deleteReview, deleteMessage, markMessageRead }}
    />
  );
}

function serializeBooking(b: PrismaBooking) {
  return {
    ...b,
    date: b.date instanceof Date ? b.date.toISOString() : b.date,
    createdAt: b.createdAt instanceof Date ? b.createdAt.toISOString() : b.createdAt,
    updatedAt: b.updatedAt instanceof Date ? b.updatedAt.toISOString() : b.updatedAt,
  };
}

function serializeReview(r: PrismaReview) {
  return {
    ...r,
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
  };
}

function serializeMessage(m: PrismaMessage) {
  return {
    ...m,
    createdAt: m.createdAt instanceof Date ? m.createdAt.toISOString() : m.createdAt,
  };
}
