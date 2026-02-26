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
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "—";

  return (
    <div className="px-5 pb-14 pt-6 md:pt-10">
      <div className="mx-auto w-full max-w-[1240px]">
        <Link href="/" className="ww-btn ww-btn-ghost mb-6 text-sm">
          <Icons.ArrowLeft size={18} /> Home
        </Link>

        <div className="mb-9 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="ww-kicker mb-3">Community</p>
            <h1 className="ww-serif ww-title mb-1">Reviews</h1>
            <p className="ww-lede max-w-[540px] text-left">
              {reviews.length > 0 ? (
                <>
                  <span className="font-semibold text-[var(--text)]">{avgRating}</span> average from {reviews.length} review
                  {reviews.length > 1 ? "s" : ""}
                </>
              ) : (
                "No reviews yet. Be the first to share your experience."
              )}
            </p>
          </div>

          <button onClick={() => setShowForm((value) => !value)} className="ww-btn ww-btn-primary text-sm">
            {showForm ? "Cancel" : "Leave a Review"}
          </button>
        </div>

        {!session?.user && showForm ? (
          <div className="mb-5 rounded-2xl border border-[rgba(15,141,135,0.3)] bg-[rgba(15,141,135,0.12)] p-4 text-sm text-[var(--deep-green)]">
            Please{" "}
            <Link href="/sign-in" className="font-semibold text-[var(--deep-green)] underline">
              sign in
            </Link>{" "}
            to leave a review.
          </div>
        ) : null}

        {showForm && session?.user ? (
          <div className="anim-fade-up ww-card mb-7 p-7">
            <div className="flex flex-col gap-3.5">
              {error ? <div className="text-sm text-[var(--danger)]">{error}</div> : null}

              <Input
                label="Your Name *"
                value={form.name}
                onChange={(value) => setForm((current) => ({ ...current, name: value }))}
                placeholder="e.g. Sarah"
              />

              <Input
                label="Dog's Name"
                value={form.dogName}
                onChange={(value) => setForm((current) => ({ ...current, dogName: value }))}
                placeholder="e.g. Biscuit"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--text)]">Rating</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => setForm((current) => ({ ...current, rating: score }))}
                      className="rounded-md border-none bg-transparent p-0.5"
                      type="button"
                    >
                      <Icons.Star filled={score <= form.rating} size={28} />
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Your Review *"
                value={form.text}
                onChange={(value) => setForm((current) => ({ ...current, text: value }))}
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
        ) : null}

        {loading ? (
          <div className="py-14 text-center">
            <span className="spinner" style={{ borderColor: "rgba(15,141,135,0.2)", borderTopColor: "var(--green)" }} />
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--line-strong)] bg-[var(--surface)] py-14 text-center">
            <p className="mb-3 text-[2.4rem]">🐾</p>
            <p className="text-[var(--muted)]">No reviews yet. Be the first to share your experience.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <article key={review.id} className="ww-card p-6">
                <div className="mb-1 font-semibold text-[var(--text)]">
                  {review.name}{" "}
                  {review.dogName ? <span className="font-normal text-[var(--muted)]">&amp; {review.dogName}</span> : null}
                </div>

                <div className="mb-2 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <Icons.Star key={score} filled={score <= review.rating} size={16} />
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-[var(--muted)]">{review.text}</p>
                <p className="mt-3 text-xs text-[var(--light)]">
                  {new Date(review.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
