"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";
import { Input } from "@/components/willswalks/Input";
import { DOG_SIZES, TIME_SLOTS, WALK_PRICE } from "@/components/willswalks/constants";
import { formatDate } from "@/components/willswalks/utils";

type Toast = { id: number; msg: string; type: "success" | "error" };

export function BookingClient() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [form, setForm] = useState({
    ownerName: "",
    email: "",
    phone: "",
    dogName: "",
    dogBreed: "",
    dogSize: "Medium",
    date: "",
    time: "",
    notes: "",
  });

  const addToast = useCallback((msg: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, msg, type }]);
    setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 3500);
  }, []);

  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split("T")[0];
  });

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch("/api/bookings", { signal: controller.signal });
        if (!res.ok) return;

        const data: { date: string; timeSlot: string; status: string }[] = await res.json();
        const slots = data
          .filter((booking) => booking.status !== "cancelled")
          .map((booking) => {
            const iso = new Date(booking.date).toISOString().split("T")[0];
            return `${iso}-${booking.timeSlot}`;
          });

        setBookedSlots(slots);
      } catch {
        // ignore abort/network noise
      }
    };

    load();
    return () => controller.abort();
  }, []);

  const isSlotBooked = (date: string, time: string) => bookedSlots.includes(`${date}-${time}`);
  const update = (field: string, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerName: form.ownerName,
          email: form.email,
          phone: form.phone,
          dogName: form.dogName,
          dogBreed: form.dogBreed,
          dogSize: form.dogSize,
          date: form.date,
          timeSlot: form.time,
          notes: form.notes,
        }),
      });

      if (res.ok) {
        addToast("Walk booked successfully.");
        setStep(4);
      } else {
        const data = await res.json().catch(() => ({}));
        addToast(data.error || "Something went wrong. Please try again.", "error");
      }
    } catch {
      addToast("Network error. Please try again.", "error");
    }

    setLoading(false);
  };

  return (
    <div className="px-5 pb-14 pt-28">
      <div className="mx-auto w-full max-w-[760px]">
        <Link href="/" className="ww-btn ww-btn-ghost mb-6 text-sm">
          <Icons.ArrowLeft size={18} /> Home
        </Link>

        <h1 className="ww-serif mb-2 text-[clamp(2rem,4vw,2.8rem)] leading-tight">Book a Walk</h1>
        <p className="mb-8 leading-relaxed text-[var(--muted)]">
          £{WALK_PRICE} per walk, {" "}
          <span className="font-semibold text-[var(--text)]">one hour of dedicated care</span>
        </p>

        <div className="mb-8 flex gap-2" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={4}>
          {[1, 2, 3, 4].map((currentStep) => (
            <div
              key={currentStep}
              className={`h-1 flex-1 rounded-full transition-colors ${
                currentStep <= step ? "bg-[var(--green)]" : "bg-[var(--line)]"
              }`}
            />
          ))}
        </div>

        {step === 1 ? (
          <div className="anim-fade-up ww-card p-7 md:p-8">
            <h2 className="ww-serif mb-6 text-[1.45rem] leading-tight">Your Details</h2>
            <div className="flex flex-col gap-4">
              <Input
                label="Your Name *"
                value={form.ownerName}
                onChange={(value) => update("ownerName", value)}
                placeholder="e.g. Sarah Johnson"
              />
              <Input
                label="Email *"
                type="email"
                value={form.email}
                onChange={(value) => update("email", value)}
                placeholder="sarah@example.com"
              />
              <Input
                label="Phone *"
                type="tel"
                value={form.phone}
                onChange={(value) => update("phone", value)}
                placeholder="07123 456789"
              />
            </div>

            <button
              onClick={() => {
                if (!form.ownerName || !form.email || !form.phone) {
                  addToast("Please fill in all required fields.", "error");
                  return;
                }
                setStep(2);
              }}
              className="ww-btn ww-btn-primary mt-6 w-full"
            >
              Next
            </button>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="anim-fade-up ww-card p-7 md:p-8">
            <h2 className="ww-serif mb-6 text-[1.45rem] leading-tight">About Your Dog</h2>
            <div className="flex flex-col gap-4">
              <Input
                label="Dog's Name *"
                value={form.dogName}
                onChange={(value) => update("dogName", value)}
                placeholder="e.g. Bella"
              />
              <Input
                label="Breed"
                value={form.dogBreed}
                onChange={(value) => update("dogBreed", value)}
                placeholder="e.g. Labrador"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--text)]">Dog Size *</label>
                <div className="flex flex-wrap gap-2">
                  {DOG_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => update("dogSize", size)}
                      className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                        form.dogSize === size
                          ? "border-[var(--green)] bg-[var(--green)] text-white"
                          : "border-[var(--line)] bg-white text-[var(--text)] hover:border-[var(--green)]/45"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-full rounded-full border border-[var(--line-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--muted)]"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (!form.dogName) {
                    addToast("Please enter your dog's name.", "error");
                    return;
                  }
                  setStep(3);
                }}
                className="ww-btn ww-btn-primary w-full"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="anim-fade-up ww-card p-7 md:p-8">
            <h2 className="ww-serif mb-6 text-[1.45rem] leading-tight">Choose Date &amp; Time</h2>

            <label className="mb-3 block text-sm font-medium text-[var(--text)]">Date *</label>
            <div className="mb-6 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2">
              {dates.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => update("date", date)}
                  className={`rounded-2xl border px-2 py-3 text-sm font-semibold transition-colors ${
                    form.date === date
                      ? "border-[var(--green)] bg-[var(--green)] text-white"
                      : "border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--green)]/45"
                  }`}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>

            {form.date ? (
              <>
                <label className="mb-3 block text-sm font-medium text-[var(--text)]">Time *</label>
                <div className="mb-6 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
                  {TIME_SLOTS.map((time) => {
                    const booked = isSlotBooked(form.date, time);

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => {
                          if (!booked) update("time", time);
                        }}
                        disabled={booked}
                        className={`rounded-2xl border px-2 py-3 text-sm font-semibold transition-colors ${
                          booked
                            ? "cursor-not-allowed border-[var(--line)] bg-[var(--surface)] text-[var(--light)] line-through"
                            : form.time === time
                              ? "border-[var(--green)] bg-[var(--green)] text-white"
                              : "border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--green)]/45"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : null}

            <Input
              label="Notes (optional)"
              value={form.notes}
              onChange={(value) => update("notes", value)}
              placeholder="Anything I should know?"
            />

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="w-full rounded-full border border-[var(--line-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--muted)]"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (!form.date || !form.time) {
                    addToast("Please select a date and time.", "error");
                    return;
                  }
                  submit();
                }}
                disabled={loading}
                className="ww-btn ww-btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <span className="spinner" /> : `Confirm · £${WALK_PRICE}`}
              </button>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="anim-fade-up ww-card p-8 text-center">
            <p className="mb-4 text-6xl">🎉</p>
            <h2 className="ww-serif mb-3 text-[1.7rem] leading-tight">Walk Booked</h2>
            <p className="mb-2 leading-relaxed text-[var(--muted)]">
              <strong>{form.dogName}</strong> is booked for <strong>{formatDate(form.date)}</strong> at{" "}
              <strong>{form.time}</strong>.
            </p>
            <p className="mb-6 text-sm text-[var(--muted)]">Confirmation sent to {form.email}</p>
            <Link
              href="/"
              className="inline-flex rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-7 py-3 text-sm font-semibold text-white no-underline"
            >
              Back to Home
            </Link>
          </div>
        ) : null}
      </div>

      {toasts.length > 0 ? (
        <div className="toast-container" role="status" aria-live="polite">
          {toasts.map((toast) => (
            <div key={toast.id} className={`toast ${toast.type === "error" ? "error" : ""}`}>
              {toast.type === "error" ? "⚠" : "✓"} {toast.msg}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
