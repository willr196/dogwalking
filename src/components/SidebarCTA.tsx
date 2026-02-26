import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export function SidebarCTA() {
  return (
    <div className="ww-card p-6 md:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--deep-green)]/82">
        Meet &amp; Greet
      </p>
      <h2 className="ww-serif mt-2 text-[1.55rem] leading-tight text-[var(--text)]">
        Build your dog&apos;s weekly walk routine
      </h2>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-[rgba(15,141,135,0.32)] bg-[rgba(15,141,135,0.12)] px-3 py-1 text-xs font-semibold text-[var(--deep-green)]">
          £{siteConfig.pricing.introPrice} / {siteConfig.pricing.walkDuration} mins
        </span>
        <span className="inline-flex items-center rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-medium text-[var(--muted)]">
          Fulham / SW6
        </span>
      </div>

      <ul className="mt-5 space-y-2.5 text-sm text-[var(--muted)]">
        <li className="flex items-start gap-2">
          <span className="mt-0.5 text-[var(--green)]">●</span>
          <span>Structured walk plans</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-0.5 text-[var(--green)]">●</span>
          <span>Updates after every session</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-0.5 text-[var(--green)]">●</span>
          <span>24-hour schedule changes</span>
        </li>
      </ul>

      <Link
        href="/booking"
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-6 py-3 text-sm font-semibold text-white no-underline shadow-[0_10px_22px_rgba(14,68,94,0.3)] transition-all hover:-translate-y-0.5"
      >
        Book a Meet &amp; Greet
      </Link>
    </div>
  );
}
