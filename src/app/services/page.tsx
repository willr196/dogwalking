import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";
import { ServiceSchema } from "@/components/willswalks/JsonLd";
import { PageShell } from "@/components/PageShell";
import { SidebarCTA } from "@/components/SidebarCTA";
import { Icons } from "@/components/willswalks/Icons";

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
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />

          <h1 className="ww-serif mb-4 text-[clamp(2.05rem,4.2vw,3.1rem)] leading-tight">
            Dog Walking Services
          </h1>
          <p className="mb-10 max-w-[680px] text-lg leading-relaxed text-[var(--muted)]">
            Choose between one-to-one or carefully managed small-group walks. Every plan starts with a
            meet &amp; greet so your dog gets the right fit from day one.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            {siteConfig.services.map((service) => (
              <article key={service.slug} className="ww-card p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--deep-green)]/72">
                      {service.shortName}
                    </p>
                    <h2 className="ww-serif mt-2 text-[1.6rem] leading-tight text-[var(--text)]">
                      {service.name}
                    </h2>
                  </div>
                  <span className="text-xl" aria-hidden="true">
                    {service.slug === "solo-dog-walking" ? "🐕" : "🐕‍🦺"}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{service.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {service.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-semibold text-[var(--deep-green)]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="ww-serif text-[1.95rem] leading-none text-[var(--deep-green)]">
                      £{siteConfig.pricing.introPrice}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">per {service.duration} walk</p>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--deep-green)] no-underline"
                  >
                    View details
                    <Icons.ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] border border-[var(--line)] bg-white p-7 md:p-8">
            <h2 className="ww-serif mb-6 text-[1.6rem] leading-tight text-[var(--text)]">How It Works</h2>
            <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {siteConfig.howItWorks.map((step) => (
                <li key={step.step} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] text-sm font-bold text-white">
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-[var(--text)]">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 rounded-[28px] bg-[linear-gradient(140deg,var(--orange),var(--deep-green))] p-8 text-white">
            <h2 className="ww-serif text-[1.9rem] leading-tight">Not sure which service is best?</h2>
            <p className="mt-2 max-w-[620px] leading-relaxed text-white/88">
              We can decide together at the meet &amp; greet based on your dog&apos;s behaviour, energy, and confidence.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[var(--deep-green)] no-underline"
              >
                Book a Meet &amp; Greet
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/36 bg-white/10 px-7 py-3 text-sm font-semibold text-white no-underline"
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
