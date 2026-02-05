"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/willswalks/Icons";
import { theme } from "@/components/willswalks/theme";

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
    <div style={{ minHeight: "100vh", padding: "120px 20px 60px", background: theme.cream }}>
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: theme.muted, textDecoration: "none", marginBottom: 24 }}>
          <Icons.ArrowLeft size={18} /> Home
        </Link>
        <div style={{ background: theme.warmWhite, borderRadius: 24, padding: 32, boxShadow: theme.shadow }}>
          <h1 className="ww-serif" style={{ fontSize: "1.9rem", marginBottom: 8 }}>
            Welcome Back
          </h1>
          <p style={{ color: theme.muted, marginBottom: 24 }}>Sign in to book walks and leave reviews.</p>

          {error && (
            <div style={{ background: "rgba(217,83,79,0.12)", color: theme.danger, padding: "10px 12px", borderRadius: 10, marginBottom: 14, fontSize: 14 }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid rgba(107,158,126,0.15)", background: "white", fontSize: 15, fontFamily: "'Outfit', sans-serif", outline: "none" }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid rgba(107,158,126,0.15)", background: "white", fontSize: 15, fontFamily: "'Outfit', sans-serif", outline: "none" }}
            />
            <button
              onClick={submit}
              disabled={loading}
              style={{
                background: theme.green,
                color: "white",
                border: "none",
                padding: "14px 18px",
                borderRadius: 50,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {loading ? <span className="spinner" /> : "Sign In"}
            </button>
          </div>

          <p style={{ marginTop: 18, color: theme.muted, fontSize: 14 }}>
            No account yet?{" "}
            <Link href="/sign-up" style={{ color: theme.deepGreen, fontWeight: 600, textDecoration: "none" }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
