"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";
import { Input } from "@/components/willswalks/Input";
import { siteConfig } from "@/lib/site.config";

export function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
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

    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="px-5 pb-14 pt-6 md:pt-10">
      <div className="mx-auto w-full max-w-[760px]">
        <Link href="/" className="ww-btn ww-btn-ghost mb-6 text-sm">
          <Icons.ArrowLeft size={18} /> Home
        </Link>

        <p className="ww-kicker mb-3">Contact</p>
        <h1 className="ww-serif ww-title mb-2">Get in Touch</h1>
        <p className="ww-lede mb-8 max-w-[560px] text-left">
          Have a question about your dog&apos;s routine, availability, or walk type? Send a message and I&apos;ll get
          back to you shortly.
        </p>

        {sent ? (
          <div className="anim-fade-up ww-card p-8 text-center">
            <p className="mb-3 text-5xl">📬</p>
            <h2 className="ww-serif text-[1.55rem] leading-tight">Message sent</h2>
            <p className="mx-auto mt-2 max-w-[480px] text-sm leading-relaxed text-[var(--muted)]">
              Thanks for reaching out. I&apos;ll reply as soon as possible.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-7 py-3 text-sm font-semibold text-white no-underline"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            <div className="ww-card p-7 md:p-8">
              <div className="flex flex-col gap-4">
                {status ? (
                  <div className={`text-sm ${status.includes("sent") ? "text-ww-deep-green" : "text-ww-danger"}`}>
                    {status}
                  </div>
                ) : null}

                <Input
                  label="Name *"
                  value={form.name}
                  onChange={(value) => setForm((current) => ({ ...current, name: value }))}
                  placeholder="Your name"
                />

                <Input
                  label="Email *"
                  type="email"
                  value={form.email}
                  onChange={(value) => setForm((current) => ({ ...current, email: value }))}
                  placeholder="your@email.com"
                />

                <Input
                  label="Message *"
                  value={form.message}
                  onChange={(value) => setForm((current) => ({ ...current, message: value }))}
                  placeholder="Tell me about your dog or ask anything..."
                  multiline
                />

                <button
                  onClick={submit}
                  disabled={submitting}
                  className="ww-btn ww-btn-primary w-full text-[15px] disabled:opacity-50"
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

            <div className="mt-7 grid gap-3 text-sm">
              <a
                href={`mailto:${siteConfig.owner.email}`}
                className="inline-flex items-center gap-2 text-[var(--text)] no-underline transition-colors hover:text-[var(--deep-green)]"
              >
                <Icons.Mail size={18} color="var(--green)" /> {siteConfig.owner.email}
              </a>
              <a
                href={siteConfig.owner.whatsapp ? `https://wa.me/${siteConfig.owner.whatsapp}` : "https://wa.me/44XXXXXXXXXX"}
                className="inline-flex items-center gap-2 text-[var(--text)] no-underline transition-colors hover:text-[var(--deep-green)]"
              >
                <Icons.Phone size={18} color="var(--green)" /> WhatsApp
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
