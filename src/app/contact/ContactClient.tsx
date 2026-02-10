"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";
import { Input } from "@/components/willswalks/Input";
import { siteConfig } from "@/lib/site.config";

export function ContactClient() {
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
    setStatus("Message sent! I'll get back to you soon.");
  };

  return (
    <div className="ww-page">
      <div className="ww-container">
        <Link href="/" className="ww-btn ww-btn-ghost text-sm mb-6">
          <Icons.ArrowLeft size={18} /> Home
        </Link>

        <div className="ww-kicker mb-3">Contact</div>
        <h1 className="ww-serif ww-title mb-2">Get in Touch</h1>
        <p className="ww-lede mb-8 text-left max-w-[520px]">
          Have a question or want to learn more? Drop a message and I&apos;ll get
          back to you shortly.
        </p>

        <div className="ww-card p-[clamp(24px,4vw,36px)]">
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

        <div className="mt-8 flex flex-col gap-3">
          <a
            href={`mailto:${siteConfig.owner.email}`}
            className="flex items-center gap-3 text-ww-text no-underline text-[15px] hover:text-ww-deep-green transition-colors"
          >
            <Icons.Mail size={18} color="var(--green)" /> {siteConfig.owner.email}
          </a>
          <a
            href={
              siteConfig.owner.whatsapp
                ? `https://wa.me/${siteConfig.owner.whatsapp}`
                : "https://wa.me/44XXXXXXXXXX"
            }
            className="flex items-center gap-3 text-ww-text no-underline text-[15px] hover:text-ww-deep-green transition-colors"
          >
            <Icons.Phone size={18} color="var(--green)" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
