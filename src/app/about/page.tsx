import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";

export const metadata: Metadata = {
  title: `About Will | ${siteConfig.brandName}`,
  description: `Meet Will — the Fulham local behind ${siteConfig.brandName}. Small groups, structured walks, and genuine care for every dog.`,
  alternates: { canonical: `${siteConfig.siteUrl}/about` },
};

export default function AboutPage() {
  return (
    <PageLayout>
      <Section>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start mb-12">
          <div className="w-full max-w-[280px] mx-auto md:mx-0">
            <div
              className="w-full aspect-[4/5] rounded-2xl flex items-center justify-center text-6xl"
              style={{
                background:
                  "linear-gradient(145deg, var(--orange), var(--deep-orange))",
              }}
            >
              🧑
            </div>
            <p className="text-center text-xs text-[var(--light)] mt-3">
              📍 Based in Fulham, SW6
            </p>
          </div>

          <div>
            <h1 className="ww-serif text-[clamp(2rem,4vw,2.8rem)] leading-tight mb-4">
              Hi, I&apos;m Will
            </h1>
            <p className="text-[var(--muted)] text-lg leading-relaxed mb-4">
              {siteConfig.owner.bio}
            </p>
            <p className="text-[var(--muted)] leading-relaxed mb-4">
              I started {siteConfig.brandName} because I saw too many dog walkers
              taking on large packs where individual dogs get lost in the
              shuffle. My approach is different: small groups (max{" "}
              {siteConfig.pricing.maxDogsPerWalk} dogs), structured walks, and
              genuine care for every dog that walks with me.
            </p>
            <p className="text-[var(--muted)] leading-relaxed mb-4">
              I won&apos;t pretend I have years of professional dog walking
              experience, I&apos;m building this business from the ground up. What I
              can promise is that every dog in my care gets my full attention,
              consistent routines, and honest communication with their owner.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              When your dog is with me, they&apos;re not competing for attention.
              They get dedicated exercise, mental stimulation, and plenty of
              fuss.
            </p>
          </div>
        </div>

        <div className="bg-[var(--cream)] rounded-2xl p-8 mb-12">
          <h2 className="ww-serif text-xl font-semibold mb-6">My Approach</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {siteConfig.trustSignals.map((ts) => (
              <div key={ts.title}>
                <h3 className="font-semibold text-sm mb-1">{ts.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  {ts.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="ww-serif text-xl font-semibold mb-4">Where I Walk</h2>
          <p className="text-[var(--muted)] mb-4">
            Based in Fulham, I cover the following areas in SW6 and surrounds:
          </p>
          <div className="flex flex-wrap gap-2">
            {siteConfig.areasServed.map((a) => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}`}
                className="bg-white border border-[var(--green)]/15 px-4 py-2 rounded-full text-sm font-medium text-[var(--deep-green)] hover:bg-[var(--green)]/5 transition-colors"
              >
                {a.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="ww-serif text-2xl font-semibold mb-3">
            Want to meet me?
          </h2>
          <p className="text-[var(--muted)] mb-6 max-w-md mx-auto">
            Every new client starts with a free meet &amp; greet. It&apos;s the best way
            to see if we&apos;re a good fit.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-[var(--green)] text-white px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              Book a Meet &amp; Greet
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[var(--text)] border-2 border-[var(--green)]/20 px-8 py-3.5 rounded-full font-semibold hover:border-[var(--green)]/40 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}

