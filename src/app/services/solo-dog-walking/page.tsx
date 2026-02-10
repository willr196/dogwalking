import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";
import { ServiceSchema } from "@/components/willswalks/JsonLd";

const service = siteConfig.services.find((s) => s.slug === "solo-dog-walking");

export const metadata: Metadata = {
  title: `Solo Dog Walking in Fulham | ${siteConfig.brandName}`,
  description: `One-on-one dog walking in Fulham, SW6. 60 minutes of dedicated attention for your dog. From £${siteConfig.pricing.introPrice}. Meet & greet required.`,
  alternates: { canonical: `${siteConfig.siteUrl}/services/solo-dog-walking` },
  openGraph: {
    title: `Solo Dog Walking | ${siteConfig.brandName}`,
    description: service?.description,
    url: `${siteConfig.siteUrl}/services/solo-dog-walking`,
  },
};

export default function SoloDogWalkingPage() {
  if (!service) return null;

  return (
    <PageLayout>
      <ServiceSchema
        name={service.name}
        description={service.description}
        url="/services/solo-dog-walking"
      />
      <Section>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Solo Dog Walking" },
          ]}
        />

        <div className="grid md:grid-cols-[1fr_300px] gap-10 items-start">
          <div>
            <h1 className="ww-serif text-[clamp(2rem,4vw,2.8rem)] leading-tight mb-4">
              Solo Dog Walking
            </h1>
            <p className="text-[var(--muted)] text-lg leading-relaxed mb-8">
              {service.description}
            </p>

            <h2 className="ww-serif text-xl font-semibold mb-4">
              What&apos;s included
            </h2>
            <div className="space-y-3 mb-8">
              {service.features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--green)]/10 text-[var(--green)] flex items-center justify-center text-sm">
                    ✓
                  </span>
                  <span className="text-[var(--text)]">{f}</span>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--green)]/10 text-[var(--green)] flex items-center justify-center text-sm">
                  ✓
                </span>
                <span className="text-[var(--text)]">
                  {service.duration} of dedicated walking and enrichment
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--green)]/10 text-[var(--green)] flex items-center justify-center text-sm">
                  ✓
                </span>
                <span className="text-[var(--text)]">
                  Reliable pick-up and drop-off times
                </span>
              </div>
            </div>

            <h2 className="ww-serif text-xl font-semibold mb-4">
              Who is this for?
            </h2>
            <p className="text-[var(--muted)] leading-relaxed mb-4">
              Solo walks are ideal for dogs who prefer one-on-one attention, are
              reactive or anxious around other dogs, are puppies in training, or
              simply thrive with undivided focus. It&apos;s also perfect if your dog
              has specific exercise or medical needs that require individual
              care.
            </p>

            <h2 className="ww-serif text-xl font-semibold mb-4 mt-8">
              How it works
            </h2>
            <div className="space-y-4 mb-8">
              {siteConfig.howItWorks.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--green)] text-white font-bold text-sm flex items-center justify-center">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[var(--muted)] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-white rounded-2xl border border-[var(--green)]/10 p-6 md:sticky md:top-24">
            <div className="text-center mb-6">
              <p className="text-xs text-[var(--orange)] font-semibold uppercase tracking-wide mb-1">
                {siteConfig.pricing.introLabel}
              </p>
              <div className="ww-serif text-4xl font-bold text-[var(--deep-green)]">
                £{siteConfig.pricing.introPrice}
              </div>
              <p className="text-[var(--muted)] text-sm mt-1">
                per {service.duration} walk
              </p>
              <p className="text-xs text-[var(--light)] mt-1">
                {siteConfig.pricing.introNote}
              </p>
            </div>
            <Link
              href="/booking"
              className="block w-full text-center bg-[var(--green)] text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md mb-3"
            >
              Book a Meet &amp; Greet
            </Link>
            <Link
              href="/contact"
              className="block w-full text-center bg-white text-[var(--text)] border-2 border-[var(--green)]/20 py-3 rounded-full font-semibold hover:border-[var(--green)]/40 transition-colors"
            >
              Ask a Question
            </Link>
            <div className="mt-6 pt-5 border-t border-[var(--green)]/10 space-y-2">
              <p className="text-xs text-[var(--muted)]">
                📍 Serving: {siteConfig.areasServed.map((a) => a.name).join(", ")}
              </p>
              <p className="text-xs text-[var(--muted)]">🕐 Available 7 days a week</p>
            </div>
          </aside>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--green)]/10 flex flex-wrap gap-3">
          <Link
            href="/services/small-group-dog-walking"
            className="text-sm text-[var(--green)] font-medium hover:underline"
          >
            Small Group Dog Walking →
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-[var(--green)] font-medium hover:underline"
          >
            Full Pricing →
          </Link>
          <Link
            href="/areas"
            className="text-sm text-[var(--green)] font-medium hover:underline"
          >
            Areas Served →
          </Link>
        </div>
      </Section>
    </PageLayout>
  );
}

