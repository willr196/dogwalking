"use client";

import { useEffect, useState } from "react";
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

  const addToast = (msg: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/bookings");
      if (!res.ok) return;
      const data: { date: string; timeSlot: string }[] = await res.json();
      const slots = data.map((b) => {
        const iso = new Date(b.date).toISOString().split("T")[0];
        return `${iso}-${b.timeSlot}`;
      });
      setBookedSlots(slots);
    };
    load();
  }, []);

  const isSlotBooked = (date: string, time: string) => bookedSlots.includes(`${date}-${time}`);
  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const submit = async () => {
    setLoading(true);
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
    setLoading(false);
    if (res.ok) {
      addToast("Walk booked successfully! 🐾");
      setStep(4);
    } else {
      const data = await res.json().catch(() => ({}));
      addToast(data.error || "Something went wrong. Please try again.", "error");
    }
  };

  const canProceed = () => {
    if (step === 1) return form.ownerName && form.email && form.phone;
    if (step === 2) return form.dogName && form.dogSize;
    if (step === 3) return form.date && form.time;
    return false;
  };

  return (
    <div className="min-h-screen px-5 pt-[100px] pb-[60px] bg-ww-cream">
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type === "error" ? "error" : ""}`}>
            {t.type === "success" ? <Icons.Check size={16} color="white" /> : null}
            {t.msg}
          </div>
        ))}
      </div>

      <div className="max-w-[580px] mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-ww-muted mb-6 font-sans text-[15px] no-underline hover:text-ww-deep-green transition-colors"
        >
          <Icons.ArrowLeft size={18} /> {step > 1 && step < 4 ? "Back" : "Home"}
        </Link>

        <h1 className="ww-serif text-[clamp(1.8rem,4vw,2.4rem)] mb-2">Book a Walk</h1>

        {/* Progress bar */}
        {step < 4 && (
          <div className="flex gap-2 mb-9 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-sm transition-colors duration-300 ${
                  s <= step ? "bg-ww-green" : "bg-ww-green/15"
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 1: Your Details */}
        {step === 1 && (
          <div className="anim-fade-up">
            <h3 className="font-semibold text-lg mb-5">Your Details</h3>
            <div className="flex flex-col gap-3.5">
              <Input label="Your Name *" value={form.ownerName} onChange={(v) => update("ownerName", v)} placeholder="e.g. Sarah" />
              <Input label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="sarah@email.com" />
              <Input label="Phone *" type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="07XXX XXXXXX" />
            </div>
          </div>
        )}

        {/* Step 2: Dog Info */}
        {step === 2 && (
          <div className="anim-fade-up">
            <h3 className="font-semibold text-lg mb-5">Tell Me About Your Dog</h3>
            <div className="flex flex-col gap-3.5">
              <Input label="Dog's Name *" value={form.dogName} onChange={(v) => update("dogName", v)} placeholder="e.g. Biscuit" />
              <Input label="Breed" value={form.dogBreed} onChange={(v) => update("dogBreed", v)} placeholder="e.g. Labrador" />
              <div>
                <label className="text-sm font-medium mb-2 block">Size *</label>
                <div className="flex gap-2.5">
                  {DOG_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => update("dogSize", size)}
                      className={`flex-1 py-3.5 rounded-[14px] border-2 font-semibold text-[15px] font-sans cursor-pointer transition-all ${
                        form.dogSize === size
                          ? "border-ww-green bg-ww-green/10 text-ww-deep-green"
                          : "border-ww-green/15 bg-white text-ww-muted hover:border-ww-green/30"
                      }`}
                    >
                      {size === "Small" ? "🐕 " : size === "Medium" ? "🦮 " : "🐕‍🦺 "}
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <Input label="Special Notes" value={form.notes} onChange={(v) => update("notes", v)} placeholder="Allergies, favourite toys, etc." multiline />
            </div>
          </div>
        )}

        {/* Step 3: Date & Time */}
        {step === 3 && (
          <div className="anim-fade-up">
            <h3 className="font-semibold text-lg mb-5">Pick a Date & Time</h3>

            <label className="text-sm font-medium mb-2.5 block">Date *</label>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 mb-6">
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => update("date", d)}
                  className={`py-3 px-2 rounded-xl border-2 font-medium text-[13px] font-sans cursor-pointer transition-all ${
                    form.date === d
                      ? "border-ww-green bg-ww-green/10 text-ww-deep-green"
                      : "border-ww-green/10 bg-white text-ww-text hover:border-ww-green/30"
                  }`}
                >
                  {formatDate(d)}
                </button>
              ))}
            </div>

            {form.date && (
              <>
                <label className="text-sm font-medium mb-2.5 block">Time *</label>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
                  {TIME_SLOTS.map((t) => {
                    const booked = isSlotBooked(form.date, t);
                    return (
                      <button
                        key={t}
                        onClick={() => !booked && update("time", t)}
                        disabled={booked}
                        className={`py-3 px-2 rounded-xl border-2 font-medium text-sm font-sans transition-all ${
                          booked
                            ? "border-ww-danger/15 bg-ww-danger/5 text-ww-light cursor-not-allowed line-through opacity-50"
                            : form.time === t
                              ? "border-ww-green bg-ww-green/10 text-ww-deep-green cursor-pointer"
                              : "border-ww-green/10 bg-white text-ww-text cursor-pointer hover:border-ww-green/30"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {form.date && form.time && (
              <div className="mt-6 p-5 bg-ww-green/5 rounded-2xl border border-ww-green/10">
                <p className="font-semibold mb-1">Booking Summary</p>
                <p className="text-ww-muted text-sm">
                  {form.dogName || "Your dog"} · {formatDate(form.date)} at {form.time} · £{WALK_PRICE}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="anim-fade-up text-center py-10">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 bg-ww-green/10 flex items-center justify-center text-[2.5rem]">
              🎉
            </div>
            <h2 className="ww-serif text-[1.8rem] mb-3">Walk Booked!</h2>
            <p className="text-ww-muted mb-2 leading-relaxed">
              {form.dogName}&apos;s walk is confirmed for {formatDate(form.date)} at {form.time}.
            </p>
            <p className="text-ww-muted mb-8 text-sm">
              A confirmation has been saved. We&apos;ll reach out to confirm details.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                href="/"
                className="bg-ww-green text-white border-none px-7 py-3.5 rounded-full font-semibold cursor-pointer font-sans no-underline hover:bg-ww-deep-green transition-colors"
              >
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setStep(1);
                  setForm({ ownerName: "", email: "", phone: "", dogName: "", dogBreed: "", dogSize: "Medium", date: "", time: "", notes: "" });
                }}
                className="bg-ww-warm-white text-ww-text border-2 border-ww-green/20 px-7 py-3.5 rounded-full font-semibold cursor-pointer font-sans hover:border-ww-green/40 transition-colors"
              >
                Book Another
              </button>
            </div>
          </div>
        )}

        {/* Navigation button */}
        {step < 4 && (
          <div className="flex justify-end mt-8">
            <button
              onClick={() => (step === 3 ? submit() : setStep(step + 1))}
              disabled={!canProceed() || loading}
              className={`border-none px-8 py-3.5 rounded-full font-semibold text-[15px] font-sans flex items-center gap-2 transition-all ${
                canProceed()
                  ? "bg-ww-green text-white cursor-pointer hover:bg-ww-deep-green"
                  : "bg-ww-light text-white cursor-not-allowed opacity-50"
              }`}
            >
              {loading ? <span className="spinner" /> : step === 3 ? "Confirm Booking" : "Continue →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
