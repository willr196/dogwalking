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
  title: `Dog Walking Prices in Fulham | ${siteConfig.brandName}`,
  description: `Dog walking from £${siteConfig.pricing.introPrice} per walk in Fulham, SW6. Founding client rate available. Solo and small-group walks, ${siteConfig.pricing.walkDuration} minutes.`,
  alternates: { canonical: `${siteConfig.siteUrl}/pricing` },
};

export default function PricingPage() {
  return (
    <PageLayout>
      <Section className="px-0">
        <PageShell sidebar={<SidebarCTA />}>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
          />

          <h1 className="ww-serif text-[clamp(2rem,4vw,3rem)] leading-tight mb-4">
            Simple, Honest Pricing
          </h1>
          <p className="text-[var(--muted)] text-lg leading-relaxed max-w-[600px] mb-10">
            No hidden fees, no contracts. Every walk is{" "}
            {siteConfig.pricing.walkDuration} minutes and includes photo updates.
            Cancel or reschedule with 24 hours&apos; notice.
          </p>

          <div className="relative bg-white rounded-2xl border-2 border-[var(--green)]/30 p-8 md:p-10 mb-6 shadow-sm">
            <div className="absolute -top-3 left-6">
              <span className="bg-[var(--orange)] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                {siteConfig.pricing.introLabel}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="ww-serif text-2xl font-semibold mb-2">
                  Dog Walking
                </h2>
                <p className="text-[var(--muted)] leading-relaxed mb-4">
                  Both solo and small-group walks (max{" "}
                  {siteConfig.pricing.maxDogsPerWalk} dogs) at an introductory
                  rate. Available to our founding clients only.
                </p>
                <p className="text-xs text-[var(--orange)] font-medium">
                  ⚡ {siteConfig.pricing.introNote}
                </p>
              </div>

              <div className="text-center md:text-right">
                <div className="ww-serif text-5xl font-bold text-[var(--deep-green)] mb-1">
                  £{siteConfig.pricing.introPrice}
                </div>
                <p className="text-[var(--muted)]">
                  per {siteConfig.pricing.walkDuration}-minute walk
                </p>
                {siteConfig.pricing.standardPrice >
                  siteConfig.pricing.introPrice && (
                  <p className="text-sm text-[var(--light)] mt-2 line-through">
                    Standard rate: £{siteConfig.pricing.standardPrice}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[var(--cream)] rounded-2xl p-8 mb-10">
            <h3 className="font-semibold mb-4">Every walk includes:</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                `${siteConfig.pricing.walkDuration} minutes of exercise and enrichment`,
                "Photo updates sent to you",
                "Pick-up and drop-off from your home",
                "Secure lead handling at all times",
                `Max ${siteConfig.pricing.maxDogsPerWalk} dogs per group walk`,
                "Familiar, consistent routes",
                "Free meet & greet before first walk",
                "Easy 24-hour cancellation",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="text-[var(--green)] mt-0.5">✓</span>
                  <span className="text-sm text-[var(--text)]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="ww-serif text-xl font-semibold mb-6">Pricing FAQ</h3>
            <div className="space-y-4">
              {[
                {
                  q: "Are there any additional fees?",
                  a: "No. The price per walk covers everything — pick-up, the walk itself, drop-off, and photo updates. There are no sign-up fees or monthly minimums.",
                },
                {
                  q: "How long is the founding client rate available?",
                  a: "The introductory rate is available to my first 5 regular clients. Once those spots are filled, new clients will be charged the standard rate.",
                },
                {
                  q: "Do you charge more for larger dogs?",
                  a: "No. The price is the same regardless of breed or size.",
                },
                {
                  q: "What's your cancellation policy?",
                  a: "Just let me know at least 24 hours in advance and there's no charge. Last-minute cancellations may be charged at the full rate.",
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-white rounded-xl border border-[var(--green)]/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-medium text-sm hover:bg-[var(--cream)]/40 transition-colors">
                    {faq.q}
                    <span className="text-[var(--light)] group-open:rotate-45 transition-transform text-lg">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-[var(--muted)] leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="text-center bg-[var(--deep-green)] text-white rounded-2xl p-10">
            <h2 className="ww-serif text-2xl font-semibold mb-3">
              Ready to book?
            </h2>
            <p className="opacity-85 mb-6 max-w-md mx-auto">
              Start with a free meet &amp; greet. No commitment, just a chance
              for me to meet your dog and for you to ask any questions.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-white text-[var(--deep-green)] px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Book a Meet &amp; Greet
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/services"
              className="text-sm text-[var(--green)] font-medium hover:underline"
            >
              Our Services →
            </Link>
            <Link
              href="/faq"
              className="text-sm text-[var(--green)] font-medium hover:underline"
            >
              More FAQs →
            </Link>
            <Link
              href="/areas"
              className="text-sm text-[var(--green)] font-medium hover:underline"
            >
              Areas Served →
            </Link>
          </div>
        </PageShell>
      </Section>
    </PageLayout>
  );
}
