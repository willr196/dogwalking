"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/willswalks/Icons";

export function SignInClient({
  initialError,
  verified,
}: {
  initialError?: string | null;
  verified?: boolean;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError || null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/");
  };

  return (
    <div className="ww-page">
      <div className="ww-container">
        <Link href="/" className="ww-btn ww-btn-ghost text-sm mb-6">
          <Icons.ArrowLeft size={18} /> Home
        </Link>
        <div className="ww-card p-8">
          <div className="ww-kicker mb-3">Account</div>
          <h1 className="ww-serif ww-title mb-2">Welcome Back</h1>
          <p className="ww-lede mb-6 text-left">
            Sign in to book walks and leave reviews.
          </p>

          {verified && (
            <div className="bg-ww-green/10 text-ww-deep-green px-3 py-2.5 rounded-[10px] mb-3.5 text-sm font-medium">
              ✅ Email verified successfully! You can now sign in.
            </div>
          )}

          {error && (
            <div className="bg-ww-danger/10 text-ww-danger px-3 py-2.5 rounded-[10px] mb-3.5 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
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
              placeholder="Password"
              className="ww-input"
            />
            <button
              onClick={submit}
              disabled={loading}
              className="ww-btn ww-btn-primary w-full disabled:opacity-50"
            >
              {loading ? <span className="spinner" /> : "Sign In"}
            </button>
          </div>

          <p className="mt-4.5 text-ww-muted text-sm">
            No account yet?{" "}
            <Link
              href="/sign-up"
              className="text-ww-deep-green font-semibold no-underline hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
