import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";

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
        <article className="max-w-[680px]">
          <time className="text-xs text-[var(--light)] font-medium">
            5 February 2026
          </time>
          <h1 className="ww-serif text-[clamp(1.8rem,4vw,2.6rem)] leading-tight mt-2 mb-6">
            Solo vs Small-Group Dog Walking
          </h1>

          <div className="space-y-5 text-[var(--muted)] leading-relaxed">
            <p>
              One of the first decisions you&apos;ll make when hiring a dog walker is
              whether your dog should walk solo or join a small group. Both have
              genuine advantages, the right choice depends on your dog&apos;s
              personality, not on which option is cheaper.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              When solo walks make sense
            </h2>
            <p>
              Solo walks are ideal for dogs who are reactive or anxious around
              other dogs, puppies who are still learning the basics, dogs with
              specific medical or behavioural needs, and dogs who simply thrive
              with undivided attention. If your dog is nervous in groups or needs
              a more controlled environment, solo is the way to go.
            </p>
            <p>
              It&apos;s also a good fit if your dog has a lot of energy and needs the
              full hour of focused exercise without the dynamics of a group
              slowing things down.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              When small-group walks work well
            </h2>
            <p>
              Some dogs genuinely benefit from walking with others. Socialisation
              is important, and a well-managed small group (max{" "}
              {siteConfig.pricing.maxDogsPerWalk} dogs) gives your dog a chance to
              interact safely with compatible companions. Group walks can help
              build confidence, burn energy through play, and provide mental
              stimulation that solo walks sometimes can&apos;t match.
            </p>
            <p>
              The key word is small. A group of 2 to 3 dogs is very different from
              a pack of 6 to 8. In a small group, every dog still gets individual
              attention and the walker can manage behaviour effectively.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              Why the meet &amp; greet matters
            </h2>
            <p>
              You might think your dog would be great in a group, or you might
              assume they need to walk solo. Either way, the meet &amp; greet is
              where I can actually assess their temperament and make a
              recommendation. Sometimes dogs surprise you. A dog that seems
              anxious might actually relax in a well-matched group, while an
              outgoing dog might be better suited to solo walks if they tend to
              overstimulate.
            </p>

            <h2 className="ww-serif text-xl font-semibold text-[var(--text)] mt-8 mb-3">
              You don&apos;t have to choose forever
            </h2>
            <p>
              Your dog&apos;s needs might change. A puppy that starts with solo walks
              might graduate to group walks as they gain confidence. An older dog
              might switch from group to solo as their energy changes. Flexibility
              is important.
            </p>
          </div>

          <div className="mt-10 p-6 bg-[var(--cream)] rounded-xl">
            <p className="font-semibold text-sm mb-2">
              Not sure which is right for your dog?
            </p>
            <p className="text-sm text-[var(--muted)] mb-4">
              Book a free meet &amp; greet and I&apos;ll help you work it out. No
              pressure, no commitment.
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
              href="/services/solo-dog-walking"
              className="text-sm text-[var(--green)] font-medium hover:underline"
            >
              Solo Walking Details →
            </Link>
            <Link
              href="/services/small-group-dog-walking"
              className="text-sm text-[var(--green)] font-medium hover:underline"
            >
              Group Walking Details →
            </Link>
          </div>
        </article>
      </Section>
    </PageLayout>
  );
}

