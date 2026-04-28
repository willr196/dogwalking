import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Icons } from "@/components/willswalks/Icons";

export function SidebarCTA() {
  return (
    <div className="ww-card p-6 md:p-7">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--deep-orange)]">
        Meet &amp; Greet
      </p>
      <h2 className="ww-serif mt-2 text-[1.55rem] leading-tight text-[var(--text)]">
        Build your dog&apos;s weekly walkies routine
      </h2>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-[rgba(47,159,130,0.28)] bg-[rgba(47,159,130,0.12)] px-3 py-1 text-xs font-extrabold text-[var(--deep-green)]">
          £{siteConfig.pricing.introPrice} / {siteConfig.pricing.walkDuration} mins
        </span>
        <span className="inline-flex items-center rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-bold text-[var(--muted)]">
          Fulham / SW6
        </span>
      </div>

      <ul className="mt-5 space-y-2.5 text-sm text-[var(--muted)]">
        <li className="flex items-start gap-2">
          <Icons.Check size={16} className="mt-0.5 shrink-0 text-[var(--green)]" />
          <span>Structured walk plans</span>
        </li>
        <li className="flex items-start gap-2">
          <Icons.Camera size={16} className="mt-0.5 shrink-0 text-[var(--green)]" />
          <span>Updates after every session</span>
        </li>
        <li className="flex items-start gap-2">
          <Icons.Clock size={16} className="mt-0.5 shrink-0 text-[var(--green)]" />
          <span>24-hour schedule changes</span>
        </li>
      </ul>

      <Link
        href="/book"
        className="ww-btn ww-btn-primary mt-6 w-full px-6 py-3 text-sm"
      >
        <Icons.Calendar size={16} /> Book a Meet &amp; Greet
      </Link>
    </div>
  );
}
