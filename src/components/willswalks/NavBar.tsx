"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";

export function NavBar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMobileMenu(false), []);

  const navLinkClasses = "text-[15px] font-medium text-[var(--text)] no-underline transition-colors duration-200 hover:text-[var(--deep-green)]";
  const mobileNavLinkClasses = "text-[17px] font-medium text-[var(--text)] text-left py-2 no-underline transition-colors duration-200 hover:text-[var(--deep-green)]";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] px-5 py-3 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(253,248,243,0.92)] backdrop-blur-[16px] shadow-[var(--shadow)]"
          : "bg-transparent backdrop-blur-none shadow-none"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1100px] mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="ww-serif text-[1.4rem] font-bold text-[var(--deep-green)] flex items-center gap-2 no-underline"
        >
          🐾 Will&apos;s Walks
        </Link>

        {/* Desktop Navigation */}
        <div className="flex gap-7 items-center desktop-nav">
          <Link href="/#services" className={navLinkClasses}>Services</Link>
          <Link href="/#about" className={navLinkClasses}>About</Link>
          <Link href="/reviews" className={navLinkClasses}>Reviews</Link>
          <Link
            href="/booking"
            className="bg-[var(--green)] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-[var(--deep-green)] hover:-translate-y-0.5 no-underline"
          >
            Book a Walk
          </Link>
          <Link
            href="/admin"
            className="opacity-40 flex items-center p-1 transition-opacity duration-200 hover:opacity-70"
            title="Admin"
            aria-label="Admin dashboard"
          >
            <Icons.Settings size={18} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="hidden mobile-menu-btn bg-transparent border-none cursor-pointer p-1"
          aria-expanded={mobileMenu}
          aria-controls="mobile-menu"
          aria-label={mobileMenu ? "Close menu" : "Open menu"}
        >
          {mobileMenu ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 right-0 bg-[rgba(253,248,243,0.98)] backdrop-blur-[20px] p-6 flex flex-col gap-4 shadow-[var(--shadow-lg)] anim-fade-in"
          role="menu"
        >
          <Link href="/#services" onClick={closeMenu} className={mobileNavLinkClasses} role="menuitem">Services</Link>
          <Link href="/#about" onClick={closeMenu} className={mobileNavLinkClasses} role="menuitem">About</Link>
          <Link href="/reviews" onClick={closeMenu} className={mobileNavLinkClasses} role="menuitem">Reviews</Link>
          <Link href="/booking" onClick={closeMenu} className={mobileNavLinkClasses} role="menuitem">Book a Walk</Link>
          <Link href="/admin" onClick={closeMenu} className={mobileNavLinkClasses} role="menuitem">Admin</Link>
        </div>
      )}
    </nav>
  );
}
