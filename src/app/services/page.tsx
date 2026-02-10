import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";
import { ServiceSchema } from "@/components/willswalks/JsonLd";
import { PageShell } from "@/components/PageShell";
import { SidebarCTA } from "@/components/SidebarCTA";

export const metadata: Metadata = {
  title: `Dog Walking Services in Fulham | ${siteConfig.brandName}`,
  description: `Solo and small-group dog walking in Fulham, SW6. Max ${siteConfig.pricing.maxDogsPerWalk} dogs per walk. Meet & greet required. From £${siteConfig.pricing.introPrice} per walk.`,
  alternates: { canonical: `${siteConfig.siteUrl}/services` },
  openGraph: {
    title: `Dog Walking Services | ${siteConfig.brandName}`,
    description: `Professional dog walking in Fulham. Solo walks and small groups (max ${siteConfig.pricing.maxDogsPerWalk} dogs).`,
    url: `${siteConfig.siteUrl}/services`,
    type: "website",
    locale: siteConfig.seo.locale,
  },
};

export default function ServicesPage() {
  return (
    <PageLayout>
      <ServiceSchema
        name="Dog Walking Services"
        description={`Solo and small-group dog walking in Fulham, SW6. Max ${siteConfig.pricing.maxDogsPerWalk} dogs per walk.`}
        url="/services"
      />

      <Section className="px-0">
        <PageShell sidebar={<SidebarCTA />}>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Services" }]}
          />

          <h1 className="ww-serif text-[clamp(2rem,4vw,3rem)] leading-tight mb-4">
            Dog Walking Services
          </h1>
          <p className="text-[var(--muted)] text-lg leading-relaxed max-w-[640px] mb-12">
            Whether your dog thrives with one-on-one attention or enjoys a
            small, carefully managed group, I have a walk that fits. Every walk
            starts with a meet &amp; greet, because getting it right matters.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {siteConfig.services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block bg-white rounded-2xl border border-[var(--green)]/10 p-6 md:p-8 hover:shadow-lg hover:border-[var(--green)]/20 transition-all"
              >
                <div className="text-3xl mb-4">
                  {service.slug === "solo-dog-walking" ? "🐕" : "🐕‍🦺"}
                </div>
                <h2 className="ww-serif text-xl font-semibold mb-2 group-hover:text-[var(--deep-green)] transition-colors">
                  {service.name}
                </h2>
                <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((f) => (
                    <span
                      key={f}
                      className="bg-[var(--green)]/8 text-[var(--deep-green)] text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="ww-serif text-2xl font-bold text-[var(--deep-green)]">
                      £{siteConfig.pricing.introPrice}
                    </span>
                    <span className="text-[var(--muted)] text-sm ml-2">
                      / {service.duration}
                    </span>
                  </div>
                  <span className="text-[var(--green)] text-sm font-medium group-hover:translate-x-1 transition-transform">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-[var(--cream)] rounded-2xl p-8 md:p-10">
            <h2 className="ww-serif text-2xl font-semibold mb-8 text-center">
              How It Works
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteConfig.howItWorks.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-[var(--green)] text-white font-bold text-sm flex items-center justify-center mx-auto mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
                  <p className="text-[var(--muted)] text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-[var(--muted)] mb-4">
              Ready to get started? Every new client begins with a free meet
              &amp; greet.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-[var(--green)] text-white px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md"
              >
                Book a Meet &amp; Greet
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-white text-[var(--text)] border-2 border-[var(--green)]/20 px-8 py-3.5 rounded-full font-semibold hover:border-[var(--green)]/40 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </PageShell>
      </Section>
    </PageLayout>
  );
}
