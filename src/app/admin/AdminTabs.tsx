"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

type Booking = {
  id: string;
  ownerName: string;
  email: string;
  phone: string;
  dogName: string;
  dogBreed: string | null;
  dogSize: string;
  date: string;
  timeSlot: string;
  notes: string | null;
  price: number;
  status: string;
  createdAt: string;
};

type Review = {
  id: string;
  name: string;
  dogName: string | null;
  rating: number;
  text: string;
  createdAt: string;
};

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

type ScheduleDay = {
  date: string;
  dayName: string;
  isToday: boolean;
  bookings: Booking[];
};

type PaginationInfo = {
  page: number;
  total: number;
  perPage: number;
};

type Props = {
  activeTab: string;
  stats: {
    totalBookings: number;
    upcomingCount: number;
    todayCount: number;
    revenue: number;
    totalReviews: number;
    avgRating: string;
    totalMessages: number;
    unreadMessages: number;
  };
  todayBookings: Booking[];
  scheduleDays: ScheduleDay[];
  recentBookings: Booking[];
  recentMessages: Message[];
  allBookings: Booking[];
  allReviews: Review[];
  allMessages: Message[];
  pagination: {
    bookings: PaginationInfo;
    reviews: PaginationInfo;
    messages: PaginationInfo;
  };
  actions: {
    cancelBooking: (formData: FormData) => Promise<void>;
    deleteReview: (formData: FormData) => Promise<void>;
    deleteMessage: (formData: FormData) => Promise<void>;
    markMessageRead: (formData: FormData) => Promise<void>;
  };
};

