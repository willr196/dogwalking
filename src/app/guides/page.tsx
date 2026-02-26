import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";
import { PageShell } from "@/components/PageShell";
import { SidebarCTA } from "@/components/SidebarCTA";
import { Icons } from "@/components/willswalks/Icons";

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
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />

          <h1 className="ww-serif mb-4 text-[clamp(2.05rem,4.2vw,3.1rem)] leading-tight">Dog Walking Guides</h1>
          <p className="mb-10 max-w-[680px] text-lg leading-relaxed text-[var(--muted)]">
            Practical guidance for dog owners in Fulham and London, focused on clear decisions and safer
            routines.
          </p>

          <div className="space-y-4">
            {guides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="ww-card group block p-6 no-underline">
                <time className="text-xs font-semibold uppercase tracking-[0.09em] text-[var(--light)]">
                  {new Date(guide.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h2 className="ww-serif mt-2 text-[1.4rem] leading-tight text-[var(--text)]">{guide.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{guide.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--deep-green)] transition-transform group-hover:translate-x-0.5">
                  Read guide
                  <Icons.ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </PageShell>
      </Section>
    </PageLayout>
  );
}
