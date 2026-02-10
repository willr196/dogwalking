"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Icons } from "@/components/willswalks/Icons";
import { Input } from "@/components/willswalks/Input";

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
      body: JSON.stringify(form),
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

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  return (
    <div className="ww-page">
      <div className="ww-container">
        <Link href="/" className="ww-btn ww-btn-ghost text-sm mb-6">
          <Icons.ArrowLeft size={18} /> Home
        </Link>

        <div className="flex justify-between items-start mb-9 flex-wrap gap-4">
          <div>
            <div className="ww-kicker mb-3">Community</div>
            <h1 className="ww-serif ww-title mb-1">Reviews</h1>
            <p className="ww-lede text-left max-w-[520px]">
              {reviews.length > 0 ? (
                <>
                  <span className="font-semibold text-ww-text">{avgRating}</span> avg ·{" "}
                  {reviews.length} review{reviews.length > 1 ? "s" : ""}
                </>
              ) : (
                "No reviews yet — be the first!"
              )}
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="ww-btn ww-btn-primary text-sm"
          >
            {showForm ? "Cancel" : "Leave a Review"}
          </button>
        </div>

        {!session?.user && showForm && (
          <div className="bg-ww-green/10 rounded-2xl p-4 mb-5">
            <p className="text-ww-deep-green font-semibold">
              Please{" "}
              <Link href="/sign-in" className="text-ww-deep-green underline">
                sign in
              </Link>{" "}
              to leave a review.
            </p>
          </div>
        )}

        {showForm && session?.user && (
          <div className="anim-fade-up ww-card p-7 mb-7">
            <div className="flex flex-col gap-3.5">
              {error && <div className="text-ww-danger text-sm">{error}</div>}
              <Input
                label="Your Name *"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder="e.g. Sarah"
              />
              <Input
                label="Dog's Name"
                value={form.dogName}
                onChange={(v) => setForm((f) => ({ ...f, dogName: v }))}
                placeholder="e.g. Biscuit"
              />
              <div>
                <label className="text-sm font-medium mb-2 block">Rating</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setForm((f) => ({ ...f, rating: s }))}
                      className="bg-transparent border-none cursor-pointer p-0.5"
                    >
                      <Icons.Star filled={s <= form.rating} size={28} />
                    </button>
                  ))}
                </div>
              </div>
              <Input
                label="Your Review *"
                value={form.text}
                onChange={(v) => setForm((f) => ({ ...f, text: v }))}
                placeholder="Tell us about your experience..."
                multiline
              />
              <button
                onClick={submit}
                disabled={submitting}
                className="ww-btn ww-btn-primary self-end disabled:opacity-50"
              >
                {submitting ? <span className="spinner" /> : "Submit Review"}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-[60px]">
            <span
              className="spinner"
              style={{ borderColor: "rgba(107,158,126,0.2)", borderTopColor: "var(--green)" }}
            />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-[60px] bg-ww-green/5 rounded-[20px] border-2 border-dashed border-ww-green/20">
            <p className="text-[2.5rem] mb-3">🐾</p>
            <p className="text-ww-muted">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="ww-card p-6"
              >
                <div className="font-semibold mb-1">
                  {r.name}{" "}
                  {r.dogName && (
                    <span className="font-normal text-ww-muted">& {r.dogName}</span>
                  )}
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icons.Star key={s} filled={s <= r.rating} size={16} />
                  ))}
                </div>
                <p className="text-ww-muted text-sm leading-relaxed">{r.text}</p>
                <p className="text-ww-light text-xs mt-3">
                  {new Date(r.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
