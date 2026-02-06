import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { Icons } from "@/components/willswalks/Icons";
import { Empty } from "@/components/willswalks/Empty";
import { formatDate } from "@/components/willswalks/utils";

const PAGE_SIZE = 10;

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

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ bp?: string; rp?: string; mp?: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/sign-in");
  }

  const params = await searchParams;
  const bookingPage = Math.max(1, parseInt(params.bp || "1", 10) || 1);
  const reviewPage = Math.max(1, parseInt(params.rp || "1", 10) || 1);
  const messagePage = Math.max(1, parseInt(params.mp || "1", 10) || 1);

  // Fetch totals for stats and pagination
  const [totalBookings, totalReviews, totalMessages] = await Promise.all([
    prisma.booking.count(),
    prisma.review.count(),
    prisma.message.count(),
  ]);

  // Fetch paginated data
  const [bookings, reviews, messages] = await Promise.all([
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      skip: (bookingPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      skip: (reviewPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      skip: (messagePage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ]);

  // Stats queries (lightweight — just aggregates)
  const upcomingCount = await prisma.booking.count({
    where: { status: "confirmed", date: { gte: new Date() } },
  });
  const revenueResult = await prisma.booking.aggregate({
    where: { status: "confirmed" },
    _sum: { price: true },
  });
  const revenue = revenueResult._sum.price ?? 0;

  const totalBookingPages = Math.ceil(totalBookings / PAGE_SIZE);
  const totalReviewPages = Math.ceil(totalReviews / PAGE_SIZE);
  const totalMessagePages = Math.ceil(totalMessages / PAGE_SIZE);

  const buildUrl = (overrides: Record<string, number>) => {
    const p = { bp: bookingPage, rp: reviewPage, mp: messagePage, ...overrides };
    const qs = Object.entries(p)
      .filter(([, v]) => v > 1)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");
    return `/admin${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="min-h-screen px-5 pt-[100px] pb-[60px] bg-ww-cream">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-ww-muted mb-2 font-sans text-sm no-underline hover:text-ww-deep-green transition-colors"
            >
              <Icons.ArrowLeft size={16} /> Home
            </Link>
            <h1 className="ww-serif text-[clamp(1.6rem,4vw,2.2rem)]">Dashboard</h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3 mb-7">
          {[
            { label: "Total Bookings", value: totalBookings, color: "text-ww-green" },
            { label: "Upcoming", value: upcomingCount, color: "text-ww-orange" },
            { label: "Reviews", value: totalReviews, color: "text-ww-deep-green" },
            { label: "Revenue", value: `£${revenue}`, color: "text-ww-brown" },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-ww-warm-white rounded-[18px] p-5 shadow-ww text-center"
            >
              <div className={`ww-serif text-[1.8rem] font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[13px] text-ww-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {/* ── BOOKINGS ── */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="ww-serif text-[1.4rem]">Bookings</h2>
              <span className="text-xs text-ww-muted">
                Page {bookingPage} of {totalBookingPages || 1}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {bookings.length === 0 ? (
                <Empty text="No bookings yet" />
              ) : (
                bookings.map((b) => (
                  <div
                    key={b.id}
                    className={`bg-ww-warm-white rounded-2xl p-5 shadow-ww ${b.status === "cancelled" ? "opacity-50" : ""}`}
                  >
                    <div className="flex justify-between items-start gap-3 flex-wrap">
                      <div>
                        <div className="font-semibold mb-1">
                          {b.dogName}{" "}
                          <span className="font-normal text-ww-muted">({b.dogBreed || b.dogSize})</span>
                        </div>
                        <div className="text-sm text-ww-muted">
                          {b.ownerName} · {b.email} · {b.phone}
                        </div>
                        <div className="text-sm text-ww-deep-green font-medium mt-1.5">
                          {formatDate(b.date.toISOString().split("T")[0])} at {b.timeSlot} · £
                          {b.price || 18}
                        </div>
                        {b.notes && (
                          <div className="text-[13px] text-ww-muted mt-1.5 italic">"{b.notes}"</div>
                        )}
                      </div>
                      <div className="flex gap-2 items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            b.status === "confirmed"
                              ? "bg-ww-green/10 text-ww-deep-green"
                              : "bg-ww-danger/10 text-ww-danger"
                          }`}
                        >
                          {b.status}
                        </span>
                        {b.status === "confirmed" && (
                          <form action={cancelBooking}>
                            <input type="hidden" name="id" value={b.id} />
                            <button
                              title="Cancel booking"
                              className="bg-transparent border-none cursor-pointer p-1 opacity-50 hover:opacity-100 transition-opacity"
                            >
                              <Icons.X size={16} />
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Pagination
              current={bookingPage}
              total={totalBookingPages}
              prevHref={bookingPage > 1 ? buildUrl({ bp: bookingPage - 1 }) : undefined}
              nextHref={bookingPage < totalBookingPages ? buildUrl({ bp: bookingPage + 1 }) : undefined}
            />
          </section>

          {/* ── REVIEWS ── */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="ww-serif text-[1.4rem]">Reviews</h2>
              <span className="text-xs text-ww-muted">
                Page {reviewPage} of {totalReviewPages || 1}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {reviews.length === 0 ? (
                <Empty text="No reviews yet" />
              ) : (
                reviews.map((r) => (
                  <div key={r.id} className="bg-ww-warm-white rounded-2xl p-5 shadow-ww">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold mb-1">
                          {r.name}{" "}
                          {r.dogName && (
                            <span className="font-normal text-ww-muted">· {r.dogName}</span>
                          )}
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Icons.Star key={s} filled={s <= r.rating} size={14} />
                          ))}
                        </div>
                        <p className="text-ww-muted text-sm leading-relaxed">{r.text}</p>
                        <p className="text-ww-light text-xs mt-2">
                          {new Date(r.createdAt).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                      <form action={deleteReview}>
                        <input type="hidden" name="id" value={r.id} />
                        <button
                          title="Delete review"
                          className="bg-transparent border-none cursor-pointer p-1 opacity-40 hover:opacity-100 transition-opacity"
                        >
                          <Icons.Trash size={16} />
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Pagination
              current={reviewPage}
              total={totalReviewPages}
              prevHref={reviewPage > 1 ? buildUrl({ rp: reviewPage - 1 }) : undefined}
              nextHref={reviewPage < totalReviewPages ? buildUrl({ rp: reviewPage + 1 }) : undefined}
            />
          </section>

          {/* ── MESSAGES ── */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="ww-serif text-[1.4rem]">Messages</h2>
              <span className="text-xs text-ww-muted">
                Page {messagePage} of {totalMessagePages || 1}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {messages.length === 0 ? (
                <Empty text="No messages yet" />
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="bg-ww-warm-white rounded-2xl p-5 shadow-ww">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold mb-0.5">{m.name}</div>
                        <div className="text-[13px] text-ww-muted mb-2">{m.email}</div>
                        <p className="text-ww-muted text-sm leading-relaxed">{m.message}</p>
                        <p className="text-ww-light text-xs mt-2">
                          {new Date(m.createdAt).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                      <form action={deleteMessage}>
                        <input type="hidden" name="id" value={m.id} />
                        <button
                          title="Delete message"
                          className="bg-transparent border-none cursor-pointer p-1 opacity-40 hover:opacity-100 transition-opacity"
                        >
                          <Icons.Trash size={16} />
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Pagination
              current={messagePage}
              total={totalMessagePages}
              prevHref={messagePage > 1 ? buildUrl({ mp: messagePage - 1 }) : undefined}
              nextHref={messagePage < totalMessagePages ? buildUrl({ mp: messagePage + 1 }) : undefined}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

/* ── Pagination Component ── */
function Pagination({
  current,
  total,
  prevHref,
  nextHref,
}: {
  current: number;
  total: number;
  prevHref?: string;
  nextHref?: string;
}) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      {prevHref ? (
        <Link
          href={prevHref}
          className="px-4 py-2 rounded-full text-sm font-semibold bg-ww-green/10 text-ww-deep-green no-underline hover:bg-ww-green/20 transition-colors"
        >
          ← Prev
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-full text-sm font-semibold text-ww-light">← Prev</span>
      )}
      <span className="text-sm text-ww-muted">
        {current} / {total}
      </span>
      {nextHref ? (
        <Link
          href={nextHref}
          className="px-4 py-2 rounded-full text-sm font-semibold bg-ww-green/10 text-ww-deep-green no-underline hover:bg-ww-green/20 transition-colors"
        >
          Next →
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-full text-sm font-semibold text-ww-light">Next →</span>
      )}
    </div>
  );
}