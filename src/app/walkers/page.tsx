import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";
import { Icons } from "@/components/willswalks/Icons";
import { getApprovedWalkersForPublicDirectory } from "@/lib/walkers.server";

export const metadata: Metadata = {
  title: `Find a Walker | ${siteConfig.brandName}`,
  description:
    "Browse approved walker profiles with service area, rates, availability, and experience details.",
  alternates: { canonical: `${siteConfig.siteUrl}/walkers` },
  openGraph: {
    title: `Find a Walker | ${siteConfig.brandName}`,
    description:
      "Explore approved walker profiles and choose the right fit for your dog.",
    url: `${siteConfig.siteUrl}/walkers`,
    type: "website",
    locale: siteConfig.seo.locale,
  },
};

export const revalidate = 60;

function getInitials(name: string | null): string {
  if (!name) return "WK";
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials || "WK";
}

export default async function WalkersPage() {
  const walkers = await getApprovedWalkersForPublicDirectory();

  return (
    <PageLayout>
      <Section>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Find a Walker" }]} />

        <h1 className="ww-serif text-[clamp(2rem,4vw,2.8rem)] leading-tight mb-4">
          Find a Walker
        </h1>
        <p className="text-[var(--muted)] text-lg leading-relaxed max-w-[760px] mb-10">
          Browse approved walker profiles and pick the best match for your
          dog&apos;s routine, temperament, and preferred walk style.
        </p>

        {walkers.length === 0 ? (
          <div className="rounded-2xl bg-[var(--warm-white)] border border-[var(--green)]/10 p-8">
            <h2 className="ww-serif text-2xl mb-3">No walker profiles live yet</h2>
            <p className="text-[var(--muted)] mb-6 max-w-[640px]">
              The directory is ready, but there are no approved public walker
              profiles to show yet.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 bg-[var(--green)] text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Join as a Walker
              </Link>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-white text-[var(--text)] border-2 border-[var(--green)]/20 px-7 py-3 rounded-full font-semibold hover:border-[var(--green)]/40 transition-colors"
              >
                Book a Walk
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {walkers.map((walker) => (
              <article
                key={walker.id}
                className="rounded-2xl bg-[var(--warm-white)] border border-[var(--green)]/10 p-6 shadow-[var(--shadow)]"
              >
                <div className="flex items-start gap-4 mb-4">
                  {walker.image ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={walker.image}
                        alt={`${walker.name || "Walker"} profile image`}
                        className="w-14 h-14 rounded-full object-cover border border-[var(--green)]/20"
                        loading="lazy"
                      />
                    </>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[var(--green)] text-white flex items-center justify-center font-semibold">
                      {getInitials(walker.name)}
                    </div>
                  )}
                  <div>
                    <h2 className="ww-serif text-[1.45rem] leading-tight">
                      {walker.name || "Walker"}
                    </h2>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      Updated{" "}
                      {walker.updatedAt.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  {walker.walkerServiceArea && (
                    <p className="text-sm text-[var(--text)] flex items-start gap-2">
                      <Icons.MapPin size={16} className="mt-0.5 text-[var(--green)] shrink-0" />
                      <span>{walker.walkerServiceArea}</span>
                    </p>
                  )}

                  {walker.walkerAvailability && (
                    <p className="text-sm text-[var(--text)] flex items-start gap-2">
                      <Icons.Clock size={16} className="mt-0.5 text-[var(--green)] shrink-0" />
                      <span>{walker.walkerAvailability}</span>
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {typeof walker.walkerRatePerHour === "number" && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(107,158,126,0.12)] text-[var(--deep-green)]">
                        £{walker.walkerRatePerHour}/hour
                      </span>
                    )}
                    {typeof walker.walkerExperienceYears === "number" && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(232,149,106,0.12)] text-[var(--brown)]">
                        {walker.walkerExperienceYears} year{walker.walkerExperienceYears === 1 ? "" : "s"} experience
                      </span>
                    )}
                  </div>

                  {walker.walkerBio && (
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {walker.walkerBio}
                    </p>
                  )}
                </div>

                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 bg-[var(--green)] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Book a Meet &amp; Greet
                </Link>
              </article>
            ))}
          </div>
        )}
      </Section>
    </PageLayout>
  );
}
