import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";

export const metadata: Metadata = {
  title: `How to Choose a Dog Walker in London | ${siteConfig.brandName}`,
  description:
    "A practical guide to finding the right dog walker in London. What to ask, what to look for, and red flags to watch out for.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/guides/how-to-choose-a-dog-walker-in-london`,
  },
};

export default function GuideChooseDogWalker() {
  return (
    <PageLayout>
      <Section>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Guides", href: "/guides" },
            { label: "How to Choose a Dog Walker" },
          ]}
        />

        <article className="max-w-[760px]">
          <time className="text-xs font-semibold uppercase tracking-[0.09em] text-[var(--light)]">1 February 2026</time>
          <h1 className="ww-serif mb-6 mt-2 text-[clamp(1.95rem,4vw,2.8rem)] leading-tight">
            How to Choose a Dog Walker in London
          </h1>

          <div className="space-y-5 leading-relaxed text-[var(--muted)]">
            <p>
              Choosing a dog walker means trusting someone with your dog&apos;s safety and routine. The fastest way
              to avoid poor experiences is to ask the right questions up front.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">Ask about group size</h2>
            <p>
              Large packs usually reduce attention and control. Look for walkers offering solo sessions or
              genuinely small groups (ideally 3 or fewer dogs).
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">Insist on a meet &amp; greet</h2>
            <p>
              A proper walker will assess your dog before accepting bookings. If someone is willing to start
              without meeting your dog, treat that as a red flag.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">Ask for clear safety rules</h2>
            <p>
              Ask about off-lead policy, reactive-dog handling, and emergency response. Good walkers answer
              clearly and consistently.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">Check communication style</h2>
            <p>
              Updates matter. Photo and walk summaries show professionalism and give you confidence in the
              service you&apos;re paying for.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">Look for local route knowledge</h2>
            <p>
              Area knowledge improves reliability and route quality, especially around park timing, traffic, and
              quieter alternatives.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">Trust the in-person signal</h2>
            <p>
              During meet &amp; greet, watch how they interact with your dog. Calm handling, patience, and listening
              are stronger indicators than marketing copy.
            </p>
          </div>

          <div className="mt-10 rounded-[24px] border border-[var(--line)] bg-white p-6">
            <p className="text-sm font-semibold text-[var(--text)]">Looking for a Fulham-based walker?</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              I offer solo and small-group walks (max {siteConfig.pricing.maxDogsPerWalk} dogs). Every client starts
              with a free meet &amp; greet.
            </p>
            <Link
              href="/booking"
              className="mt-4 inline-flex rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-6 py-2.5 text-sm font-semibold text-white no-underline"
            >
              Book a Meet &amp; Greet
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="/guides/solo-vs-small-group-dog-walking"
              className="text-sm font-semibold text-[var(--deep-green)] no-underline"
            >
              Solo vs Group Walking →
            </Link>
            <Link
              href="/guides/what-to-expect-from-a-meet-and-greet"
              className="text-sm font-semibold text-[var(--deep-green)] no-underline"
            >
              Meet &amp; Greet Guide →
            </Link>
          </div>
        </article>
      </Section>
    </PageLayout>
  );
}
