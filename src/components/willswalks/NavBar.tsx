"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";
import { theme } from "@/components/willswalks/theme";

export function NavBar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "12px 20px",
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(253,248,243,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? theme.shadow : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: theme.deepGreen,
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          🐾 Will's Walks
        </Link>

        <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
          <a href="/#services" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 500, color: theme.text, fontFamily: "'Outfit', sans-serif", textDecoration: "none" }}>
            Services
          </a>
          <a href="/#about" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 500, color: theme.text, fontFamily: "'Outfit', sans-serif", textDecoration: "none" }}>
            About
          </a>
          <Link href="/reviews" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 500, color: theme.text, fontFamily: "'Outfit', sans-serif", textDecoration: "none" }}>
            Reviews
          </Link>
          <Link
            href="/booking"
            style={{
              background: theme.green,
              color: "white",
              border: "none",
              padding: "10px 24px",
              borderRadius: 50,
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
              transition: "all 0.2s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.deepGreen;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.green;
              e.currentTarget.style.transform = "none";
            }}
          >
            Book a Walk
          </Link>
          <Link
            href="/admin"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              opacity: 0.4,
              display: "flex",
              alignItems: "center",
              padding: 4,
            }}
            title="Admin"
          >
            <Icons.Settings size={18} />
          </Link>
        </div>

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
          }}
          className="mobile-menu-btn"
        >
          {mobileMenu ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
        </button>
      </div>

      {mobileMenu && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(253,248,243,0.98)",
            backdropFilter: "blur(20px)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            boxShadow: theme.shadowLg,
          }}
        >
          <a href="/#services" onClick={() => setMobileMenu(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 17, fontWeight: 500, color: theme.text, textAlign: "left", padding: "8px 0", fontFamily: "'Outfit', sans-serif", textDecoration: "none" }}>
            Services
          </a>
          <a href="/#about" onClick={() => setMobileMenu(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 17, fontWeight: 500, color: theme.text, textAlign: "left", padding: "8px 0", fontFamily: "'Outfit', sans-serif", textDecoration: "none" }}>
            About
          </a>
          <Link href="/reviews" onClick={() => setMobileMenu(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 17, fontWeight: 500, color: theme.text, textAlign: "left", padding: "8px 0", fontFamily: "'Outfit', sans-serif", textDecoration: "none" }}>
            Reviews
          </Link>
          <Link href="/booking" onClick={() => setMobileMenu(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 17, fontWeight: 500, color: theme.text, textAlign: "left", padding: "8px 0", fontFamily: "'Outfit', sans-serif", textDecoration: "none" }}>
            Book a Walk
          </Link>
          <Link href="/admin" onClick={() => setMobileMenu(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 17, fontWeight: 500, color: theme.text, textAlign: "left", padding: "8px 0", fontFamily: "'Outfit', sans-serif", textDecoration: "none" }}>
            Admin
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
