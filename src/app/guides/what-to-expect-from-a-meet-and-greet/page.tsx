import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";

export const metadata: Metadata = {
  title: `What to Expect from a Meet & Greet | ${siteConfig.brandName}`,
  description:
    "Everything you need to know about the dog walker meet & greet. What happens, how long it takes, and why it's so important.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/guides/what-to-expect-from-a-meet-and-greet`,
  },
};

export default function GuideMeetAndGreet() {
  return (
    <PageLayout>
      <Section>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Guides", href: "/guides" },
            { label: "Meet & Greet Guide" },
          ]}
        />
        <article className="max-w-[680px]">
          <time className="text-xs text-[var(--light)] font-medium">
            8 February 2026
          </time>
          <h1 className="ww-serif text-[clamp(1.8rem,4vw,2.6rem)] leading-tight mt-2 mb-6">
            What to Expect from a Meet &amp; Greet
          </h1>

          <div className="space-y-5 text-[var(--muted)] leading-relaxed">
            <p>
              Before I walk any dog for the first time, I require a meet &amp; greet.
              It&apos;s free, there&apos;s no obligation, and it&apos;s the most important step
              in making sure your dog has a great experience. Here&apos;s what to
              expect.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              I come to you
            </h2>
            <p>
              The meet &amp; greet happens at your home. This is deliberate, I want to
              see your dog in their own environment where they&apos;re most
              comfortable. It also means I know exactly where I&apos;ll be picking up
              and dropping off for future walks.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              It takes about 15 to 20 minutes
            </h2>
            <p>
              There&apos;s no rush. I&apos;ll spend time letting your dog approach me at
              their own pace, watch how they move and interact, and get a sense of
              their energy level. Some dogs warm up instantly; others need a few
              minutes. Both are absolutely fine.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              What I&apos;ll ask you
            </h2>
            <p>
              I&apos;ll want to know about your dog&apos;s routine, how they are on the
              lead, whether they have any triggers or anxieties, and how they get
              on with other dogs. I&apos;ll also ask about any medical conditions or
              dietary needs. The more I know, the better the walk will be.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              What you should ask me
            </h2>
            <p>
              This is your chance to ask anything. Where will I walk? What
              happens if it rains? What&apos;s my policy on off-lead? How do I handle
              emergencies? I&apos;d rather you asked too many questions than too few,
              it shows you care, and I respect that.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              After the meet &amp; greet
            </h2>
            <p>
              If we&apos;re both happy, we&apos;ll agree on a schedule. I&apos;ll confirm the
              regular days and times that work for you, and we can start from the
              next available slot. If your dog needs a solo walk rather than a
              group, I&apos;ll let you know and explain why.
            </p>
            <p>
              There&apos;s no pressure to commit. If you want to think it over or try
              a single walk first, that&apos;s completely fine.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              Why I require it
            </h2>
            <p>
              Honestly, any dog walker who doesn&apos;t do a meet &amp; greet is cutting
              corners. I need to know your dog before I take responsibility for
              them. It&apos;s about safety, trust, and making sure the walk is
              genuinely good for your dog, not just a service you pay for.
            </p>
          </div>

          <div className="mt-10 p-6 bg-[var(--cream)] rounded-xl">
            <p className="font-semibold text-sm mb-2">
              Ready to book a meet &amp; greet?
            </p>
            <p className="text-sm text-[var(--muted)] mb-4">
              It&apos;s free and there&apos;s no obligation. I&apos;ll come to your home in{" "}
              {siteConfig.areasServed[0].name} or surrounding areas.
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
              href="/guides/how-to-choose-a-dog-walker-in-london"
              className="text-sm text-[var(--green)] font-medium hover:underline"
            >
              How to Choose a Dog Walker →
            </Link>
            <Link
              href="/faq"
              className="text-sm text-[var(--green)] font-medium hover:underline"
            >
              More FAQs →
            </Link>
          </div>
        </article>
      </Section>
    </PageLayout>
  );
}

