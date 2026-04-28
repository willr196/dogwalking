import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";
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
      <ServiceSchema name={service.name} description={service.description} url="/services/solo-dog-walking" />

      <Section>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Solo Dog Walking" },
          ]}
        />

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">
          <article>
            <h1 className="ww-serif mb-4 text-[clamp(2rem,4.3vw,3rem)] leading-tight">Solo Dog Walking</h1>
            <p className="mb-8 text-lg leading-relaxed text-[var(--muted)]">{service.description}</p>

            <div className="ww-card p-6 md:p-7">
              <h2 className="ww-serif mb-4 text-[1.5rem] leading-tight">What&apos;s Included</h2>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-[var(--text)]">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(15,141,135,0.15)] text-[12px] font-semibold text-[var(--deep-green)]">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3 text-sm text-[var(--text)]">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(15,141,135,0.15)] text-[12px] font-semibold text-[var(--deep-green)]">
                    ✓
                  </span>
                  <span>{service.duration} of dedicated exercise and enrichment</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--text)]">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(15,141,135,0.15)] text-[12px] font-semibold text-[var(--deep-green)]">
                    ✓
                  </span>
                  <span>Reliable pick-up and drop-off windows</span>
                </li>
              </ul>
            </div>

            <h2 className="ww-serif mb-3 mt-8 text-[1.5rem] leading-tight">Who It&apos;s Best For</h2>
            <p className="mb-4 leading-relaxed text-[var(--muted)]">
              Solo walks suit dogs that need full focus: reactive dogs, anxious dogs, puppies still learning,
              or dogs with specific health and routine needs.
            </p>
            <p className="leading-relaxed text-[var(--muted)]">
              If your dog gets overstimulated in groups or just prefers one-to-one handling, solo walks create
              calmer progress and better consistency.
            </p>

            <h2 className="ww-serif mb-4 mt-8 text-[1.5rem] leading-tight">How It Works</h2>
            <ol className="space-y-3">
              {siteConfig.howItWorks.map((step) => (
                <li key={step.step} className="ww-card flex gap-3 p-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] text-sm font-bold text-white">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text)]">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <aside className="ww-card p-6 md:sticky md:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--deep-green)]/78">
              Introductory rate
            </p>
            <p className="ww-serif mt-2 text-[2.5rem] leading-none text-[var(--deep-green)]">£{siteConfig.pricing.introPrice}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">per {service.duration} walk</p>
            <p className="mt-1 text-xs text-[var(--light)]">{siteConfig.pricing.introNote}</p>

            <div className="mt-5 space-y-2 rounded-2xl border border-[var(--line)] bg-white p-4 text-sm text-[var(--muted)]">
              <p>Max {siteConfig.pricing.maxDogsPerWalk} dogs in group sessions</p>
              <p>Serving {siteConfig.areasServed.slice(0, 3).map((a) => a.name).join(", ")} and nearby SW6</p>
              <p>Available seven days a week</p>
            </div>

            <Link
              href="/book"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-5 py-3 text-sm font-semibold text-white no-underline"
            >
              Book a Meet &amp; Greet
            </Link>
            <Link
              href="/contact"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[var(--line-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--text)] no-underline"
            >
              Ask a Question
            </Link>
          </aside>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-[var(--line)] pt-6">
          <Link href="/services/small-group-dog-walking" className="text-sm font-semibold text-[var(--deep-green)] no-underline">
            Small Group Dog Walking →
          </Link>
          <Link href="/pricing" className="text-sm font-semibold text-[var(--deep-green)] no-underline">
            Full Pricing →
          </Link>
          <Link href="/areas" className="text-sm font-semibold text-[var(--deep-green)] no-underline">
            Areas Served →
          </Link>
        </div>
      </Section>
    </PageLayout>
  );
}
