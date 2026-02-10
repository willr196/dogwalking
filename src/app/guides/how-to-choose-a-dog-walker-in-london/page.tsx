import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";

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
        <article className="max-w-[680px]">
          <time className="text-xs text-[var(--light)] font-medium">
            1 February 2026
          </time>
          <h1 className="ww-serif text-[clamp(1.8rem,4vw,2.6rem)] leading-tight mt-2 mb-6">
            How to Choose a Dog Walker in London
          </h1>

          <div className="prose-ww space-y-5 text-[var(--muted)] leading-relaxed">
            <p>
              Finding someone you trust to walk your dog isn&apos;t easy. You&apos;re
              handing over your pet to a stranger, and you want to know
              they&apos;ll be safe, happy, and well looked after. Here&apos;s what I&apos;d
              look for if I were hiring a dog walker in London.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              Ask about group sizes
            </h2>
            <p>
              One of the most important questions to ask is how many dogs they
              walk at once. Some walkers take 6, 8, even 10 dogs at a time and at
              that point, individual attention is almost impossible. Look for
              walkers who keep groups small (3 or fewer) or offer solo walks.
              Your dog deserves more than being part of a crowd.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              Insist on a meet &amp; greet
            </h2>
            <p>
              Any good dog walker will want to meet your dog before the first
              walk. This isn&apos;t just a formality, it&apos;s how they assess your
              dog&apos;s temperament, energy level, and any special needs. If a
              walker is willing to take your dog without ever meeting them first,
              that&apos;s a red flag.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              Ask about their safety approach
            </h2>
            <p>
              What are their rules on off-lead walking? How do they handle
              reactive dogs? What happens if there&apos;s an emergency? These are
              fair questions. A trustworthy walker will have clear answers and
              won&apos;t be offended by being asked.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              Look for communication
            </h2>
            <p>
              Do they send updates during or after the walk? Photos, messages, or
              a quick summary make a big difference. It shows they care and it
              gives you peace of mind while you&apos;re away.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              Check their local knowledge
            </h2>
            <p>
              A walker who knows your area will have better routes, understand
              which parks are quiet at what times, and be more reliable in
              general. Ask where they typically walk and whether they&apos;re
              familiar with your neighbourhood.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              Trust your instincts
            </h2>
            <p>
              Ultimately, you&apos;re looking for someone your dog responds well to.
              Watch how they interact during the meet &amp; greet. Do they get on
              the dog&apos;s level? Are they patient? Do they listen to what you tell
              them about your dog? Those small signals matter.
            </p>
          </div>

          <div className="mt-10 p-6 bg-[var(--cream)] rounded-xl">
            <p className="font-semibold text-sm mb-2">
              Looking for a dog walker in Fulham?
            </p>
            <p className="text-sm text-[var(--muted)] mb-4">
              I offer solo and small-group walks (max {siteConfig.pricing.maxDogsPerWalk}{" "}
              dogs) across SW6. Every new client starts with a free meet &amp;
              greet.
            </p>
            <Link
              href="/booking"
              className="inline-flex bg-[var(--green)] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Book a Meet &amp; Greet
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/guides/solo-vs-small-group-dog-walking"
              className="text-sm text-[var(--green)] font-medium hover:underline"
            >
              Solo vs Group Walking →
            </Link>
            <Link
              href="/guides/what-to-expect-from-a-meet-and-greet"
              className="text-sm text-[var(--green)] font-medium hover:underline"
            >
              What to Expect from a Meet &amp; Greet →
            </Link>
          </div>
        </article>
      </Section>
    </PageLayout>
  );
}

