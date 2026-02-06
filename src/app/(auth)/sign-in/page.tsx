"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/willswalks/Icons";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    searchParams.get("error") || null
  );

  const verified = searchParams.get("verified") === "true";

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
    <div className="min-h-screen px-5 pt-[120px] pb-[60px] bg-ww-cream">
      <div className="max-w-[420px] mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-ww-muted no-underline mb-6 hover:text-ww-deep-green transition-colors"
        >
          <Icons.ArrowLeft size={18} /> Home
        </Link>
        <div className="bg-ww-warm-white rounded-3xl p-8 shadow-ww">
          <h1 className="ww-serif text-[1.9rem] mb-2">Welcome Back</h1>
          <p className="text-ww-muted mb-6">Sign in to book walks and leave reviews.</p>

          {/* ✅ Email verification success banner */}
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
              className="bg-ww-green text-white border-none px-4.5 py-3.5 rounded-full font-semibold cursor-pointer font-sans flex items-center justify-center gap-2 hover:bg-ww-deep-green transition-colors disabled:opacity-50"
            >
              {loading ? <span className="spinner" /> : "Sign In"}
            </button>
          </div>

          <p className="mt-4.5 text-ww-muted text-sm">
            No account yet?{" "}
            <Link href="/sign-up" className="text-ww-deep-green font-semibold no-underline hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}