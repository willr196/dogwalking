"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/willswalks/Icons";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="min-h-screen px-5 pt-[120px] pb-[60px] bg-[var(--cream)]">
      <div className="max-w-[420px] mx-auto">
        <Link href="/" className="flex items-center gap-2 text-[var(--muted)] mb-6 no-underline hover:text-[var(--deep-green)] transition-colors">
          <Icons.ArrowLeft size={18} /> Home
        </Link>

        <div className="bg-[var(--warm-white)] rounded-3xl p-8 shadow-[var(--shadow)]">
          <h1 className="ww-serif text-[1.9rem] mb-2">Welcome Back</h1>
          <p className="text-[var(--muted)] mb-6">Sign in to book walks and leave reviews.</p>

          {error && (
            <div className="bg-[rgba(217,83,79,0.08)] text-[var(--danger)] px-4 py-3 rounded-2xl text-sm mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text)]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-2xl border-2 border-[var(--light)] bg-[var(--cream)] text-[var(--text)] text-sm transition-colors duration-200 focus:border-[var(--green)] focus:outline-none"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text)]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-2xl border-2 border-[var(--light)] bg-[var(--cream)] text-[var(--text)] text-sm transition-colors duration-200 focus:border-[var(--green)] focus:outline-none"
                autoComplete="current-password"
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
            </div>
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="mt-6 w-full bg-[var(--green)] text-white py-[14px] rounded-full font-semibold text-[15px] transition-all duration-200 hover:bg-[var(--deep-green)] cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <span className="spinner" /> : "Sign In"}
          </button>

          <p className="text-center text-sm text-[var(--muted)] mt-5">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-[var(--green)] font-semibold no-underline hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
