import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export function SidebarCTA() {
  return (
    <div className="bg-white rounded-2xl border border-[var(--green)]/10 p-6 shadow-sm">
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--deep-green)]">
        Bookings
      </p>
      <h2 className="ww-serif text-xl font-semibold leading-tight mt-2">
        Book a Meet &amp; Greet
      </h2>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-[var(--green)]/10 text-[var(--deep-green)] px-3 py-1 text-xs font-semibold">
          £{siteConfig.pricing.introPrice} / {siteConfig.pricing.walkDuration} mins
        </span>
        <span className="inline-flex items-center rounded-full bg-[var(--cream)] text-[var(--muted)] px-3 py-1 text-xs font-medium">
          Fulham / SW6
        </span>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
        <li className="flex items-start gap-2">
          <span className="text-[var(--green)] mt-0.5">✓</span>
          <span>Max {siteConfig.pricing.maxDogsPerWalk} dogs</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[var(--green)] mt-0.5">✓</span>
          <span>Photo updates</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[var(--green)] mt-0.5">✓</span>
          <span>24h changes</span>
        </li>
      </ul>

      <Link
        href="/booking"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[var(--green)] text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
      >
        Book a Meet &amp; Greet
      </Link>
    </div>
  );
}

