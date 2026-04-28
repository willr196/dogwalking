import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";
import { PageShell } from "@/components/PageShell";
import { SidebarCTA } from "@/components/SidebarCTA";
import { Icons } from "@/components/willswalks/Icons";

export const metadata: Metadata = {
  title: `Dog Walking Areas in Fulham & SW6 | ${siteConfig.brandName}`,
  description: `${siteConfig.brandName} covers Fulham, Parsons Green, Walham Green, Sands End, Bishop's Park, and Hurlingham. Solo and small-group walks from £${siteConfig.pricing.introPrice}.`,
  alternates: { canonical: `${siteConfig.siteUrl}/areas` },
};

export default function AreasPage() {
  return (
    <PageLayout>
      <Section className="px-0">
        <PageShell sidebar={<SidebarCTA />}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Areas" }]} />

          <h1 className="ww-serif mb-4 text-[clamp(2.05rem,4.2vw,3.1rem)] leading-tight">Areas I Cover</h1>
          <p className="mb-10 max-w-[680px] text-lg leading-relaxed text-[var(--muted)]">
            Fulham-first coverage across SW6 and nearby streets. Each area has slightly different routes,
            park options, and walk rhythms.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.areasServed.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="ww-card group block p-5 no-underline"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(15,141,135,0.14)] text-[var(--deep-green)]">
                  <Icons.MapPin size={17} />
                </div>
                <h2 className="ww-serif text-[1.25rem] leading-tight text-[var(--text)]">{area.name}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">Dog walking in {area.name}, {area.postcode}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--deep-green)] transition-transform group-hover:translate-x-0.5">
                  View details
                  <Icons.ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-[var(--line)] bg-white p-7 text-center md:p-8">
            <h2 className="ww-serif text-[1.6rem] leading-tight">Not sure if I cover your area?</h2>
            <p className="mx-auto mt-2 max-w-[560px] leading-relaxed text-[var(--muted)]">
              If you&apos;re near SW6 but don&apos;t see your exact neighbourhood listed, send a message and I&apos;ll
              confirm whether regular routes are possible.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-7 py-3 text-sm font-semibold text-white no-underline"
            >
              Get in Touch
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/services" className="text-sm font-semibold text-[var(--deep-green)] no-underline">
              Our Services →
            </Link>
            <Link href="/pricing" className="text-sm font-semibold text-[var(--deep-green)] no-underline">
              Pricing →
            </Link>
          </div>
        </PageShell>
      </Section>
    </PageLayout>
  );
}
