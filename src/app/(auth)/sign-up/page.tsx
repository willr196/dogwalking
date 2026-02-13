"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"owner" | "walker">("owner");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          accountType,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Could not create account.");
        return;
      }

      const params = new URLSearchParams({
        registered: "true",
      });
      if (accountType === "walker") {
        params.set("accountType", "walker");
      }
      router.push(`/sign-in?${params.toString()}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-5 pt-[120px] pb-[60px] bg-[var(--cream)]">
      <div className="max-w-[420px] mx-auto">
        <Link href="/" className="flex items-center gap-2 text-[var(--muted)] mb-6 no-underline hover:text-[var(--deep-green)] transition-colors">
          <Icons.ArrowLeft size={18} /> Home
        </Link>

        <div className="bg-[var(--warm-white)] rounded-3xl p-8 shadow-[var(--shadow)]">
          <h1 className="ww-serif text-[1.9rem] mb-2">Create Account</h1>
          <p className="text-[var(--muted)] mb-6">
            Choose the account type that fits what you need.
          </p>

          {error && (
            <div className="bg-[rgba(217,83,79,0.08)] text-[var(--danger)] px-4 py-3 rounded-2xl text-sm mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-[var(--text)]">
              Account Type
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAccountType("owner")}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  accountType === "owner"
                    ? "bg-[var(--green)] text-white border-[var(--green)]"
                    : "bg-white text-[var(--text)] border-[var(--green)]/20 hover:border-[var(--green)]/45"
                }`}
              >
                Dog Owner
              </button>
              <button
                type="button"
                onClick={() => setAccountType("walker")}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  accountType === "walker"
                    ? "bg-[var(--deep-green)] text-white border-[var(--deep-green)]"
                    : "bg-white text-[var(--text)] border-[var(--green)]/20 hover:border-[var(--green)]/45"
                }`}
              >
                Walker
              </button>
            </div>
            <p className="text-xs text-[var(--muted)] mt-2">
              {accountType === "walker"
                ? "You will be registered as a walker account."
                : "You will be registered as a standard customer account."}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text)]">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-2xl border-2 border-[var(--light)] bg-[var(--cream)] text-[var(--text)] text-sm transition-colors duration-200 focus:border-[var(--green)] focus:outline-none"
                autoComplete="name"
              />
            </div>
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
                placeholder="Minimum 8 characters"
                className="w-full px-4 py-3 rounded-2xl border-2 border-[var(--light)] bg-[var(--cream)] text-[var(--text)] text-sm transition-colors duration-200 focus:border-[var(--green)] focus:outline-none"
                autoComplete="new-password"
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
            </div>
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="mt-6 w-full bg-[var(--green)] text-white py-[14px] rounded-full font-semibold text-[15px] transition-all duration-200 hover:bg-[var(--deep-green)] cursor-pointer border-none disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <span className="spinner" /> : "Create Account"}
          </button>

          <p className="text-center text-sm text-[var(--muted)] mt-5">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[var(--green)] font-semibold no-underline hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
