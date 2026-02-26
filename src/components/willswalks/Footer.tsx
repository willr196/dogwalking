import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

export function Footer() {
  const quickLinks = [
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/areas", label: "Areas" },
    { href: "/reviews", label: "Reviews" },
    { href: "/booking", label: "Booking" },
  ];

  return (
    <footer className="px-5 pb-8 pt-5">
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="rounded-[30px] border border-[rgba(255,255,255,0.16)] bg-[linear-gradient(155deg,var(--dark-green),var(--deep-green))] p-7 text-white shadow-[var(--shadow-lg)] md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.25fr_0.75fr_0.9fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/66">
                Will&apos;s Walks
              </p>
              <h2 className="ww-serif mt-2 text-[clamp(1.7rem,3vw,2.25rem)] leading-tight text-white">
                Structured dog walks with clear updates and calm handling.
              </h2>
              <p className="mt-3 max-w-[450px] text-[15px] leading-relaxed text-white/78">
                Solo and small-group walks around Fulham for dogs that benefit from consistency,
                safety, and proper one-to-one attention.
              </p>
            </div>

            <div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.13em] text-white/60">
                Explore
              </p>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-[15px]">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/86 no-underline transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.13em] text-white/60">
                Contact
              </p>
              <Link
                href={`mailto:${siteConfig.owner.email}`}
                className="inline-flex rounded-full border border-white/30 bg-white/8 px-4 py-2 text-[14px] font-semibold text-white no-underline transition-colors hover:bg-white/15"
              >
                {siteConfig.owner.email}
              </Link>

              <p className="mt-3 text-sm text-white/74">
                Serving {siteConfig.areasServed.slice(0, 3).map((area) => area.name).join(", ")} and nearby SW6 areas.
              </p>
              <p className="mt-1 text-sm text-white/65">Open seven days, 7:00 to 19:00.</p>
            </div>
          </div>

          <div className="mt-8 border-t border-white/18 pt-4 text-[13px] text-white/68">
            © {new Date().getFullYear()} {siteConfig.brandName}
          </div>
        </div>
      </div>
    </footer>
  );
}
