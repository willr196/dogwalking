"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { Icons } from "@/components/willswalks/Icons";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/dog-breeds", label: "Dog Breeds" },
  { href: "/reviews", label: "Reviews" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[rgba(245,249,252,0.92)] backdrop-blur">
      <Container className="py-4">
        <nav aria-label="Main navigation" className="flex items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-[14px] bg-[linear-gradient(145deg,#0f766e,#1e293b)] text-white shadow-[0_9px_20px_rgba(15,23,42,0.24)]">
              <span
                aria-hidden="true"
                className="absolute inset-[1px] rounded-[13px] border border-white/30"
              />
              <Icons.Dog size={16} className="relative z-[1]" />
            </span>
            <span className="leading-none">
              <span className="ww-serif block text-[1.15rem] font-semibold tracking-[-0.02em] text-slate-900">
                <span className="text-teal-700">Will</span> Walk
              </span>
              <span className="block pt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Dog walks - SW6
              </span>
            </span>
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="main-menu"
            onClick={() => setOpen((value) => !value)}
            className="rounded-xl border border-slate-300/85 bg-white/92 px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-[0_6px_18px_rgba(15,23,42,0.08)] md:hidden"
          >
            Menu
          </button>

          <div className="hidden items-center gap-2.5 md:flex">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "border-emerald-300/80 bg-emerald-100/80 text-emerald-900"
                      : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/book" className="btn-primary text-sm">
              Book now
            </Link>
          </div>
        </nav>

        {open ? (
          <div
            id="main-menu"
            className="mt-4 grid gap-2 rounded-2xl border border-slate-200 bg-white/92 p-3 shadow-[0_14px_30px_rgba(15,23,42,0.12)] md:hidden"
          >
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    active
                      ? "bg-emerald-100/80 text-emerald-900"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/book" onClick={() => setOpen(false)} className="btn-primary mt-1 w-fit text-sm">
              Book now
            </Link>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
