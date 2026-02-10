import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";
import { PageShell } from "@/components/PageShell";
import { SidebarCTA } from "@/components/SidebarCTA";

export const metadata: Metadata = {
  title: `Dog Walking Guides | ${siteConfig.brandName}`,
  description:
    "Helpful guides on choosing a dog walker, solo vs group walks, meet & greets, and more. Written by a Fulham-based dog walker.",
  alternates: { canonical: `${siteConfig.siteUrl}/guides` },
};

const guides = [
  {
    slug: "how-to-choose-a-dog-walker-in-london",
    title: "How to Choose a Dog Walker in London",
    excerpt:
      "What to look for (and what to avoid) when hiring someone to walk your dog. A practical guide from a Fulham dog walker.",
    date: "2026-02-01",
  },
  {
    slug: "solo-vs-small-group-dog-walking",
    title: "Solo vs Small-Group Dog Walking",
    excerpt:
      "Which type of walk is right for your dog? We break down the differences, pros, and cons to help you decide.",
    date: "2026-02-05",
  },
  {
    slug: "what-to-expect-from-a-meet-and-greet",
    title: "What to Expect from a Meet & Greet",
    excerpt:
      "Your first step before any dog walk. Here's what happens, why it matters, and what to prepare.",
    date: "2026-02-08",
  },
];

export default function GuidesPage() {
  return (
    <PageLayout>
      <Section className="px-0">
        <PageShell sidebar={<SidebarCTA />}>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Guides" }]}
          />
          <h1 className="ww-serif text-[clamp(2rem,4vw,3rem)] leading-tight mb-4">
            Dog Walking Guides
          </h1>
          <p className="text-[var(--muted)] text-lg leading-relaxed max-w-[600px] mb-10">
            Practical advice for dog owners in Fulham and London. No fluff, just
            honest guidance from someone who walks dogs every day.
          </p>

          <div className="space-y-4">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group block bg-white rounded-2xl border border-[var(--green)]/10 p-6 hover:shadow-md hover:border-[var(--green)]/20 transition-all"
              >
                <time className="text-xs text-[var(--light)] font-medium">
                  {new Date(g.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h2 className="ww-serif text-lg font-semibold mt-1 mb-2 group-hover:text-[var(--deep-green)] transition-colors">
                  {g.title}
                </h2>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {g.excerpt}
                </p>
                <span className="inline-block mt-3 text-sm text-[var(--green)] font-medium group-hover:translate-x-1 transition-transform">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </PageShell>
      </Section>
    </PageLayout>
  );
}
