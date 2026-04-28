"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/willswalks/Icons";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/areas", label: "Areas" },
  { href: "/dog-breeds", label: "Dog Breeds" },
  { href: "/reviews", label: "Reviews" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

function linkIsActive(pathname: string, href: string) {
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
    <header className="fixed inset-x-0 top-0 z-[1000] px-3.5 pt-3.5 md:px-5 md:pt-5">
      <nav
        className={`mx-auto flex w-full max-w-[1240px] flex-col rounded-lg border-2 px-3.5 py-3 transition-all duration-300 md:px-5 ${
          scrolled
            ? "border-[rgba(23,98,79,0.16)] bg-[rgba(255,253,247,0.94)] shadow-[0_14px_30px_rgba(76,55,30,0.13)] backdrop-blur-[14px]"
            : "border-[rgba(255,255,255,0.86)] bg-[rgba(255,253,247,0.84)] shadow-[0_10px_24px_rgba(76,55,30,0.09)] backdrop-blur-[14px]"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="group flex items-center gap-3 no-underline">
            <span className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-[linear-gradient(145deg,var(--orange),var(--green))] text-white shadow-[0_8px_0_rgba(36,50,58,0.1)]">
              <span aria-hidden="true" className="absolute inset-[3px] rounded-md border border-white/40" />
              <Icons.Dog size={18} className="relative z-[1]" />
            </span>
            <span className="leading-none">
              <span className="ww-serif block text-[1.18rem] font-semibold text-[var(--text)]">
                <span className="text-[var(--deep-green)]">Will&apos;s</span> Walks
              </span>
              <span className="block pt-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--deep-orange)]">
                Tail-wagging SW6 walks
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1.5 lg:flex">
            {navItems.map((item) => {
              const active = linkIsActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[13px] font-semibold no-underline transition-all ${
                    active
                      ? "border border-[rgba(255,138,91,0.36)] bg-[rgba(255,217,93,0.32)] text-[var(--deep-orange)]"
                      : "border border-transparent text-[var(--text)]/82 hover:border-[rgba(47,159,130,0.22)] hover:bg-[rgba(47,159,130,0.1)] hover:text-[var(--deep-green)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/book" className="ww-btn ww-btn-primary px-4 py-2 text-[12px]">
              <Icons.Calendar size={15} /> Book now
            </Link>
          </div>

          <button
            onClick={() => setMobileMenu((value) => !value)}
            className="inline-flex rounded-lg border-2 border-[var(--line)] bg-[rgba(255,255,255,0.9)] p-2 text-[var(--deep-green)] shadow-[0_8px_18px_rgba(76,55,30,0.08)] lg:hidden"
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
            aria-label="Mobile navigation"
            className="anim-slide-down mt-2.5 flex flex-col gap-1.5 rounded-lg border-2 border-[var(--line)] bg-[rgba(255,253,247,0.98)] p-2.5 shadow-[0_14px_28px_rgba(76,55,30,0.1)]"
          >
            {navItems.map((item) => {
              const active = linkIsActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-xl px-3 py-2.5 text-[15px] font-semibold no-underline transition-colors ${
                    active
                      ? "bg-[rgba(255,217,93,0.32)] text-[var(--deep-orange)]"
                      : "text-[var(--text)] hover:bg-[rgba(47,159,130,0.1)] hover:text-[var(--deep-green)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/book"
              className="ww-btn ww-btn-primary mt-1 w-full px-5 py-2.5 text-sm"
            >
              <Icons.Calendar size={16} /> Book now
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
