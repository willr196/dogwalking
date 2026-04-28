import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";

export const metadata: Metadata = {
  title: `Solo vs Small-Group Dog Walking | ${siteConfig.brandName}`,
  description:
    "Should your dog walk solo or in a small group? A straightforward comparison to help you decide which is right for your dog.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/guides/solo-vs-small-group-dog-walking`,
  },
};

export default function GuideSoloVsGroup() {
  return (
    <PageLayout>
      <Section>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Guides", href: "/guides" },
            { label: "Solo vs Group Walking" },
          ]}
        />

        <article className="max-w-[760px]">
          <time className="text-xs font-semibold uppercase tracking-[0.09em] text-[var(--light)]">5 February 2026</time>
          <h1 className="ww-serif mb-6 mt-2 text-[clamp(1.95rem,4vw,2.8rem)] leading-tight">
            Solo vs Small-Group Dog Walking
          </h1>

          <div className="space-y-5 leading-relaxed text-[var(--muted)]">
            <p>
              One of the first decisions when booking a dog walker is whether your dog should walk solo or
              in a small group. Both options can work, but the right choice depends on your dog&apos;s behaviour,
              confidence, and needs.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">When solo walks are best</h2>
            <p>
              Solo sessions are ideal for reactive or anxious dogs, puppies still learning basics, and dogs
              with specific health or behaviour plans. They also suit dogs that simply perform better with
              undivided attention.
            </p>
            <p>
              If your dog has high energy and needs focused structure, solo walks usually deliver a clearer
              and calmer result.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">When small groups work well</h2>
            <p>
              Some dogs benefit from social interaction and shared movement. A well-managed small group
              (max {siteConfig.pricing.maxDogsPerWalk} dogs) can improve confidence and provide useful
              mental stimulation.
            </p>
            <p>
              The key is careful matching. A controlled group of 2 to 3 dogs is very different from a large,
              overpacked walk.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">Why meet &amp; greet matters</h2>
            <p>
              You may think your dog clearly needs one format, but behaviour in real settings can differ.
              The meet &amp; greet lets us assess fit, triggers, and confidence properly before choosing a plan.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">You can change over time</h2>
            <p>
              Walk style is not permanent. Dogs often move between solo and group formats as they mature,
              gain confidence, or change routine.
            </p>
          </div>

          <div className="mt-10 rounded-lg border border-[var(--line)] bg-white p-6">
            <p className="text-sm font-semibold text-[var(--text)]">Not sure which format fits your dog?</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Book a free meet &amp; greet and we&apos;ll choose the right setup based on your dog&apos;s behaviour.
            </p>
            <Link
              href="/book"
              className="mt-4 inline-flex rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-6 py-2.5 text-sm font-semibold text-white no-underline"
            >
              Book a Meet &amp; Greet
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link href="/services/solo-dog-walking" className="text-sm font-semibold text-[var(--deep-green)] no-underline">
              Solo Walking Details →
            </Link>
            <Link
              href="/services/small-group-dog-walking"
              className="text-sm font-semibold text-[var(--deep-green)] no-underline"
            >
              Group Walking Details →
            </Link>
          </div>
        </article>
      </Section>
    </PageLayout>
  );
}
