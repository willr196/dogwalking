"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";
import { WALK_PRICE } from "@/components/willswalks/constants";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
];

export function NavBar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!mobileMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenu(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  const handleNavClick = useCallback(() => {
    setMobileMenu(false);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] px-5 py-3 transition-all duration-300 ${
        scrolled
          ? "bg-ww-cream/95 backdrop-blur-2xl shadow-ww"
          : "bg-transparent backdrop-blur-none shadow-none"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="ww-container flex justify-between items-center">
        <Link
          href="/"
          className="font-serif text-[1.4rem] font-bold text-ww-deep-green flex items-center gap-2 no-underline"
        >
          🐾 Will&apos;s Walks
        </Link>

        <div className="flex gap-7 items-center desktop-nav">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("/#") ? (
              <a
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-ww-text font-sans no-underline hover:text-ww-deep-green transition-colors duration-200"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] font-medium text-ww-text font-sans no-underline hover:text-ww-deep-green transition-colors duration-200"
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/booking"
            className="ww-btn ww-btn-primary text-sm px-6 py-2.5"
          >
            Book a Walk — £{WALK_PRICE}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="hidden max-[768px]:flex items-center justify-center bg-transparent border-none cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-ww-green/10"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenu}
          aria-controls="mobile-menu"
        >
          <span
            className="transition-transform duration-250"
            style={{ transform: mobileMenu ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            {mobileMenu ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`hidden max-[768px]:block overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenu ? "max-h-[400px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}
        aria-hidden={!mobileMenu}
      >
        <div className="flex flex-col gap-1 p-5 bg-ww-warm-white rounded-2xl shadow-ww-lg">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("/#") ? (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-[15px] font-medium text-ww-text font-sans no-underline py-3 px-3 rounded-xl hover:bg-ww-green/8 transition-colors duration-200"
                tabIndex={mobileMenu ? 0 : -1}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-[15px] font-medium text-ww-text font-sans no-underline py-3 px-3 rounded-xl hover:bg-ww-green/8 transition-colors duration-200"
                tabIndex={mobileMenu ? 0 : -1}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/booking"
            onClick={handleNavClick}
            className="ww-btn ww-btn-primary text-sm px-6 py-3.5 mt-2 text-center"
            tabIndex={mobileMenu ? 0 : -1}
          >
            Book a Walk — £{WALK_PRICE}
          </Link>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 hidden max-[768px]:block"
          onClick={() => setMobileMenu(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
