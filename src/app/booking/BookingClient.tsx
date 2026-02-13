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
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await fetch("/api/bookings", { signal: controller.signal });
        if (!res.ok) return;
        const data: { date: string; timeSlot: string; status: string }[] = await res.json();
        const slots = data
          .filter((b) => b.status !== "cancelled")
          .map((b) => {
            const iso = new Date(b.date).toISOString().split("T")[0];
            return `${iso}-${b.timeSlot}`;
          });
        setBookedSlots(slots);
      } catch {
        // Aborted or network error
      }
    };
    load();
    return () => controller.abort();
  }, []);

  const isSlotBooked = (date: string, time: string) => bookedSlots.includes(`${date}-${time}`);
  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

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
        addToast("Walk booked successfully! 🐾");
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
    <div className="min-h-screen px-5 pt-[100px] pb-[60px] bg-[var(--cream)]">
      <div className="max-w-[640px] mx-auto">
        <Link href="/" className="flex items-center gap-2 text-[var(--muted)] mb-6 text-[15px] no-underline hover:text-[var(--deep-green)] transition-colors">
          <Icons.ArrowLeft size={18} /> Home
        </Link>

        <h1 className="ww-serif text-[clamp(1.8rem,4vw,2.4rem)] mb-2">Book a Walk</h1>
        <p className="text-[var(--muted)] mb-8">
          £{WALK_PRICE} per solo walk · 1 hour of dedicated one-on-one time
        </p>

        {/* Step indicators */}
        <div className="flex gap-2 mb-8" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={4}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                s <= step ? "bg-[var(--green)]" : "bg-[var(--light)]"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Your Details */}
        {step === 1 && (
          <div className="bg-[var(--warm-white)] rounded-3xl p-8 shadow-[var(--shadow)] anim-fade-up">
            <h2 className="ww-serif text-[1.3rem] mb-6">Your Details</h2>
            <div className="flex flex-col gap-4">
              <Input label="Your Name *" value={form.ownerName} onChange={(v) => update("ownerName", v)} placeholder="e.g. Sarah Johnson" />
              <Input label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="sarah@example.com" />
              <Input label="Phone *" type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="07123 456789" />
            </div>
            <button
              onClick={() => {
                if (!form.ownerName || !form.email || !form.phone) {
                  addToast("Please fill in all required fields.", "error");
                  return;
                }
                setStep(2);
              }}
              className="mt-6 w-full bg-[var(--green)] text-white py-[14px] rounded-full font-semibold text-[15px] transition-all duration-200 hover:bg-[var(--deep-green)] cursor-pointer border-none"
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2: Dog Details */}
        {step === 2 && (
          <div className="bg-[var(--warm-white)] rounded-3xl p-8 shadow-[var(--shadow)] anim-fade-up">
            <h2 className="ww-serif text-[1.3rem] mb-6">About Your Dog</h2>
            <div className="flex flex-col gap-4">
              <Input label="Dog's Name *" value={form.dogName} onChange={(v) => update("dogName", v)} placeholder="e.g. Bella" />
              <Input label="Breed" value={form.dogBreed} onChange={(v) => update("dogBreed", v)} placeholder="e.g. Labrador (optional)" />
              <div>
                <label className="block text-sm font-medium mb-2 text-[var(--text)]">Dog Size *</label>
                <div className="flex gap-2 flex-wrap">
                  {DOG_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => update("dogSize", size)}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all duration-200 cursor-pointer ${
                        form.dogSize === size
                          ? "bg-[var(--green)] text-white border-[var(--green)]"
                          : "bg-transparent text-[var(--text)] border-[var(--light)] hover:border-[var(--green)]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)} className="flex-1 py-[14px] rounded-full font-semibold text-[15px] border-2 border-[var(--light)] text-[var(--muted)] bg-transparent cursor-pointer transition-colors hover:border-[var(--green)]">
                ← Back
              </button>
              <button
                onClick={() => {
                  if (!form.dogName) {
                    addToast("Please enter your dog's name.", "error");
                    return;
                  }
                  setStep(3);
                }}
                className="flex-1 bg-[var(--green)] text-white py-[14px] rounded-full font-semibold text-[15px] transition-all duration-200 hover:bg-[var(--deep-green)] cursor-pointer border-none"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Date & Time */}
        {step === 3 && (
          <div className="bg-[var(--warm-white)] rounded-3xl p-8 shadow-[var(--shadow)] anim-fade-up">
            <h2 className="ww-serif text-[1.3rem] mb-6">Choose Date & Time</h2>

            <label className="block text-sm font-medium mb-3 text-[var(--text)]">Date *</label>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 mb-6">
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => update("date", d)}
                  className={`py-3 px-2 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer border-2 ${
                    form.date === d
                      ? "bg-[var(--green)] text-white border-[var(--green)]"
                      : "bg-[var(--cream)] text-[var(--text)] border-transparent hover:border-[var(--green)]"
                  }`}
                >
                  {formatDate(d)}
                </button>
              ))}
            </div>

            {form.date && (
              <>
                <label className="block text-sm font-medium mb-3 text-[var(--text)]">Time *</label>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 mb-6">
                  {TIME_SLOTS.map((t) => {
                    const booked = isSlotBooked(form.date, t);
                    return (
                      <button
                        key={t}
                        onClick={() => !booked && update("time", t)}
                        disabled={booked}
                        className={`py-3 px-2 rounded-2xl text-sm font-medium transition-all duration-200 border-2 ${
                          booked
                            ? "bg-[var(--cream)] text-[var(--light)] border-transparent cursor-not-allowed line-through"
                            : form.time === t
                            ? "bg-[var(--green)] text-white border-[var(--green)] cursor-pointer"
                            : "bg-[var(--cream)] text-[var(--text)] border-transparent hover:border-[var(--green)] cursor-pointer"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            <Input label="Notes (optional)" value={form.notes} onChange={(v) => update("notes", v)} placeholder="Anything I should know?" />

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(2)} className="flex-1 py-[14px] rounded-full font-semibold text-[15px] border-2 border-[var(--light)] text-[var(--muted)] bg-transparent cursor-pointer transition-colors hover:border-[var(--green)]">
                ← Back
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
                className="flex-1 bg-[var(--green)] text-white py-[14px] rounded-full font-semibold text-[15px] transition-all duration-200 hover:bg-[var(--deep-green)] cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <span className="spinner" /> : `Confirm · £${WALK_PRICE}`}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="bg-[var(--warm-white)] rounded-3xl p-8 shadow-[var(--shadow)] text-center anim-fade-up">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="ww-serif text-[1.6rem] mb-3">Walk Booked!</h2>
            <p className="text-[var(--muted)] mb-2">
              <strong>{form.dogName}</strong> is booked for{" "}
              <strong>{formatDate(form.date)}</strong> at <strong>{form.time}</strong>
            </p>
            <p className="text-[var(--muted)] mb-6 text-sm">A confirmation has been sent to {form.email}</p>
            <Link
              href="/"
              className="inline-block bg-[var(--green)] text-white px-7 py-[14px] rounded-full font-semibold text-[15px] transition-all duration-200 hover:bg-[var(--deep-green)] no-underline"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>

      {/* Toasts */}
      {toasts.length > 0 && (
        <div className="toast-container" role="status" aria-live="polite">
          {toasts.map((t) => (
            <div key={t.id} className={`toast ${t.type === "error" ? "error" : ""}`}>
              {t.type === "error" ? "⚠️" : "✅"} {t.msg}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
