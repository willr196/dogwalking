"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Icons } from "@/components/willswalks/Icons";
import { Input } from "@/components/willswalks/Input";
import { theme } from "@/components/willswalks/theme";

type Review = {
  id: string;
  name: string;
  dogName?: string | null;
  rating: number;
  text: string;
  createdAt: string;
};

export function ReviewsClient() {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", dogName: "", rating: 5, text: "" });
  const [error, setError] = useState<string | null>(null);

  const loadReviews = async () => {
    setLoading(true);
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const submit = async () => {
    setError(null);
    if (!form.name || !form.text) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        dogName: form.dogName,
        rating: form.rating,
        text: form.text,
      }),
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not submit review.");
      return;
    }
    setForm({ name: "", dogName: "", rating: 5, text: "" });
    setShowForm(false);
    loadReviews();
  };

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "—";

  return (
    <div style={{ minHeight: "100vh", padding: "100px 20px 60px", background: theme.cream }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: theme.muted, marginBottom: 24, fontFamily: "'Outfit', sans-serif", fontSize: 15, textDecoration: "none" }}>
          <Icons.ArrowLeft size={18} /> Home
        </Link>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 className="ww-serif" style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", marginBottom: 4 }}>
              Reviews
            </h1>
            <p style={{ color: theme.muted }}>
              {reviews.length > 0 ? (
                <>
                  <span style={{ fontWeight: 600, color: theme.text }}>{avgRating}</span> avg · {reviews.length} review{reviews.length > 1 ? "s" : ""}
                </>
              ) : (
                "No reviews yet — be the first!"
              )}
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: theme.green,
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: 50,
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {showForm ? "Cancel" : "Leave a Review"}
          </button>
        </div>

        {!session?.user && showForm && (
          <div style={{ background: "rgba(107,158,126,0.08)", borderRadius: 16, padding: 16, marginBottom: 20 }}>
            <p style={{ color: theme.deepGreen, fontWeight: 600 }}>
              Please{" "}
              <Link href="/sign-in" style={{ color: theme.deepGreen, textDecoration: "underline" }}>
                sign in
              </Link>{" "}
              to leave a review.
            </p>
          </div>
        )}

        {showForm && session?.user && (
          <div
            className="anim-fade-up"
            style={{ background: theme.warmWhite, borderRadius: 20, padding: 28, marginBottom: 28, boxShadow: theme.shadow }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {error && <div style={{ color: theme.danger, fontSize: 14 }}>{error}</div>}
              <Input label="Your Name *" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="e.g. Sarah" />
              <Input label="Dog's Name" value={form.dogName} onChange={(v) => setForm((f) => ({ ...f, dogName: v }))} placeholder="e.g. Biscuit" />
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, display: "block" }}>Rating</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setForm((f) => ({ ...f, rating: s }))} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                      <Icons.Star filled={s <= form.rating} size={28} />
                    </button>
                  ))}
                </div>
              </div>
              <Input label="Your Review *" value={form.text} onChange={(v) => setForm((f) => ({ ...f, text: v }))} placeholder="Tell us about your experience..." multiline />
              <button
                onClick={submit}
                disabled={submitting}
                style={{
                  background: theme.green,
                  color: "white",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: 50,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                  alignSelf: "flex-end",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {submitting ? <span className="spinner" /> : "Submit Review"}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: "center", padding: 60 }}>
            <span className="spinner" style={{ borderColor: "rgba(107,158,126,0.2)", borderTopColor: theme.green }} />
          </div>
        ) : reviews.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, background: "rgba(107,158,126,0.05)", borderRadius: 20, border: "2px dashed rgba(107,158,126,0.2)" }}>
            <p style={{ fontSize: "2.5rem", marginBottom: 12 }}>🐾</p>
            <p style={{ color: theme.muted }}>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {reviews.map((r, i) => (
              <div key={r.id} className="anim-fade-up" style={{ background: theme.warmWhite, borderRadius: 20, padding: 24, boxShadow: theme.shadow, animationDelay: `${i * 0.05}s` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{r.name}</span>
                    {r.dogName && <span style={{ color: theme.muted, fontSize: 14 }}> · {r.dogName}'s owner</span>}
                  </div>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icons.Star key={s} filled={s <= r.rating} size={16} />
                    ))}
                  </div>
                </div>
                <p style={{ color: theme.muted, lineHeight: 1.6, fontSize: 15 }}>{r.text}</p>
                <p style={{ color: theme.light, fontSize: 12, marginTop: 10 }}>
                  {new Date(r.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
