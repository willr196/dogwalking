import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";
import { ServiceSchema } from "@/components/willswalks/JsonLd";

const service = siteConfig.services.find(
  (s) => s.slug === "small-group-dog-walking"
);

export const metadata: Metadata = {
  title: `Small Group Dog Walking in Fulham | ${siteConfig.brandName}`,
  description: `Small group walks (max ${siteConfig.pricing.maxDogsPerWalk} dogs) in Fulham, SW6. Every dog assessed before joining. From £${siteConfig.pricing.introPrice}. Meet & greet required.`,
  alternates: {
    canonical: `${siteConfig.siteUrl}/services/small-group-dog-walking`,
  },
  openGraph: {
    title: `Small Group Dog Walking | ${siteConfig.brandName}`,
    description: service?.description,
    url: `${siteConfig.siteUrl}/services/small-group-dog-walking`,
  },
};

export default function SmallGroupDogWalkingPage() {
  if (!service) return null;

  return (
    <PageLayout>
      <ServiceSchema
        name={service.name}
        description={service.description}
        url="/services/small-group-dog-walking"
      />
      <Section>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Small Group Dog Walking" },
          ]}
        />

        <div className="grid md:grid-cols-[1fr_300px] gap-10 items-start">
          <div>
            <h1 className="ww-serif text-[clamp(2rem,4vw,2.8rem)] leading-tight mb-4">
              Small Group Dog Walking
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
                  {service.duration} of structured walking and play
                </span>
              </div>
            </div>

            <h2 className="ww-serif text-xl font-semibold mb-4">
              Why max {siteConfig.pricing.maxDogsPerWalk}?
            </h2>
            <p className="text-[var(--muted)] leading-relaxed mb-4">
              Keeping groups to a maximum of {siteConfig.pricing.maxDogsPerWalk}{" "}
              dogs means every dog still gets meaningful attention. I can manage
              the walk safely, respond to each dog&apos;s needs, and make sure
              nobody gets overwhelmed. Larger groups might be cheaper, but they
              compromise on safety and the quality of the experience.
            </p>
            <p className="text-[var(--muted)] leading-relaxed mb-8">
              Before any dog joins a group walk, I require a meet &amp; greet to
              assess their temperament and energy level. Dogs that aren&apos;t a
              good fit for group walks are offered solo walks instead, no
              pressure, no exceptions.
            </p>

            <h2 className="ww-serif text-xl font-semibold mb-4">Safety first</h2>
            <div className="bg-[var(--cream)] rounded-xl p-6 space-y-3 mb-8">
              {siteConfig.trustSignals.map((ts) => (
                <div key={ts.title}>
                  <p className="font-semibold text-sm text-[var(--text)]">
                    {ts.title}
                  </p>
                  <p className="text-[var(--muted)] text-sm">{ts.description}</p>
                </div>
              ))}
            </div>

            <h2 className="ww-serif text-xl font-semibold mb-4">How it works</h2>
            <div className="space-y-4">
              {siteConfig.howItWorks.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--green)] text-white font-bold text-sm flex items-center justify-center">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
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
          </aside>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--green)]/10 flex flex-wrap gap-3">
          <Link
            href="/services/solo-dog-walking"
            className="text-sm text-[var(--green)] font-medium hover:underline"
          >
            Solo Dog Walking →
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

