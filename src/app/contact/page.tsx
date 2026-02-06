"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";
import { Input } from "@/components/willswalks/Input";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const submit = async () => {
    setStatus(null);
    if (!form.name || !form.email || !form.message) {
      setStatus("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);
    if (!res.ok) {
      setStatus("Something went wrong. Please try again.");
      return;
    }
    setForm({ name: "", email: "", message: "" });
    setStatus("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen px-5 pt-[100px] pb-[60px] bg-ww-cream">
      <div className="max-w-[520px] mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-ww-muted mb-6 font-sans text-[15px] no-underline hover:text-ww-deep-green transition-colors"
        >
          <Icons.ArrowLeft size={18} /> Home
        </Link>

        <h1 className="ww-serif text-[clamp(1.8rem,4vw,2.4rem)] mb-2">Get in Touch</h1>
        <p className="text-ww-muted mb-8 leading-relaxed">
          Have a question or want to learn more? Drop a message and we'll get back to you shortly.
        </p>

        <div className="bg-ww-warm-white rounded-3xl p-[clamp(24px,4vw,36px)] shadow-ww">
          <div className="flex flex-col gap-4">
            {status && (
              <div
                className={`text-sm ${
                  status.includes("sent") ? "text-ww-deep-green" : "text-ww-danger"
                }`}
              >
                {status}
              </div>
            )}
            <Input
              label="Name *"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              placeholder="Your name"
            />
            <Input
              label="Email *"
              type="email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              placeholder="your@email.com"
            />
            <Input
              label="Message *"
              value={form.message}
              onChange={(v) => setForm((f) => ({ ...f, message: v }))}
              placeholder="Tell me about your pup or ask anything..."
              multiline
            />
            <button
              onClick={submit}
              disabled={submitting}
              className="bg-ww-green text-white border-none px-7 py-3.5 rounded-full font-semibold cursor-pointer font-sans flex items-center justify-center gap-2 w-full text-[15px] hover:bg-ww-deep-green transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <span className="spinner" />
              ) : (
                <>
                  <Icons.Send size={16} color="white" /> Send Message
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href="mailto:hello@willswalks.co.uk"
            className="flex items-center gap-3 text-ww-text no-underline text-[15px] hover:text-ww-deep-green transition-colors"
          >
            <Icons.Mail size={18} color="var(--green)" /> hello@willswalks.co.uk
          </a>
          <a
            href="https://wa.me/44XXXXXXXXXX"
            className="flex items-center gap-3 text-ww-text no-underline text-[15px] hover:text-ww-deep-green transition-colors"
          >
            <Icons.Phone size={18} color="var(--green)" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}