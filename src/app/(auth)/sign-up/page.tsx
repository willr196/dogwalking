"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Could not create account.");
      return;
    }

    // ✅ Show verification message instead of auto-login
    if (data.requiresVerification) {
      setVerificationSent(true);
      return;
    }
  };

  if (verificationSent) {
    return (
      <div className="min-h-screen px-5 pt-[120px] pb-[60px] bg-ww-cream">
        <div className="max-w-[420px] mx-auto">
          <div className="bg-ww-warm-white rounded-3xl p-8 shadow-ww text-center">
            <div className="text-5xl mb-4">📧</div>
            <h1 className="ww-serif text-[1.9rem] mb-2">Check Your Email</h1>
            <p className="text-ww-muted mb-6 leading-relaxed">
              We've sent a verification link to <strong className="text-ww-text">{email}</strong>.
              Click the link to activate your account.
            </p>
            <p className="text-ww-muted text-sm mb-6">
              The link expires in 24 hours. Check your spam folder if you don't see it.
            </p>
            <Link
              href="/sign-in"
              className="inline-block bg-ww-green text-white border-none px-7 py-3.5 rounded-full font-semibold cursor-pointer font-sans no-underline hover:bg-ww-deep-green transition-colors"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 pt-[120px] pb-[60px] bg-ww-cream">
      <div className="max-w-[420px] mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-ww-muted no-underline mb-6 hover:text-ww-deep-green transition-colors"
        >
          <Icons.ArrowLeft size={18} /> Home
        </Link>
        <div className="bg-ww-warm-white rounded-3xl p-8 shadow-ww">
          <h1 className="ww-serif text-[1.9rem] mb-2">Create Account</h1>
          <p className="text-ww-muted mb-6">
            Book walks, leave reviews, and manage appointments.
          </p>

          {error && (
            <div className="bg-ww-danger/10 text-ww-danger px-3 py-2.5 rounded-[10px] mb-3.5 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="ww-input"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="ww-input"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 8 chars)"
              className="ww-input"
            />
            <button
              onClick={submit}
              disabled={loading}
              className="bg-ww-green text-white border-none px-4.5 py-3.5 rounded-full font-semibold cursor-pointer font-sans flex items-center justify-center gap-2 hover:bg-ww-deep-green transition-colors disabled:opacity-50"
            >
              {loading ? <span className="spinner" /> : "Create Account"}
            </button>
          </div>

          <p className="mt-4.5 text-ww-muted text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-ww-deep-green font-semibold no-underline hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}