const TABS = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "schedule", label: "Schedule", icon: "📅" },
  { id: "bookings", label: "Bookings", icon: "🐕" },
  { id: "reviews", label: "Reviews", icon: "⭐" },
  { id: "messages", label: "Messages", icon: "💬" },
] as const;

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={s <= rating ? "text-amber-400" : "text-gray-200"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    cancelled: "bg-red-50 text-red-600 border border-red-200",
    completed: "bg-blue-50 text-blue-600 border border-blue-200",
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
        styles[status] || "bg-gray-100 text-gray-600 border border-gray-200"
      }`}
    >
      {status}
    </span>
  );
}

function Pagination({
  info,
  paramKey,
  tab,
}: {
  info: PaginationInfo;
  paramKey: string;
  tab: string;
}) {
  const totalPages = Math.ceil(info.total / info.perPage);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-4 border-t border-[var(--green)]/10">
      <span className="text-sm text-[var(--muted)]">
        Showing {(info.page - 1) * info.perPage + 1}–
        {Math.min(info.page * info.perPage, info.total)} of {info.total}
      </span>
      <div className="flex gap-2">
        {info.page > 1 && (
          <Link
            href={`/admin?tab=${tab}&${paramKey}=${info.page - 1}`}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-[var(--green)]/20 text-[var(--deep-green)] hover:bg-[var(--green)]/5 transition-colors"
          >
            ← Prev
          </Link>
        )}
        <span className="px-3 py-1.5 text-sm text-[var(--muted)]">
          {info.page} / {totalPages}
        </span>
        {info.page < totalPages && (
          <Link
            href={`/admin?tab=${tab}&${paramKey}=${info.page + 1}`}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-[var(--green)]/20 text-[var(--deep-green)] hover:bg-[var(--green)]/5 transition-colors"
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}

export function AdminTabs(props: Props) {
  const {
    activeTab,
    stats,
    todayBookings,
    scheduleDays,
    recentBookings,
    recentMessages,
    allBookings,
    allReviews,
    allMessages,
    pagination,
    actions,
  } = props;

  const router = useRouter();
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  const switchTab = (tab: string) => {
    router.push(`/admin?tab=${tab}`);
  };

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[var(--green)]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                title="Back to site"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="ww-serif text-lg font-bold text-[var(--text)]">
                  Will&apos;s Walks
                </h1>
                <p className="text-xs text-[var(--muted)] -mt-0.5">
                  Admin Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {stats.unreadMessages > 0 && (
                <button
                  onClick={() => switchTab("messages")}
                  className="relative p-2 rounded-lg hover:bg-[var(--green)]/5 transition-colors"
                  title={`${stats.unreadMessages} unread messages`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--muted)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[var(--orange)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {stats.unreadMessages}
                  </span>
                </button>
              )}
              <Link
                href="/booking"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[var(--green)] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                + New Booking
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex gap-1 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[var(--deep-green)] text-white shadow-md"
                  : "bg-white text-[var(--muted)] hover:bg-[var(--green)]/5 hover:text-[var(--text)] border border-transparent hover:border-[var(--green)]/10"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label}
              {tab.id === "messages" && stats.unreadMessages > 0 && (
                <span className="ml-1 w-5 h-5 bg-[var(--orange)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {stats.unreadMessages}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="anim-fade-up">
          {activeTab === "overview" && (
            <OverviewTab
              stats={stats}
              todayBookings={todayBookings}
              recentBookings={recentBookings}
              recentMessages={recentMessages}
              onSwitchTab={switchTab}
            />
          )}
          {activeTab === "schedule" && <ScheduleTab scheduleDays={scheduleDays} />}
          {activeTab === "bookings" && (
            <BookingsTab
              bookings={allBookings}
              pagination={pagination.bookings}
              cancelBooking={actions.cancelBooking}
              expandedBooking={expandedBooking}
              setExpandedBooking={setExpandedBooking}
            />
          )}
          {activeTab === "reviews" && (
            <ReviewsTab
              reviews={allReviews}
              pagination={pagination.reviews}
              deleteReview={actions.deleteReview}
            />
          )}
          {activeTab === "messages" && (
            <MessagesTab
              messages={allMessages}
              pagination={pagination.messages}
              deleteMessage={actions.deleteMessage}
              markMessageRead={actions.markMessageRead}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function OverviewTab({
  stats,
  todayBookings,
  recentBookings,
  recentMessages,
  onSwitchTab,
}: {
  stats: Props["stats"];
  todayBookings: Booking[];
  recentBookings: Booking[];
  recentMessages: Message[];
  onSwitchTab: (tab: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "Total Bookings",
            value: stats.totalBookings,
            sub: `${stats.upcomingCount} upcoming`,
            color: "var(--green)",
            bg: "bg-emerald-50",
          },
          {
            label: "Today's Walks",
            value: stats.todayCount,
            sub:
              todayBookings.length > 0
                ? `Next: ${todayBookings[0].timeSlot}`
                : "No walks today",
            color: "var(--orange)",
            bg: "bg-orange-50",
          },
          {
            label: "Reviews",
            value: stats.totalReviews,
            sub: `Avg: ${stats.avgRating} ★`,
            color: "var(--deep-green)",
            bg: "bg-emerald-50/60",
          },
          {
            label: "Revenue",
            value: `£${stats.revenue}`,
            sub: `${stats.totalBookings} confirmed`,
            color: "var(--brown)",
            bg: "bg-amber-50",
          },
        ].map((s, i) => (
          <div
            key={i}
            className={`${s.bg} rounded-2xl p-5 border border-black/[0.03]`}
          >
            <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-1">
              {s.label}
            </p>
            <p
              className="ww-serif text-2xl sm:text-3xl font-bold"
              style={{ color: s.color }}
            >
              {s.value}
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[var(--green)]/10 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--green)]/10">
          <h2 className="ww-serif text-lg font-semibold">Today&apos;s Schedule</h2>
          <button
            onClick={() => onSwitchTab("schedule")}
            className="text-sm text-[var(--green)] font-medium hover:underline"
          >
            View full week →
          </button>
        </div>
        <div className="p-5">
          {todayBookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-3">☀️</p>
              <p className="text-[var(--muted)]">No walks scheduled for today</p>
              <Link
                href="/booking"
                className="inline-block mt-3 text-sm text-[var(--green)] font-medium hover:underline"
              >
                Book a walk →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {todayBookings.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-[var(--cream)]/60 border border-[var(--green)]/5"
                >
                  <div className="flex-shrink-0 w-16 text-center">
                    <p className="text-sm font-semibold text-[var(--deep-green)]">
                      {b.timeSlot}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--text)] truncate">
                      {b.dogName}{" "}
                      <span className="text-[var(--muted)] font-normal text-sm">
                        ({b.dogBreed || b.dogSize})
                      </span>
                    </p>
                    <p className="text-sm text-[var(--muted)] truncate">
                      {b.ownerName} · {b.phone}
                    </p>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-[var(--green)]/10 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--green)]/10">
            <h3 className="font-semibold text-sm">Recent Bookings</h3>
            <button
              onClick={() => onSwitchTab("bookings")}
              className="text-xs text-[var(--green)] font-medium hover:underline"
            >
              View all →
            </button>
          </div>
          <div className="divide-y divide-[var(--green)]/5">
            {recentBookings.slice(0, 4).map((b) => (
              <div
                key={b.id}
                className="px-5 py-3 flex items-center justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {b.dogName} · {formatDate(b.date)}
                  </p>
                  <p className="text-xs text-[var(--muted)]">{b.ownerName}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusBadge status={b.status} />
                  <span className="text-xs text-[var(--light)]">
                    {timeAgo(b.createdAt)}
                  </span>
                </div>
              </div>
            ))}
            {recentBookings.length === 0 && (
              <p className="px-5 py-6 text-sm text-[var(--muted)] text-center">
                No bookings yet
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--green)]/10 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--green)]/10">
            <h3 className="font-semibold text-sm">
              Recent Messages
              {stats.unreadMessages > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-[var(--orange)] text-white text-[10px] font-bold rounded-full">
                  {stats.unreadMessages}
                </span>
              )}
            </h3>
            <button
              onClick={() => onSwitchTab("messages")}
              className="text-xs text-[var(--green)] font-medium hover:underline"
            >
              View all →
            </button>
          </div>
          <div className="divide-y divide-[var(--green)]/5">
            {recentMessages.slice(0, 4).map((m) => (
              <div
                key={m.id}
                className={`px-5 py-3 ${!m.read ? "bg-[var(--green)]/[0.03]" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium truncate">
                    {!m.read && (
                      <span className="inline-block w-2 h-2 bg-[var(--green)] rounded-full mr-2" />
                    )}
                    {m.name}
                  </p>
                  <span className="text-xs text-[var(--light)] flex-shrink-0">
                    {timeAgo(m.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)] line-clamp-2">
                  {m.message}
                </p>
              </div>
            ))}
            {recentMessages.length === 0 && (
              <p className="px-5 py-6 text-sm text-[var(--muted)] text-center">
                No messages yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScheduleTab({ scheduleDays }: { scheduleDays: ScheduleDay[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="ww-serif text-xl font-semibold">This Week</h2>
        <p className="text-sm text-[var(--muted)]">
          {scheduleDays.reduce((t, d) => t + d.bookings.length, 0)} walks scheduled
        </p>
      </div>

      <div className="grid gap-3">
        {scheduleDays.map((day) => (
          <div
            key={day.date}
            className={`bg-white rounded-2xl border overflow-hidden transition-all ${
              day.isToday ? "border-[var(--green)]/30 shadow-sm" : "border-[var(--green)]/10"
            }`}
          >
            <div
              className={`px-5 py-3 flex items-center justify-between ${
                day.isToday
                  ? "bg-[var(--green)]/5 border-b border-[var(--green)]/10"
                  : "border-b border-[var(--green)]/5"
              }`}
            >
              <div className="flex items-center gap-2">
                {day.isToday && (
                  <span className="w-2 h-2 bg-[var(--green)] rounded-full animate-pulse" />
                )}
                <h3 className="font-semibold text-sm">
                  {day.dayName}
                  {day.isToday && (
                    <span className="ml-2 text-xs text-[var(--green)] font-normal">
                      Today
                    </span>
                  )}
                </h3>
              </div>
              <span className="text-xs text-[var(--muted)] tabular-nums">
                {day.bookings.length} walk{day.bookings.length !== 1 ? "s" : ""}
              </span>
            </div>

            {day.bookings.length === 0 ? (
              <div className="px-5 py-4 text-sm text-[var(--light)] italic">
                No walks scheduled
              </div>
            ) : (
              <div className="divide-y divide-[var(--green)]/5">
                {day.bookings.map((b) => (
                  <div key={b.id} className="px-5 py-3 flex items-center gap-4">
                    <div className="flex-shrink-0 w-20">
                      <span className="text-sm font-semibold text-[var(--deep-green)] tabular-nums">
                        {b.timeSlot}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        🐕 {b.dogName}
                        <span className="text-[var(--muted)] font-normal ml-1">
                          ({b.dogBreed || b.dogSize})
                        </span>
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {b.ownerName} · {b.phone}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-sm font-semibold text-[var(--deep-green)]">
                        £{b.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingsTab({
  bookings,
  pagination: pag,
  cancelBooking,
  expandedBooking,
  setExpandedBooking,
}: {
  bookings: Booking[];
  pagination: PaginationInfo;
  cancelBooking: (fd: FormData) => Promise<void>;
  expandedBooking: string | null;
  setExpandedBooking: (id: string | null) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="ww-serif text-xl font-semibold">All Bookings</h2>
        <Link
          href="/booking"
          className="flex items-center gap-2 px-4 py-2 bg-[var(--green)] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          + New Booking
        </Link>
      </div>

      {bookings.length === 0 ? (
        <EmptyState emoji="🐕" text="No bookings yet" />
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => {
            const isExpanded = expandedBooking === b.id;
            return (
              <div
                key={b.id}
                className={`bg-white rounded-2xl border border-[var(--green)]/10 overflow-hidden transition-all ${
                  b.status === "cancelled" ? "opacity-50" : ""
                }`}
              >
                <button
                  onClick={() => setExpandedBooking(isExpanded ? null : b.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[var(--cream)]/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--green)]/10 flex items-center justify-center text-lg">
                      🐕
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">
                        {b.dogName}
                        <span className="text-[var(--muted)] font-normal ml-1">
                          ({b.dogBreed || b.dogSize})
                        </span>
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {formatDate(b.date)} · {b.timeSlot} · £{b.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge status={b.status} />
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--light)"
                      strokeWidth="2"
                      className={`transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-[var(--green)]/5 pt-4 anim-fade-in">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-[var(--muted)] uppercase tracking-wide mb-1">
                          Owner
                        </p>
                        <p className="font-medium">{b.ownerName}</p>
                        <p className="text-[var(--muted)]">{b.email}</p>
                        <p className="text-[var(--muted)]">{b.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--muted)] uppercase tracking-wide mb-1">
                          Dog Details
                        </p>
                        <p className="font-medium">{b.dogName}</p>
                        <p className="text-[var(--muted)]">
                          {b.dogBreed || "Breed not specified"} · {b.dogSize}
                        </p>
                      </div>
                      {b.notes && (
                        <div className="sm:col-span-2">
                          <p className="text-xs text-[var(--muted)] uppercase tracking-wide mb-1">
                            Notes
                          </p>
                          <p className="text-[var(--muted)] italic">
                            &ldquo;{b.notes}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>

                    {b.status === "confirmed" && (
                      <div className="mt-4 pt-3 border-t border-[var(--green)]/5 flex gap-2">
                        <form action={cancelBooking}>
                          <input type="hidden" name="id" value={b.id} />
                          <button
                            type="submit"
                            className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                            onClick={(e) => {
                              if (!confirm("Cancel this booking?"))
                                e.preventDefault();
                            }}
                          >
                            Cancel Booking
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <Pagination info={pag} paramKey="bp" tab="bookings" />
        </div>
      )}
    </div>
  );
}

function ReviewsTab({
  reviews,
  pagination: pag,
  deleteReview,
}: {
  reviews: Review[];
  pagination: PaginationInfo;
  deleteReview: (fd: FormData) => Promise<void>;
}) {
  return (
    <div className="space-y-4">
      <h2 className="ww-serif text-xl font-semibold">Reviews</h2>

      {reviews.length === 0 ? (
        <EmptyState emoji="⭐" text="No reviews yet" />
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-[var(--green)]/10 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Stars rating={r.rating} />
                    <span className="text-xs text-[var(--light)]">
                      {timeAgo(r.createdAt)}
                    </span>
                  </div>
                  <p className="font-medium text-sm">
                    {r.name}
                    {r.dogName && (
                      <span className="text-[var(--muted)] font-normal">
                        {" "}
                        &amp; {r.dogName}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">
                    {r.text}
                  </p>
                </div>
                <form action={deleteReview}>
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    className="flex-shrink-0 p-1.5 text-[var(--light)] hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                    title="Delete review"
                    onClick={(e) => {
                      if (!confirm("Delete this review?")) e.preventDefault();
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          ))}

          <Pagination info={pag} paramKey="rp" tab="reviews" />
        </div>
      )}
    </div>
  );
}

function MessagesTab({
  messages,
  pagination: pag,
  deleteMessage,
  markMessageRead,
}: {
  messages: Message[];
  pagination: PaginationInfo;
  deleteMessage: (fd: FormData) => Promise<void>;
  markMessageRead: (fd: FormData) => Promise<void>;
}) {
  return (
    <div className="space-y-4">
      <h2 className="ww-serif text-xl font-semibold">Messages</h2>

      {messages.length === 0 ? (
        <EmptyState emoji="💬" text="No messages yet" />
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                !m.read ? "border-[var(--green)]/20 shadow-sm" : "border-[var(--green)]/10"
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {!m.read && (
                      <span className="flex-shrink-0 w-2.5 h-2.5 bg-[var(--green)] rounded-full" />
                    )}
                    <p className="font-medium text-sm truncate">{m.name}</p>
                    <span className="text-xs text-[var(--light)] flex-shrink-0">
                      {timeAgo(m.createdAt)}
                    </span>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    {!m.read && (
                      <form action={markMessageRead}>
                        <input type="hidden" name="id" value={m.id} />
                        <button
                          type="submit"
                          className="p-1.5 text-[var(--light)] hover:text-[var(--green)] transition-colors rounded-lg hover:bg-[var(--green)]/5"
                          title="Mark as read"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </button>
                      </form>
                    )}
                    <form action={deleteMessage}>
                      <input type="hidden" name="id" value={m.id} />
                      <button
                        type="submit"
                        className="p-1.5 text-[var(--light)] hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        title="Delete message"
                        onClick={(e) => {
                          if (!confirm("Delete this message?"))
                            e.preventDefault();
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
                <p className="text-xs text-[var(--muted)] mb-2">{m.email}</p>
                <p className="text-sm text-[var(--text)] leading-relaxed whitespace-pre-wrap">
                  {m.message}
                </p>
              </div>
            </div>
          ))}

          <Pagination info={pag} paramKey="mp" tab="messages" />
        </div>
      )}
    </div>
  );
}

function EmptyState({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--green)]/10 py-16 text-center">
      <p className="text-4xl mb-3">{emoji}</p>
      <p className="text-[var(--muted)]">{text}</p>
    </div>
  );
}
