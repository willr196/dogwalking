import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";
import { Icons } from "@/components/willswalks/Icons";
import { getApprovedWalkersForPublicDirectory } from "@/lib/walkers.server";

export const metadata: Metadata = {
  title: `Find a Walker | ${siteConfig.brandName}`,
  description:
    "Browse approved walker profiles with service area, rates, availability, and experience details.",
  alternates: { canonical: `${siteConfig.siteUrl}/walkers` },
  openGraph: {
    title: `Find a Walker | ${siteConfig.brandName}`,
    description: "Explore approved walker profiles and choose the right fit for your dog.",
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

        <h1 className="ww-serif mb-4 text-[clamp(2.05rem,4.2vw,3rem)] leading-tight">Find a Walker</h1>
        <p className="mb-10 max-w-[760px] text-lg leading-relaxed text-[var(--muted)]">
          Browse approved walker profiles and choose the best match for your dog&apos;s temperament, routine,
          and preferred walking style.
        </p>

        {walkers.length === 0 ? (
          <div className="rounded-lg border border-[var(--line)] bg-white p-8">
            <h2 className="ww-serif mb-3 text-[1.7rem] leading-tight">No walker profiles live yet</h2>
            <p className="mb-6 max-w-[640px] leading-relaxed text-[var(--muted)]">
              The directory is ready, but there are no approved public walker profiles at the moment.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-7 py-3 text-sm font-semibold text-white no-underline"
              >
                Join as a Walker
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-white px-7 py-3 text-sm font-semibold text-[var(--text)] no-underline"
              >
                Book a Walk
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {walkers.map((walker) => (
              <article key={walker.id} className="ww-card p-6">
                <div className="mb-4 flex items-start gap-4">
                  {walker.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={walker.image}
                      alt={`${walker.name || "Walker"} profile image`}
                      className="h-14 w-14 rounded-full border border-[var(--line)] object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--deep-green)] text-sm font-semibold text-white">
                      {getInitials(walker.name)}
                    </div>
                  )}

                  <div>
                    <h2 className="ww-serif text-[1.5rem] leading-tight">{walker.name || "Walker"}</h2>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Updated{" "}
                      {walker.updatedAt.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="mb-5 space-y-3">
                  {walker.walkerServiceArea ? (
                    <p className="flex items-start gap-2 text-sm text-[var(--text)]">
                      <Icons.MapPin size={16} className="mt-0.5 shrink-0 text-[var(--green)]" />
                      <span>{walker.walkerServiceArea}</span>
                    </p>
                  ) : null}

                  {walker.walkerAvailability ? (
                    <p className="flex items-start gap-2 text-sm text-[var(--text)]">
                      <Icons.Clock size={16} className="mt-0.5 shrink-0 text-[var(--green)]" />
                      <span>{walker.walkerAvailability}</span>
                    </p>
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    {typeof walker.walkerRatePerHour === "number" ? (
                      <span className="rounded-full border border-[rgba(15,141,135,0.26)] bg-[rgba(15,141,135,0.12)] px-3 py-1 text-xs font-semibold text-[var(--deep-green)]">
                        £{walker.walkerRatePerHour}/hour
                      </span>
                    ) : null}
                    {typeof walker.walkerExperienceYears === "number" ? (
                      <span className="rounded-full border border-[rgba(242,120,69,0.25)] bg-[rgba(242,120,69,0.1)] px-3 py-1 text-xs font-semibold text-[var(--deep-orange)]">
                        {walker.walkerExperienceYears} year{walker.walkerExperienceYears === 1 ? "" : "s"} experience
                      </span>
                    ) : null}
                  </div>

                  {walker.walkerBio ? <p className="text-sm leading-relaxed text-[var(--muted)]">{walker.walkerBio}</p> : null}
                </div>

                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-6 py-2.5 text-sm font-semibold text-white no-underline"
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
