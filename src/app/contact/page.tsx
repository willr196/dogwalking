"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";
import { Input } from "@/components/willswalks/Input";
import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Could not send message.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen px-5 pt-[100px] pb-[60px] bg-[var(--cream)]">
        <div className="max-w-[520px] mx-auto">
          <Link href="/" className="flex items-center gap-2 text-[var(--muted)] mb-6 text-[15px] no-underline hover:text-[var(--deep-green)] transition-colors">
            <Icons.ArrowLeft size={18} /> Home
          </Link>

          <h1 className="ww-serif text-[clamp(1.8rem,4vw,2.4rem)] mb-2">Get in Touch</h1>
          <p className="text-[var(--muted)] mb-8">Have a question? Send me a message and I&apos;ll get back to you shortly.</p>

          {sent ? (
            <div className="bg-[var(--warm-white)] rounded-3xl p-8 shadow-[var(--shadow)] text-center anim-fade-up">
              <div className="text-5xl mb-4">📬</div>
              <h2 className="ww-serif text-[1.4rem] mb-3">Message Sent!</h2>
              <p className="text-[var(--muted)] mb-6">Thanks for reaching out. I&apos;ll reply as soon as I can.</p>
              <Link href="/" className="inline-block bg-[var(--green)] text-white px-7 py-[14px] rounded-full font-semibold text-[15px] no-underline transition-all duration-200 hover:bg-[var(--deep-green)]">
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="bg-[var(--warm-white)] rounded-3xl p-8 shadow-[var(--shadow)] anim-fade-up">
              <div className="flex flex-col gap-4">
                <Input label="Your Name *" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="e.g. Sarah Johnson" />
                <Input label="Email *" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="sarah@example.com" />
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text)]">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="How can I help?"
                    rows={5}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-[var(--light)] bg-[var(--cream)] text-[var(--text)] text-sm resize-none transition-colors duration-200 focus:border-[var(--green)] focus:outline-none"
                  />
                </div>
              </div>
              {error && <p className="text-[var(--danger)] text-sm mt-3">{error}</p>}
              <button
                onClick={submit}
                disabled={loading}
                className="mt-5 w-full bg-[var(--green)] text-white py-[14px] rounded-full font-semibold text-[15px] transition-all duration-200 hover:bg-[var(--deep-green)] cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <span className="spinner" /> : "Send Message"}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
