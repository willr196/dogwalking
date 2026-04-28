import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";

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

        <article className="max-w-[760px]">
          <time className="text-xs font-semibold uppercase tracking-[0.09em] text-[var(--light)]">8 February 2026</time>
          <h1 className="ww-serif mb-6 mt-2 text-[clamp(1.95rem,4vw,2.8rem)] leading-tight">
            What to Expect from a Meet &amp; Greet
          </h1>

          <div className="space-y-5 leading-relaxed text-[var(--muted)]">
            <p>
              Before any first walk, I require a meet &amp; greet. It&apos;s free, no-pressure, and crucial for
              getting the setup right.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">I come to your home</h2>
            <p>
              Meeting in your dog&apos;s environment gives a more accurate view of behaviour, comfort, and routine.
              It also confirms practical handover details for future walks.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">It takes around 15 to 20 minutes</h2>
            <p>
              I let your dog set the pace, observe interactions, and assess energy and handling needs. Some dogs
              warm up instantly, others take a little longer.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">What I&apos;ll ask you</h2>
            <p>
              We cover routine, lead behaviour, triggers, social confidence, and medical notes. The clearer the
              picture, the safer and smoother walks become.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">What you should ask me</h2>
            <p>
              Ask as much as you need: route plans, wet weather policy, off-lead rules, and emergency handling.
              Clear expectations are always better.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">After the visit</h2>
            <p>
              If everyone is comfortable, we set a schedule and choose solo or group format. If you prefer,
              you can start with a single walk before committing.
            </p>

            <h2 className="ww-serif pt-3 text-[1.45rem] leading-tight text-[var(--text)]">Why I require it</h2>
            <p>
              It protects your dog and improves outcomes from day one. Skipping this step usually means guessing,
              and I don&apos;t run walks on guesses.
            </p>
          </div>

          <div className="mt-10 rounded-lg border border-[var(--line)] bg-white p-6">
            <p className="text-sm font-semibold text-[var(--text)]">Ready to set up your meet &amp; greet?</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              I&apos;ll come to your home in {siteConfig.areasServed[0].name} or nearby areas.
            </p>
            <Link
              href="/book"
              className="mt-4 inline-flex rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-6 py-2.5 text-sm font-semibold text-white no-underline"
            >
              Book a Meet &amp; Greet
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="/guides/how-to-choose-a-dog-walker-in-london"
              className="text-sm font-semibold text-[var(--deep-green)] no-underline"
            >
              How to Choose a Dog Walker →
            </Link>
            <Link href="/faq" className="text-sm font-semibold text-[var(--deep-green)] no-underline">
              More FAQ →
            </Link>
          </div>
        </article>
      </Section>
    </PageLayout>
  );
}
