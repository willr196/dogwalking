"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";
import { Input } from "@/components/willswalks/Input";
import { theme } from "@/components/willswalks/theme";

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
    <div style={{ minHeight: "100vh", padding: "100px 20px 60px", background: theme.cream }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: theme.muted, marginBottom: 24, fontFamily: "'Outfit', sans-serif", fontSize: 15, textDecoration: "none" }}>
          <Icons.ArrowLeft size={18} /> Home
        </Link>

        <h1 className="ww-serif" style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", marginBottom: 8 }}>
          Get in Touch
        </h1>
        <p style={{ color: theme.muted, marginBottom: 32, lineHeight: 1.6 }}>
          Have a question or want to learn more? Drop a message and we'll get back to you shortly.
        </p>

        <div style={{ background: theme.warmWhite, borderRadius: 24, padding: "clamp(24px,4vw,36px)", boxShadow: theme.shadow }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {status && <div style={{ color: status.includes("sent") ? theme.deepGreen : theme.danger, fontSize: 14 }}>{status}</div>}
            <Input label="Name *" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Your name" />
            <Input label="Email *" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="your@email.com" />
            <Input label="Message *" value={form.message} onChange={(v) => setForm((f) => ({ ...f, message: v }))} placeholder="Tell me about your pup or ask anything..." multiline />
            <button
              onClick={submit}
              disabled={submitting}
              style={{
                background: theme.green,
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: 50,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                fontSize: 15,
              }}
            >
              {submitting ? <span className="spinner" /> : (
                <>
                  <Icons.Send size={16} color="white" /> Send Message
                </>
              )}
            </button>
          </div>
        </div>

        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          <a href="mailto:hello@willswalks.co.uk" style={{ display: "flex", alignItems: "center", gap: 12, color: theme.text, textDecoration: "none", fontSize: 15 }}>
            <Icons.Mail size={18} color={theme.green} /> hello@willswalks.co.uk
          </a>
          <a href="https://wa.me/44XXXXXXXXXX" style={{ display: "flex", alignItems: "center", gap: 12, color: theme.text, textDecoration: "none", fontSize: 15 }}>
            <Icons.Phone size={18} color={theme.green} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
