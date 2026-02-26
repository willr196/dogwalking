"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/willswalks/Icons";

const navItems = [
  { href: "/#services", label: "Services" },
  { href: "/walkers", label: "Find a Walker" },
  { href: "/dog-breeds", label: "Dog Breeds" },
  { href: "/#about", label: "About" },
  { href: "/reviews", label: "Reviews" },
];

function linkIsActive(pathname: string, href: string) {
  if (href.startsWith("/#")) {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavBar() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenu) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenu(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenu]);

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] px-3 pt-3 md:px-5">
      <nav
        className={`mx-auto flex w-full max-w-[1240px] flex-col rounded-[22px] border px-3 py-2.5 transition-all duration-250 md:px-4 ${
          scrolled
            ? "border-[var(--line)] bg-[rgba(255,255,255,0.93)] shadow-[var(--shadow-soft)] backdrop-blur-[10px]"
            : "border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.76)] backdrop-blur-[12px]"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(140deg,var(--green),var(--deep-green))] text-white shadow-[0_8px_16px_rgba(17,62,86,0.32)]">
              <Icons.Dog size={16} />
            </span>
            <span className="leading-none">
              <span className="ww-serif block text-[1.08rem] font-semibold tracking-[-0.015em] text-[var(--deep-green)]">
                Will&apos;s Walks
              </span>
              <span className="block pt-0.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-[var(--muted)]">
                Fulham SW6
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1.5 md:flex">
            {navItems.map((item) => {
              const active = linkIsActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3.5 py-2 text-[13px] font-semibold no-underline transition-colors ${
                    active
                      ? "bg-[rgba(15,141,135,0.14)] text-[var(--deep-green)]"
                      : "text-[var(--text)]/84 hover:bg-[rgba(15,141,135,0.08)] hover:text-[var(--deep-green)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/booking"
              className="ml-1 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-5 py-2.5 text-[13px] font-bold text-white no-underline shadow-[0_10px_20px_rgba(14,68,94,0.3)] transition-all hover:-translate-y-0.5"
            >
              Book a Walk
              <Icons.ArrowRight size={14} color="white" />
            </Link>

            <Link
              href="/admin"
              className="ml-0.5 rounded-xl p-2 text-[var(--muted)] transition-colors hover:bg-[rgba(15,141,135,0.08)] hover:text-[var(--deep-green)]"
              title="Admin"
              aria-label="Admin dashboard"
            >
              <Icons.Settings size={17} />
            </Link>
          </div>

          <button
            onClick={() => setMobileMenu((value) => !value)}
            className="inline-flex rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.86)] p-2 text-[var(--deep-green)] md:hidden"
            aria-expanded={mobileMenu}
            aria-controls="mobile-menu"
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
          >
            {mobileMenu ? <Icons.X size={23} /> : <Icons.Menu size={23} />}
          </button>
        </div>

        {mobileMenu ? (
          <div
            id="mobile-menu"
            className="anim-slide-down mt-2 flex flex-col gap-1.5 rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.95)] p-2.5"
            role="menu"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2.5 text-[15px] font-semibold text-[var(--text)] no-underline transition-colors hover:bg-[rgba(15,141,135,0.1)] hover:text-[var(--deep-green)]"
                role="menuitem"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/booking"
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-5 py-3 text-[14px] font-semibold text-white no-underline"
              role="menuitem"
            >
              Book a Walk
              <Icons.ArrowRight size={15} color="white" />
            </Link>

            <Link
              href="/admin"
              className="rounded-xl px-3 py-2.5 text-[15px] font-semibold text-[var(--muted)] no-underline hover:bg-[rgba(15,141,135,0.1)] hover:text-[var(--deep-green)]"
              role="menuitem"
            >
              Admin
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
