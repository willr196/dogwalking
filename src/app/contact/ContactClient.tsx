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

  if (sent) {
    return (
      <div className="px-5 pb-20 pt-6 md:pt-14">
        <div className="mx-auto w-full max-w-[480px] text-center anim-fade-up">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(140deg,rgba(15,141,135,0.18),rgba(23,80,106,0.12))]">
            <Icons.Check size={28} color="var(--green)" />
          </div>
          <h2 className="ww-serif text-[2.1rem] leading-tight">Message sent</h2>
          <p className="mx-auto mt-3 max-w-[400px] text-[15px] leading-relaxed text-[var(--muted)]">
            Thanks for reaching out. I&apos;ll reply as soon as possible — usually within a few hours.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-8 py-3.5 text-sm font-semibold text-white no-underline shadow-[0_10px_22px_rgba(14,68,94,0.28)] transition-all hover:-translate-y-0.5"
          >
            Back to Home
            <Icons.ArrowRight size={15} color="white" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pb-20 pt-6 md:pt-10">
      <div className="ww-container">
        <Link href="/" className="ww-btn ww-btn-ghost mb-8 text-sm">
          <Icons.ArrowLeft size={16} /> Home
        </Link>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">

          {/* ── LEFT: Info sidebar ── */}
          <div className="anim-fade-up">
            <p className="ww-kicker mb-4">Contact</p>
            <h1 className="ww-serif text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] tracking-[-0.025em] text-[var(--text)]">
              Let&apos;s talk about your dog
            </h1>
            <p className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-[var(--muted)]">
              Have a question about availability, walk types, or your dog&apos;s specific needs? I&apos;m
              quick to reply — usually within a few hours.
            </p>

            {/* Contact method cards */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:${siteConfig.owner.email}`}
                className="ww-card ww-card-hover flex items-center gap-4 p-4 no-underline"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(140deg,rgba(15,141,135,0.16),rgba(23,80,106,0.1))]">
                  <Icons.Mail size={18} color="var(--deep-green)" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-[var(--muted)]">
                    Email
                  </p>
                  <p className="mt-0.5 truncate font-semibold text-[var(--text)]">
                    {siteConfig.owner.email}
                  </p>
                </div>
                <Icons.ArrowRight size={15} color="var(--light)" className="ml-auto shrink-0" />
              </a>

              <a
                href={
                  siteConfig.owner.whatsapp
                    ? `https://wa.me/${siteConfig.owner.whatsapp}`
                    : "https://wa.me/44XXXXXXXXXX"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="ww-card ww-card-hover flex items-center gap-4 p-4 no-underline"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[rgba(37,211,102,0.12)]">
                  <Icons.Phone size={18} color="#25D366" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-[var(--muted)]">
                    WhatsApp
                  </p>
                  <p className="mt-0.5 font-semibold text-[var(--text)]">Message directly</p>
                </div>
                <Icons.ArrowRight size={15} color="var(--light)" className="ml-auto shrink-0" />
              </a>
            </div>

            {/* Response time + hours */}
            <div className="mt-5 rounded-2xl border border-[var(--line)] bg-white/60 p-4 text-sm">
              <p className="font-semibold text-[var(--text)]">Response time</p>
              <p className="mt-1 text-[var(--muted)]">
                Usually within a few hours. Available Monday to Sunday, 7 am to 7 pm.
              </p>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="anim-fade-up anim-delay-1 ww-card p-6 md:p-8">
            <h2 className="ww-serif mb-6 text-[1.65rem] leading-tight text-[var(--text)]">
              Send a message
            </h2>

            {status && (
              <div
                className={`mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${
                  status.includes("sent")
                    ? "border-[rgba(15,141,135,0.3)] bg-[rgba(15,141,135,0.08)] text-[var(--deep-green)]"
                    : "border-[rgba(204,68,84,0.28)] bg-[rgba(204,68,84,0.07)] text-[var(--danger)]"
                }`}
              >
                {status}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Input
                label="Name *"
                value={form.name}
                onChange={(value) => setForm((c) => ({ ...c, name: value }))}
                placeholder="Your name"
              />

              <Input
                label="Email *"
                type="email"
                value={form.email}
                onChange={(value) => setForm((c) => ({ ...c, email: value }))}
                placeholder="your@email.com"
              />

              <Input
                label="Message *"
                value={form.message}
                onChange={(value) => setForm((c) => ({ ...c, message: value }))}
                placeholder="Tell me about your dog, ask about availability, or anything else…"
                multiline
                rows={5}
              />

              <button
                onClick={submit}
                disabled={submitting}
                className="ww-btn ww-btn-primary mt-1 w-full py-3.5 text-[15px] disabled:opacity-60"
              >
                {submitting ? (
                  <span className="spinner" />
                ) : (
                  <>
                    <Icons.Send size={15} color="white" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
