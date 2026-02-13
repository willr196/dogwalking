import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Icons } from "@/components/willswalks/Icons";
import { Empty } from "@/components/willswalks/Empty";
import { formatDate } from "@/components/willswalks/utils";

// Admin is always dynamic (auth-gated)
export const dynamic = "force-dynamic";

async function cancelBooking(formData: FormData) {
  "use server";
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.booking.update({ where: { id }, data: { status: "cancelled" } });
}

async function deleteReview(formData: FormData) {
  "use server";
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.review.delete({ where: { id } });
}

async function deleteMessage(formData: FormData) {
  "use server";
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.message.delete({ where: { id } });
}

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/sign-in");
  }

  const [bookings, reviews, messages] = await Promise.all([
    prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.review.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
  ]);

  const upcomingBookings = bookings.filter((b) => b.status === "confirmed" && b.date >= new Date());
  const revenue = bookings.filter((b) => b.status === "confirmed").reduce((s, b) => s + (b.price || 18), 0);

  const stats = [
    { label: "Total Bookings", value: bookings.length, color: "text-[var(--green)]" },
    { label: "Upcoming", value: upcomingBookings.length, color: "text-[var(--orange)]" },
    { label: "Reviews", value: reviews.length, color: "text-[var(--deep-green)]" },
    { label: "Revenue", value: `£${revenue}`, color: "text-[var(--brown)]" },
  ];

  return (
    <div className="min-h-screen px-5 pt-[100px] pb-[60px] bg-[var(--cream)]">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
          <div>
            <Link href="/" className="flex items-center gap-2 text-[var(--muted)] mb-2 text-sm no-underline hover:text-[var(--deep-green)] transition-colors">
              <Icons.ArrowLeft size={16} /> Home
            </Link>
            <h1 className="ww-serif text-[clamp(1.6rem,4vw,2.2rem)]">Dashboard</h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3 mb-7">
          {stats.map((s, i) => (
            <div key={i} className="bg-[var(--warm-white)] rounded-[18px] p-5 shadow-[var(--shadow)] text-center">
              <div className={`ww-serif text-[1.8rem] font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[13px] text-[var(--muted)] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {/* Bookings */}
          <section>
            <h2 className="ww-serif text-[1.4rem] mb-3">Bookings</h2>
            <div className="flex flex-col gap-3">
              {bookings.length === 0 ? (
                <Empty text="No bookings yet" />
              ) : (
                bookings.map((b) => (
                  <div
                    key={b.id}
                    className={`bg-[var(--warm-white)] rounded-2xl p-5 shadow-[var(--shadow)] ${b.status === "cancelled" ? "opacity-50" : ""}`}
                  >
                    <div className="flex justify-between items-start gap-3 flex-wrap">
                      <div>
                        <div className="font-semibold mb-1">
                          {b.dogName}{" "}
                          <span className="font-normal text-[var(--muted)]">
                            ({b.dogBreed || b.dogSize})
                          </span>
                        </div>
                        <div className="text-sm text-[var(--muted)]">
                          {b.ownerName} · {b.email} · {b.phone}
                        </div>
                        <div className="text-sm text-[var(--deep-green)] font-medium mt-1.5">
                          {formatDate(b.date.toISOString().split("T")[0])} at {b.timeSlot} · £{b.price || 18}
                        </div>
                        {b.notes && (
                          <div className="text-[13px] text-[var(--muted)] mt-1.5 italic">&ldquo;{b.notes}&rdquo;</div>
                        )}
                      </div>
                      <div className="flex gap-2 items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            b.status === "confirmed"
                              ? "bg-[rgba(107,158,126,0.12)] text-[var(--green)]"
                              : "bg-[rgba(200,100,100,0.1)] text-[var(--danger)]"
                          }`}
                        >
                          {b.status}
                        </span>
                        {b.status === "confirmed" && (
                          <form action={cancelBooking}>
                            <input type="hidden" name="id" value={b.id} />
                            <button
                              type="submit"
                              className="text-xs text-[var(--danger)] bg-transparent border-none cursor-pointer hover:underline"
                            >
                              Cancel
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <h2 className="ww-serif text-[1.4rem] mb-3">Reviews</h2>
            <div className="flex flex-col gap-3">
              {reviews.length === 0 ? (
                <Empty text="No reviews yet" />
              ) : (
                reviews.map((r) => (
                  <div key={r.id} className="bg-[var(--warm-white)] rounded-2xl p-5 shadow-[var(--shadow)]">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <div className="font-semibold mb-1">
                          {r.name}
                          {r.dogName && <span className="text-[var(--muted)] font-normal"> · 🐕 {r.dogName}</span>}
                        </div>
                        <div className="text-sm mb-1">{"⭐".repeat(r.rating)}</div>
                        <p className="text-sm text-[var(--muted)] leading-relaxed">{r.text}</p>
                      </div>
                      <form action={deleteReview}>
                        <input type="hidden" name="id" value={r.id} />
                        <button
                          type="submit"
                          className="text-xs text-[var(--danger)] bg-transparent border-none cursor-pointer hover:underline"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Messages */}
          <section>
            <h2 className="ww-serif text-[1.4rem] mb-3">Messages</h2>
            <div className="flex flex-col gap-3">
              {messages.length === 0 ? (
                <Empty text="No messages yet" />
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="bg-[var(--warm-white)] rounded-2xl p-5 shadow-[var(--shadow)]">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <div className="font-semibold mb-1">
                          {m.name} <span className="text-[var(--muted)] font-normal text-sm">· {m.email}</span>
                        </div>
                        <p className="text-sm text-[var(--muted)] leading-relaxed">{m.message}</p>
                        <p className="text-xs text-[var(--light)] mt-2">
                          {m.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      <form action={deleteMessage}>
                        <input type="hidden" name="id" value={m.id} />
                        <button
                          type="submit"
                          className="text-xs text-[var(--danger)] bg-transparent border-none cursor-pointer hover:underline"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
