import { WalkerApprovalStatus } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  cancelBookingAction,
  deleteMessageAction,
  deleteReviewAction,
  updateWalkerApprovalStatusAction,
} from "./actions";
import { AdminHeader } from "./components/AdminHeader";
import { AdminStatsGrid } from "./components/AdminStatsGrid";
import { BookingsSection } from "./components/BookingsSection";
import { MessagesSection } from "./components/MessagesSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { WalkerApplicationsSection } from "./components/WalkerApplicationsSection";
import { buildWalkerFilterItems, parseWalkerStatusFilter } from "./lib";
import {
  adminBookingSelect,
  adminMessageSelect,
  adminReviewSelect,
  adminWalkerSelect,
  type AdminStat,
} from "./types";
import { redirect } from "next/navigation";

// Admin is always dynamic (auth-gated)
export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ walkerStatus?: string | string[] }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/sign-in");
  }

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const walkerStatusFilter = parseWalkerStatusFilter(
    resolvedSearchParams.walkerStatus
  );

  const [bookings, reviews, messages, walkers] = await Promise.all([
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: adminBookingSelect,
    }),
    prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: adminReviewSelect,
    }),
    prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: adminMessageSelect,
    }),
    prisma.user.findMany({
      where: { role: "WALKER" },
      orderBy: { createdAt: "desc" },
      select: adminWalkerSelect,
    }),
  ]);

  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "confirmed" && booking.date >= new Date()
  );
  const revenue = bookings
    .filter((booking) => booking.status === "confirmed")
    .reduce((sum, booking) => sum + (booking.price || 18), 0);

  const pendingWalkers = walkers.filter(
    (walker) => walker.walkerApprovalStatus === WalkerApprovalStatus.PENDING
  );
  const approvedWalkers = walkers.filter(
    (walker) => walker.walkerApprovalStatus === WalkerApprovalStatus.APPROVED
  );
  const rejectedWalkers = walkers.filter(
    (walker) => walker.walkerApprovalStatus === WalkerApprovalStatus.REJECTED
  );

  const filteredWalkers = walkers.filter((walker) => {
    if (walkerStatusFilter === "pending") {
      return walker.walkerApprovalStatus === WalkerApprovalStatus.PENDING;
    }
    if (walkerStatusFilter === "approved") {
      return walker.walkerApprovalStatus === WalkerApprovalStatus.APPROVED;
    }
    if (walkerStatusFilter === "rejected") {
      return walker.walkerApprovalStatus === WalkerApprovalStatus.REJECTED;
    }
    return true;
  });

  const walkerFilterItems = buildWalkerFilterItems({
    all: walkers.length,
    pending: pendingWalkers.length,
    approved: approvedWalkers.length,
    rejected: rejectedWalkers.length,
  });

  const stats: AdminStat[] = [
    {
      label: "Total Bookings",
      value: bookings.length,
      color: "text-[var(--green)]",
    },
    {
      label: "Upcoming",
      value: upcomingBookings.length,
      color: "text-[var(--orange)]",
    },
    {
      label: "Pending Walkers",
      value: pendingWalkers.length,
      color: "text-[var(--brown)]",
    },
    {
      label: "Reviews",
      value: reviews.length,
      color: "text-[var(--deep-green)]",
    },
    {
      label: "Revenue",
      value: `£${revenue}`,
      color: "text-[var(--brown)]",
    },
  ];

  return (
    <div className="min-h-screen px-5 pt-[100px] pb-[60px] bg-[var(--cream)]">
      <div className="max-w-[800px] mx-auto">
        <AdminHeader />
        <AdminStatsGrid stats={stats} />

        <div className="flex flex-col gap-6">
          <WalkerApplicationsSection
            walkers={walkers}
            filteredWalkers={filteredWalkers}
            walkerStatusFilter={walkerStatusFilter}
            walkerFilterItems={walkerFilterItems}
            updateWalkerApprovalStatusAction={updateWalkerApprovalStatusAction}
          />

          <BookingsSection
            bookings={bookings}
            cancelBookingAction={cancelBookingAction}
          />

          <ReviewsSection
            reviews={reviews}
            deleteReviewAction={deleteReviewAction}
          />

          <MessagesSection
            messages={messages}
            deleteMessageAction={deleteMessageAction}
          />
        </div>
      </div>
    </div>
  );
}
