import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";
import { PageShell } from "@/components/PageShell";
import { SidebarCTA } from "@/components/SidebarCTA";

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
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Areas" }]}
          />

          <h1 className="ww-serif text-[clamp(2rem,4vw,3rem)] leading-tight mb-4">
            Areas I Cover
          </h1>
          <p className="text-[var(--muted)] text-lg leading-relaxed max-w-[600px] mb-10">
            Based in Fulham, I walk dogs across SW6 and the surrounding
            neighbourhoods. Each area has its own character, parks, and walking
            routes.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {siteConfig.areasServed.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group bg-white rounded-2xl border border-[var(--green)]/10 p-6 hover:shadow-lg hover:border-[var(--green)]/25 transition-all"
              >
                <div className="text-2xl mb-3">📍</div>
                <h2 className="ww-serif text-lg font-semibold mb-1 group-hover:text-[var(--deep-green)] transition-colors">
                  {area.name}
                </h2>
                <p className="text-sm text-[var(--muted)] mb-3">
                  Dog walking in {area.name}, {area.postcode}
                </p>
                <span className="text-sm text-[var(--green)] font-medium group-hover:translate-x-1 inline-block transition-transform">
                  View details →
                </span>
              </Link>
            ))}
          </div>

          <div className="bg-[var(--cream)] rounded-2xl p-8 text-center mb-10">
            <h2 className="ww-serif text-xl font-semibold mb-3">
              Not sure if I cover your area?
            </h2>
            <p className="text-[var(--muted)] mb-5 max-w-md mx-auto">
              If you&apos;re near SW6 but don&apos;t see your neighbourhood listed, get
              in touch, I may still be able to help.
            </p>
            <Link
              href="/contact"
              className="inline-flex bg-[var(--green)] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              Get in Touch
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/services"
              className="text-sm text-[var(--green)] font-medium hover:underline"
            >
              Our Services →
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-[var(--green)] font-medium hover:underline"
            >
              Pricing →
            </Link>
          </div>
        </PageShell>
      </Section>
    </PageLayout>
  );
}
