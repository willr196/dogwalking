import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";

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

        <div className="mb-12 grid items-start gap-8 md:grid-cols-[280px_1fr]">
          <div className="mx-auto w-full max-w-[280px] md:mx-0">
            <div
              className="aspect-[4/5] w-full rounded-[26px] border border-[rgba(255,255,255,0.22)] bg-[linear-gradient(145deg,var(--orange),var(--deep-orange))] p-5 text-6xl shadow-[var(--shadow)]"
              aria-label="Illustration of Will"
            >
              <div className="flex h-full items-center justify-center rounded-2xl bg-white/10">🧑</div>
            </div>
            <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
              Based in Fulham, SW6
            </p>
          </div>

          <article>
            <h1 className="ww-serif mb-4 text-[clamp(2.05rem,4.2vw,3rem)] leading-tight">Hi, I&apos;m Will</h1>
            <p className="mb-4 text-lg leading-relaxed text-[var(--muted)]">{siteConfig.owner.bio}</p>
            <p className="mb-4 leading-relaxed text-[var(--muted)]">
              I started {siteConfig.brandName} because I kept seeing dogs packed into big groups with limited
              attention. My approach keeps walks focused, structured, and matched to each dog.
            </p>
            <p className="mb-4 leading-relaxed text-[var(--muted)]">
              I&apos;m building this business carefully. That means honest communication, consistent handling,
              and never overloading sessions at the cost of care.
            </p>
            <p className="leading-relaxed text-[var(--muted)]">
              When your dog is with me, they get clear routines, appropriate exercise, and proper one-to-one focus.
            </p>
          </article>
        </div>

        <div className="mb-12 rounded-[26px] border border-[var(--line)] bg-white p-7 md:p-8">
          <h2 className="ww-serif mb-6 text-[1.5rem] leading-tight">My Approach</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {siteConfig.trustSignals.map((signal) => (
              <article key={signal.title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
                <h3 className="text-sm font-semibold text-[var(--text)]">{signal.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{signal.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="ww-serif mb-3 text-[1.5rem] leading-tight">Where I Walk</h2>
          <p className="mb-4 leading-relaxed text-[var(--muted)]">
            Fulham-based coverage across SW6 and nearby routes.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {siteConfig.areasServed.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--deep-green)] no-underline transition-colors hover:border-[var(--green)]/45"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-[linear-gradient(140deg,var(--orange),var(--deep-green))] p-8 text-white">
          <h2 className="ww-serif text-[1.85rem] leading-tight">Want to meet first?</h2>
          <p className="mt-2 max-w-[620px] leading-relaxed text-white/88">
            Every new client starts with a free meet &amp; greet so we can confirm fit, routine, and preferences.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[var(--deep-green)] no-underline"
            >
              Book a Meet &amp; Greet
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/36 bg-white/10 px-7 py-3 text-sm font-semibold text-white no-underline"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
