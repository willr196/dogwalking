"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";

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
      className={`fixed top-0 left-0 right-0 z-[1000] px-5 py-3 transition-all duration-300 ${
        scrolled
          ? "bg-ww-cream/92 backdrop-blur-2xl shadow-ww"
          : "bg-transparent backdrop-blur-none shadow-none"
      }`}
    >
      <div className="max-w-[1100px] mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="font-serif text-[1.4rem] font-bold text-ww-deep-green flex items-center gap-2 no-underline"
        >
          🐾 Will&apos;s Walks
        </Link>

        <div className="flex gap-7 items-center desktop-nav">
          <a
            href="/#services"
            className="text-[15px] font-medium text-ww-text font-sans no-underline hover:text-ww-deep-green transition-colors"
          >
            Services
          </a>
          <a
            href="/#about"
            className="text-[15px] font-medium text-ww-text font-sans no-underline hover:text-ww-deep-green transition-colors"
          >
            About
          </a>
          <Link
            href="/reviews"
            className="text-[15px] font-medium text-ww-text font-sans no-underline hover:text-ww-deep-green transition-colors"
          >
            Reviews
          </Link>
          <Link
            href="/booking"
            className="bg-ww-green text-white px-6 py-2.5 rounded-full font-semibold text-sm font-sans no-underline hover:bg-ww-deep-green transition-colors"
          >
            Book a Walk
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="hidden max-[768px]:block bg-transparent border-none cursor-pointer p-1"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
        >
          {mobileMenu ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="hidden max-[768px]:flex flex-col gap-4 mt-4 p-5 bg-ww-warm-white rounded-2xl shadow-ww-lg anim-fade-in">
          <a
            href="/#services"
            onClick={() => setMobileMenu(false)}
            className="text-[15px] font-medium text-ww-text font-sans no-underline py-2"
          >
            Services
          </a>
          <a
            href="/#about"
            onClick={() => setMobileMenu(false)}
            className="text-[15px] font-medium text-ww-text font-sans no-underline py-2"
          >
            About
          </a>
          <Link
            href="/reviews"
            onClick={() => setMobileMenu(false)}
            className="text-[15px] font-medium text-ww-text font-sans no-underline py-2"
          >
            Reviews
          </Link>
          <Link
            href="/booking"
            onClick={() => setMobileMenu(false)}
            className="bg-ww-green text-white px-6 py-3 rounded-full font-semibold text-sm font-sans no-underline text-center hover:bg-ww-deep-green transition-colors"
          >
            Book a Walk
          </Link>
        </div>
      )}
    </nav>
  );
}
