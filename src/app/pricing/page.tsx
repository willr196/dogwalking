import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";
import { PageShell } from "@/components/PageShell";
import { SidebarCTA } from "@/components/SidebarCTA";

export const metadata: Metadata = {
  title: `Dog Walking Prices in Fulham | ${siteConfig.brandName}`,
  description: `Dog walking from £${siteConfig.pricing.introPrice} per walk in Fulham, SW6. Founding client rate available. Solo and small-group walks, ${siteConfig.pricing.walkDuration} minutes.`,
  alternates: { canonical: `${siteConfig.siteUrl}/pricing` },
};

const pricingFaqs = [
  {
    q: "Are there any extra fees?",
    a: "No. The per-walk price includes pick-up, walk time, drop-off, and updates.",
  },
  {
    q: "How long will the founding rate be available?",
    a: "It stays available until the first five regular client spaces are filled.",
  },
  {
    q: "Do larger dogs cost more?",
    a: "No. Pricing is based on the session, not breed size.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Changes with at least 24 hours notice are free. Late cancellations may be charged.",
  },
];

export default function PricingPage() {
  return (
    <PageLayout>
      <Section className="px-0">
        <PageShell sidebar={<SidebarCTA />}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />

          <h1 className="ww-serif mb-4 text-[clamp(2.05rem,4.2vw,3.1rem)] leading-tight">Simple, Honest Pricing</h1>
          <p className="mb-9 max-w-[680px] text-lg leading-relaxed text-[var(--muted)]">
            Clear rates, no hidden add-ons. Every walk is {siteConfig.pricing.walkDuration} minutes with
            update photos and notes included.
          </p>

          <div className="ww-card relative mb-8 overflow-hidden p-7 md:p-9">
            <span className="absolute right-5 top-5 rounded-full bg-[var(--orange)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
              {siteConfig.pricing.introLabel}
            </span>

            <div className="grid gap-6 md:grid-cols-2 md:items-end">
              <div>
                <h2 className="ww-serif text-[1.7rem] leading-tight">Dog Walking</h2>
                <p className="mt-3 max-w-[520px] leading-relaxed text-[var(--muted)]">
                  Solo walks and small-group sessions (max {siteConfig.pricing.maxDogsPerWalk} dogs), each with
                  the same structured approach and communication standards.
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--deep-orange)]">
                  {siteConfig.pricing.introNote}
                </p>
              </div>

              <div className="md:text-right">
                <p className="ww-serif text-[3.3rem] leading-none text-[var(--deep-green)]">£{siteConfig.pricing.introPrice}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">per {siteConfig.pricing.walkDuration}-minute walk</p>
                {siteConfig.pricing.standardPrice > siteConfig.pricing.introPrice ? (
                  <p className="mt-2 text-sm text-[var(--light)] line-through">Standard rate £{siteConfig.pricing.standardPrice}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mb-9 rounded-lg border border-[var(--line)] bg-white p-6 md:p-7">
            <h2 className="ww-serif mb-5 text-[1.45rem] leading-tight">Every Walk Includes</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                `${siteConfig.pricing.walkDuration} minutes of exercise and enrichment`,
                "Photo updates after each walk",
                "Home pick-up and drop-off",
                "Secure lead handling and route planning",
                `Max ${siteConfig.pricing.maxDogsPerWalk} dogs on group walks`,
                "Consistent local routes",
                "Free meet & greet before starting",
                "24-hour cancellation flexibility",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-[var(--text)]">
                  <span className="mt-0.5 text-[var(--green)]">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h2 className="ww-serif mb-4 text-[1.45rem] leading-tight">Pricing FAQ</h2>
            <div className="space-y-3">
              {pricingFaqs.map((faq) => (
                <details key={faq.q} className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface)]">
                    <span>{faq.q}</span>
                    <span className="text-lg text-[var(--light)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm leading-relaxed text-[var(--muted)]">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-[linear-gradient(140deg,var(--orange),var(--deep-green))] p-8 text-white">
            <h2 className="ww-serif text-[1.85rem] leading-tight">Ready to book?</h2>
            <p className="mt-2 max-w-[620px] leading-relaxed text-white/88">
              Start with a free meet &amp; greet so we can set up the right routine for your dog.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[var(--deep-green)] no-underline"
              >
                Book a Meet &amp; Greet
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/36 bg-white/10 px-7 py-3 text-sm font-semibold text-white no-underline"
              >
                View Services
              </Link>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/faq" className="text-sm font-semibold text-[var(--deep-green)] no-underline">
              More FAQ →
            </Link>
            <Link href="/areas" className="text-sm font-semibold text-[var(--deep-green)] no-underline">
              Areas Served →
            </Link>
          </div>
        </PageShell>
      </Section>
    </PageLayout>
  );
}
