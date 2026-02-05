"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";
import { Input } from "@/components/willswalks/Input";
import { DOG_SIZES, TIME_SLOTS, WALK_PRICE } from "@/components/willswalks/constants";
import { formatDate } from "@/components/willswalks/utils";
import { theme } from "@/components/willswalks/theme";

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
      const data: { date: string; timeSlot: string; status: string }[] = await res.json();
      const slots = data
        .filter((b) => b.status !== "cancelled")
        .map((b) => {
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
    <div style={{ minHeight: "100vh", padding: "100px 20px 60px", background: theme.cream }}>
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type === "error" ? "error" : ""}`}>
            {t.type === "success" ? <Icons.Check size={16} color="white" /> : null}
            {t.msg}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: theme.muted, marginBottom: 24, fontFamily: "'Outfit', sans-serif", fontSize: 15, textDecoration: "none" }}>
          <Icons.ArrowLeft size={18} /> {step > 1 && step < 4 ? "Back" : "Home"}
        </Link>

        <h1 className="ww-serif" style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", marginBottom: 8 }}>
          Book a Walk
        </h1>

        {step < 4 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 36, marginTop: 16 }}>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  background: s <= step ? theme.green : "rgba(107,158,126,0.15)",
                  transition: "background 0.3s ease",
                }}
              />
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="anim-fade-up">
            <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 20 }}>Your Details</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Input label="Your Name *" value={form.ownerName} onChange={(v) => update("ownerName", v)} placeholder="e.g. Sarah" />
              <Input label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="sarah@email.com" />
              <Input label="Phone *" type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="07XXX XXXXXX" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="anim-fade-up">
            <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 20 }}>Tell Me About Your Dog</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Input label="Dog's Name *" value={form.dogName} onChange={(v) => update("dogName", v)} placeholder="e.g. Biscuit" />
              <Input label="Breed" value={form.dogBreed} onChange={(v) => update("dogBreed", v)} placeholder="e.g. Labrador" />
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, display: "block" }}>Size *</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {DOG_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => update("dogSize", size)}
                      style={{
                        flex: 1,
                        padding: "14px 0",
                        borderRadius: 14,
                        border: `2px solid ${form.dogSize === size ? theme.green : "rgba(107,158,126,0.15)"}`,
                        background: form.dogSize === size ? "rgba(107,158,126,0.08)" : "white",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 15,
                        color: form.dogSize === size ? theme.deepGreen : theme.muted,
                        transition: "all 0.2s",
                        fontFamily: "'Outfit', sans-serif",
                      }}
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

        {step === 3 && (
          <div className="anim-fade-up">
            <h3 style={{ fontWeight: 600, fontSize: 18, marginBottom: 20 }}>Pick a Date & Time</h3>

            <label style={{ fontSize: 14, fontWeight: 500, marginBottom: 10, display: "block" }}>Date *</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8, marginBottom: 24 }}>
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => update("date", d)}
                  style={{
                    padding: "12px 8px",
                    borderRadius: 12,
                    border: `2px solid ${form.date === d ? theme.green : "rgba(107,158,126,0.12)"}`,
                    background: form.date === d ? "rgba(107,158,126,0.08)" : "white",
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: 13,
                    color: form.date === d ? theme.deepGreen : theme.text,
                    transition: "all 0.2s",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {formatDate(d)}
                </button>
              ))}
            </div>

            {form.date && (
              <>
                <label style={{ fontSize: 14, fontWeight: 500, marginBottom: 10, display: "block" }}>Time *</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 8 }}>
                  {TIME_SLOTS.map((t) => {
                    const booked = isSlotBooked(form.date, t);
                    return (
                      <button
                        key={t}
                        onClick={() => !booked && update("time", t)}
                        disabled={booked}
                        style={{
                          padding: "12px 8px",
                          borderRadius: 12,
                          border: `2px solid ${form.time === t ? theme.green : booked ? "rgba(200,100,100,0.15)" : "rgba(107,158,126,0.12)"}`,
                          background: booked ? "rgba(200,100,100,0.05)" : form.time === t ? "rgba(107,158,126,0.08)" : "white",
                          cursor: booked ? "not-allowed" : "pointer",
                          fontWeight: 500,
                          fontSize: 14,
                          color: booked ? theme.light : form.time === t ? theme.deepGreen : theme.text,
                          transition: "all 0.2s",
                          fontFamily: "'Outfit', sans-serif",
                          textDecoration: booked ? "line-through" : "none",
                          opacity: booked ? 0.5 : 1,
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {form.date && form.time && (
              <div
                style={{
                  marginTop: 24,
                  padding: 20,
                  background: "rgba(107,158,126,0.06)",
                  borderRadius: 16,
                  border: "1px solid rgba(107,158,126,0.12)",
                }}
              >
                <p style={{ fontWeight: 600, marginBottom: 4 }}>Booking Summary</p>
                <p style={{ color: theme.muted, fontSize: 14 }}>
                  {form.dogName || "Your dog"} · {formatDate(form.date)} at {form.time} · £{WALK_PRICE}
                </p>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="anim-fade-up" style={{ textAlign: "center", padding: "40px 0" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                margin: "0 auto 24px",
                background: "rgba(107,158,126,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
              }}
            >
              🎉
            </div>
            <h2 className="ww-serif" style={{ fontSize: "1.8rem", marginBottom: 12 }}>
              Walk Booked!
            </h2>
            <p style={{ color: theme.muted, marginBottom: 8, lineHeight: 1.6 }}>
              {form.dogName}'s walk is confirmed for {formatDate(form.date)} at {form.time}.
            </p>
            <p style={{ color: theme.muted, marginBottom: 32, fontSize: 14 }}>
              A confirmation has been saved. We'll reach out to confirm details.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/"
                style={{ background: theme.green, color: "white", border: "none", padding: "14px 28px", borderRadius: 50, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif", textDecoration: "none" }}
              >
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setStep(1);
                  setForm({ ownerName: "", email: "", phone: "", dogName: "", dogBreed: "", dogSize: "Medium", date: "", time: "", notes: "" });
                }}
                style={{
                  background: theme.warmWhite,
                  color: theme.text,
                  border: `2px solid rgba(107,158,126,0.2)`,
                  padding: "14px 28px",
                  borderRadius: 50,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Book Another
              </button>
            </div>
          </div>
        )}

        {step < 4 && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 32 }}>
            <button
              onClick={() => (step === 3 ? submit() : setStep(step + 1))}
              disabled={!canProceed() || loading}
              style={{
                background: canProceed() ? theme.green : theme.light,
                color: "white",
                border: "none",
                padding: "14px 32px",
                borderRadius: 50,
                fontWeight: 600,
                fontSize: 15,
                cursor: canProceed() ? "pointer" : "not-allowed",
                fontFamily: "'Outfit', sans-serif",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: canProceed() ? 1 : 0.5,
              }}
            >
              {loading ? <span className="spinner" /> : step === 3 ? "Confirm Booking" : "Continue →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
