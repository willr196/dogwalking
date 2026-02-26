import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export function Footer() {
  const quickLinks = [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="px-5 py-12 md:py-14">
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="rounded-[30px] border border-[var(--line)] bg-[linear-gradient(155deg,rgba(255,255,255,0.93),rgba(244,250,247,0.82))] px-6 py-8 shadow-[0_18px_44px_rgba(11,34,50,0.1)] md:px-8 md:py-9">
          <div className="grid gap-7 md:grid-cols-[1.2fr_0.9fr_1fr] md:items-start">
            <div>
              <p className="ww-serif text-[1.72rem] leading-none tracking-[-0.02em] text-[var(--deep-green)]">
                Will&apos;s Walks
              </p>
              <p className="mt-2.5 max-w-[38ch] text-sm text-[var(--muted)]">
                Calm, personal dog walking for Fulham and SW6 with a small regular client list.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <span className="home-chip">Max 3 dogs</span>
                <span className="home-chip">Photo updates</span>
                <span className="home-chip">Meet &amp; greet first</span>
              </div>
            </div>

            <nav aria-label="Footer" className="grid content-start gap-2 text-sm">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex w-fit rounded-full px-2 py-1 font-semibold text-[var(--text)] no-underline transition-colors hover:text-[var(--deep-green)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="md:justify-self-end">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Contact</p>
              <Link
                href={`mailto:${siteConfig.owner.email}`}
                className="mt-1.5 inline-flex text-sm font-semibold text-[var(--deep-green)] no-underline hover:text-[var(--green)]"
              >
                {siteConfig.owner.email}
              </Link>
              <div className="mt-4">
                <Link href="/booking" className="ww-btn ww-btn-primary px-4 py-2 text-[12px]">
                  Book meet &amp; greet
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-7 border-t border-[var(--line)] pt-4 text-xs text-[var(--light)]">
            © {new Date().getFullYear()} {siteConfig.brandName}
          </p>
        </div>
      </div>
    </footer>
  );
}
