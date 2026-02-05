import { auth } from "@/auth";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { theme } from "@/components/willswalks/theme";
import { Icons } from "@/components/willswalks/Icons";
import { Empty } from "@/components/willswalks/Empty";
import { formatDate } from "@/components/willswalks/utils";

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
    prisma.booking.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.review.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const upcomingBookings = bookings.filter((b) => b.status === "confirmed" && b.date >= new Date());
  const revenue = bookings.filter((b) => b.status === "confirmed").reduce((s, b) => s + (b.price || 18), 0);

  return (
    <div style={{ minHeight: "100vh", padding: "100px 20px 60px", background: theme.cream }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: theme.muted, marginBottom: 8, fontFamily: "'Outfit', sans-serif", fontSize: 14, textDecoration: "none" }}>
              <Icons.ArrowLeft size={16} /> Home
            </a>
            <h1 className="ww-serif" style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)" }}>
              Dashboard
            </h1>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Total Bookings", value: bookings.length, color: theme.green },
            { label: "Upcoming", value: upcomingBookings.length, color: theme.orange },
            { label: "Reviews", value: reviews.length, color: theme.deepGreen },
            { label: "Revenue", value: `£${revenue}`, color: theme.brown },
          ].map((s, i) => (
            <div key={i} style={{ background: theme.warmWhite, borderRadius: 18, padding: 20, boxShadow: theme.shadow, textAlign: "center" }}>
              <div className="ww-serif" style={{ fontSize: "1.8rem", fontWeight: 700, color: s.color }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: theme.muted, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <section>
            <h2 className="ww-serif" style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              Bookings
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {bookings.length === 0 ? (
                <Empty text="No bookings yet" />
              ) : (
                bookings.map((b) => (
                  <div key={b.id} style={{ background: theme.warmWhite, borderRadius: 16, padding: 20, boxShadow: theme.shadow, opacity: b.status === "cancelled" ? 0.5 : 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>
                          {b.dogName} <span style={{ fontWeight: 400, color: theme.muted }}>({b.dogBreed || b.dogSize})</span>
                        </div>
                        <div style={{ fontSize: 14, color: theme.muted }}>
                          {b.ownerName} · {b.email} · {b.phone}
                        </div>
                        <div style={{ fontSize: 14, color: theme.deepGreen, fontWeight: 500, marginTop: 6 }}>
                          {formatDate(b.date.toISOString().split("T")[0])} at {b.timeSlot} · £{b.price || 18}
                        </div>
                        {b.notes && <div style={{ fontSize: 13, color: theme.muted, marginTop: 6, fontStyle: "italic" }}>"{b.notes}"</div>}
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span
                          style={{
                            padding: "4px 12px",
                            borderRadius: 50,
                            fontSize: 12,
                            fontWeight: 600,
                            background: b.status === "confirmed" ? "rgba(107,158,126,0.12)" : "rgba(200,100,100,0.1)",
                            color: b.status === "confirmed" ? theme.deepGreen : theme.danger,
                          }}
                        >
                          {b.status}
                        </span>
                        {b.status === "confirmed" && (
                          <form action={cancelBooking}>
                            <input type="hidden" name="id" value={b.id} />
                            <button title="Cancel booking" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, opacity: 0.5 }}>
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
          </section>

          <section>
            <h2 className="ww-serif" style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              Reviews
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {reviews.length === 0 ? (
                <Empty text="No reviews yet" />
              ) : (
                reviews.map((r) => (
                  <div key={r.id} style={{ background: theme.warmWhite, borderRadius: 16, padding: 20, boxShadow: theme.shadow }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>
                          {r.name} {r.dogName && <span style={{ fontWeight: 400, color: theme.muted }}>· {r.dogName}</span>}
                        </div>
                        <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Icons.Star key={s} filled={s <= r.rating} size={14} />
                          ))}
                        </div>
                        <p style={{ color: theme.muted, fontSize: 14, lineHeight: 1.5 }}>{r.text}</p>
                        <p style={{ color: theme.light, fontSize: 12, marginTop: 8 }}>{new Date(r.createdAt).toLocaleDateString("en-GB")}</p>
                      </div>
                      <form action={deleteReview}>
                        <input type="hidden" name="id" value={r.id} />
                        <button title="Delete review" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, opacity: 0.4 }}>
                          <Icons.Trash size={16} />
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section>
            <h2 className="ww-serif" style={{ fontSize: "1.4rem", marginBottom: 12 }}>
              Messages
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.length === 0 ? (
                <Empty text="No messages yet" />
              ) : (
                messages.map((m) => (
                  <div key={m.id} style={{ background: theme.warmWhite, borderRadius: 16, padding: 20, boxShadow: theme.shadow }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: 2 }}>{m.name}</div>
                        <div style={{ fontSize: 13, color: theme.muted, marginBottom: 8 }}>{m.email}</div>
                        <p style={{ color: theme.muted, fontSize: 14, lineHeight: 1.5 }}>{m.message}</p>
                        <p style={{ color: theme.light, fontSize: 12, marginTop: 8 }}>{new Date(m.createdAt).toLocaleDateString("en-GB")}</p>
                      </div>
                      <form action={deleteMessage}>
                        <input type="hidden" name="id" value={m.id} />
                        <button title="Delete message" style={{ background: "none", border: "none", cursor: "pointer", padding: 4, opacity: 0.4 }}>
                          <Icons.Trash size={16} />
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
