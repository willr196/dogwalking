import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Icons } from "@/components/willswalks/Icons";
import { AREAS, WALK_PRICE } from "@/components/willswalks/constants";
import { JsonLd } from "@/components/willswalks/JsonLd";
import { siteConfig } from "@/lib/site.config";
import { PageLayout } from "@/components/willswalks/PageLayout";

export const revalidate = 60;

async function getReviewCount() {
  try {
    return await prisma.review.count();
  } catch (error) {
    console.warn("Failed to fetch review count, defaulting to 0.", error);
    return 0;
  }
}

export default async function Home() {
  const reviewCount = await getReviewCount();
  const whatsappNumber = siteConfig.owner.whatsapp || "447000000000";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Will's Walks",
          description: "Solo dog walking in Fulham, SW6. Dedicated one-on-one walks.",
          url: "https://willswalks.co.uk",
          telephone: siteConfig.owner.phone || "+447000000000",
          email: siteConfig.owner.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Fulham",
            addressRegion: "London",
            postalCode: "SW6",
            addressCountry: "GB",
          },
          areaServed: AREAS.map((a) => ({ "@type": "City", name: a })),
          priceRange: `£${WALK_PRICE}`,
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "07:00",
            closes: "19:00",
          },
        }}
      />

      <PageLayout>
        <section className="px-5 pb-14 pt-6 md:pb-18">
          <div className="ww-container grid items-start gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
            <div className="anim-fade-up">
              <p className="ww-kicker mb-4">Fulham dog walking, done properly</p>
              <h1 className="ww-serif text-[clamp(2.25rem,5.3vw,4.55rem)] leading-[1.01] tracking-[-0.03em] text-[var(--text)]">
                Calm, structured walks for dogs that need consistent care.
              </h1>
              <p className="mt-5 max-w-[640px] text-[clamp(1rem,1.7vw,1.2rem)] leading-relaxed text-[var(--muted)]">
                Solo and small-group walks across SW6 with clear communication, sensible safety standards,
                and a routine your dog can settle into.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-7 py-3.5 text-sm font-bold text-white no-underline shadow-[0_12px_24px_rgba(14,68,94,0.3)] transition-all hover:-translate-y-0.5"
                >
                  Book a Meet &amp; Greet
                  <Icons.ArrowRight size={16} color="white" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--text)] no-underline transition-colors hover:border-[var(--green)]/45"
                >
                  See Services
                </Link>
              </div>

              <ul className="mt-7 grid gap-2.5 text-[14px] sm:grid-cols-2">
                <li className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/86 px-3.5 py-2 text-[var(--muted)]">
                  <Icons.Check size={15} color="var(--green)" />
                  Walk notes after each session
                </li>
                <li className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/86 px-3.5 py-2 text-[var(--muted)]">
                  <Icons.Check size={15} color="var(--green)" />
                  Meet &amp; greet before first booking
                </li>
                <li className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/86 px-3.5 py-2 text-[var(--muted)]">
                  <Icons.Check size={15} color="var(--green)" />
                  Max {siteConfig.pricing.maxDogsPerWalk} dogs in group walks
                </li>
                <li className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/86 px-3.5 py-2 text-[var(--muted)]">
                  <Icons.Check size={15} color="var(--green)" />
                  {siteConfig.pricing.walkDuration}-minute walk blocks
                </li>
              </ul>
            </div>

            <aside className="anim-fade-up ww-card p-6 md:p-7" aria-label="Service snapshot">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--deep-green)]/75">
                This week
              </p>
              <h2 className="ww-serif mt-2 text-[2rem] leading-tight text-[var(--text)]">
                Meet &amp; greet slots available
              </h2>

              <div className="mt-5 rounded-2xl border border-[var(--line)] bg-white p-4">
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--muted)]">
                      Starting from
                    </dt>
                    <dd className="ww-serif mt-1 text-[2rem] leading-none text-[var(--deep-green)]">£{WALK_PRICE}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--muted)]">
                      Walk length
                    </dt>
                    <dd className="mt-2 text-base font-semibold text-[var(--text)]">
                      {siteConfig.pricing.walkDuration} minutes
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--muted)]">Coverage</dt>
                    <dd className="mt-2 text-base font-semibold text-[var(--text)]">Fulham and SW6 nearby</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--muted)]">Reviews</dt>
                    <dd className="mt-2 text-base font-semibold text-[var(--text)]">
                      {reviewCount > 0 ? `${reviewCount} published` : "Founding clients welcome"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {AREAS.slice(0, 4).map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--deep-green)]"
                  >
                    <Icons.MapPin size={13} />
                    {area}
                  </span>
                ))}
              </div>

              <Link
                href="/booking"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-5 py-3 text-sm font-semibold text-white no-underline shadow-[0_10px_22px_rgba(14,68,94,0.28)]"
              >
                Reserve a Walk Slot
                <Icons.ArrowRight size={15} color="white" />
              </Link>
            </aside>
          </div>
        </section>

        <section id="services" className="border-y border-[var(--line)] bg-white/58 px-5 py-14 md:py-18">
          <div className="ww-container">
            <div className="mb-8 max-w-[740px]">
              <p className="ww-kicker mb-4">Services</p>
              <h2 className="ww-serif text-[clamp(1.9rem,4vw,3rem)] leading-tight">Choose the walk style that suits your dog</h2>
              <p className="mt-3 text-[var(--muted)]">
                Every booking starts with a meet &amp; greet, then we set a repeatable routine that fits your
                dog&apos;s temperament and your schedule.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {siteConfig.services.map((service) => (
                <article key={service.slug} className="ww-card p-6 md:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--deep-green)]/75">
                    {service.shortName}
                  </p>
                  <h3 className="ww-serif mt-2 text-[1.7rem] leading-tight text-[var(--text)]">{service.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{service.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-semibold text-[var(--deep-green)]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="ww-serif text-[2rem] leading-none text-[var(--deep-green)]">£{WALK_PRICE}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">{service.duration}</p>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--deep-green)] no-underline"
                    >
                      View details
                      <Icons.ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 md:py-18">
          <div className="ww-container">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="ww-kicker mb-4">How it works</p>
                <h2 className="ww-serif text-[clamp(1.8rem,3.5vw,2.7rem)] leading-tight">
                  A clear routine from first chat to regular walks
                </h2>
              </div>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--deep-green)] no-underline"
              >
                Start booking
                <Icons.ArrowRight size={15} />
              </Link>
            </div>

            <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {siteConfig.howItWorks.map((step) => (
                <li key={step.step} className="ww-card p-4 md:p-5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] text-sm font-bold text-white">
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-[15px] font-semibold text-[var(--text)]">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="about" className="px-5 py-14 md:py-18">
          <div className="ww-container grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="rounded-[30px] bg-[linear-gradient(155deg,var(--dark-green),var(--deep-green))] p-6 text-white shadow-[var(--shadow-lg)] md:p-8">
              <p className="ww-kicker border-white/36 bg-white/10 text-white">About</p>
              <h2 className="ww-serif mt-4 text-[clamp(1.9rem,3.4vw,2.6rem)] leading-tight text-white">
                Walks designed around your dog&apos;s behaviour, not a one-size route.
              </h2>
              <p className="mt-4 max-w-[640px] leading-relaxed text-white/84">
                I&apos;m {siteConfig.owner.name}, a Fulham local focused on dependable routines and calm handling.
                Your dog gets consistent structure, and you get straightforward communication after every walk.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/20 bg-white/8 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-white/70">Walk style</p>
                  <p className="mt-2 font-semibold">Solo first, small groups when suitable</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/8 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-white/70">Coverage</p>
                  <p className="mt-2 font-semibold">Fulham and nearby SW6 routes</p>
                </div>
              </div>
            </article>

            <div className="grid gap-4">
              {siteConfig.trustSignals.map((signal) => (
                <article key={signal.title} className="ww-card p-5 md:p-6">
                  <h3 className="text-base font-semibold text-[var(--text)]">{signal.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{signal.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-2 pt-14 md:pt-18">
          <div className="ww-container grid gap-6 lg:grid-cols-2">
            <article className="ww-card p-6 md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--deep-green)]/75">
                Coverage
              </p>
              <h2 className="ww-serif mt-2 text-[clamp(1.7rem,3vw,2.4rem)] leading-tight">Areas covered each week</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Regular walking routes across Fulham and surrounding SW6 spots. If you&apos;re nearby, reach out and
                I&apos;ll confirm fit and timings.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {AREAS.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--deep-green)]"
                  >
                    <Icons.MapPin size={13} />
                    {area}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-[30px] bg-[linear-gradient(140deg,var(--orange),var(--deep-green))] p-7 text-white shadow-[var(--shadow-lg)] md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-white/72">Ready to start?</p>
              <h2 className="ww-serif mt-3 text-[clamp(1.9rem,3.7vw,2.85rem)] leading-tight text-white">
                Book your dog&apos;s first walk this week
              </h2>
              <p className="mt-3 max-w-[560px] leading-relaxed text-white/86">
                Start with a meet &amp; greet and we&apos;ll build a regular schedule that works for your dog and your
                week.
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-white/90">
                <span className="inline-flex items-center gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icons.Star key={i} size={16} filled />
                  ))}
                </span>
                <span>{reviewCount > 0 ? `${reviewCount} owner review${reviewCount === 1 ? "" : "s"}` : "Founding client spaces currently open"}</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--deep-green)] no-underline"
                >
                  Book now
                  <Icons.ArrowRight size={15} />
                </Link>
                <Link
                  href="/reviews"
                  className="inline-flex items-center gap-2 rounded-full border border-white/36 bg-white/10 px-6 py-3 text-sm font-semibold text-white no-underline"
                >
                  Read reviews
                </Link>
              </div>
            </article>
          </div>
        </section>
      </PageLayout>

      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-[980] flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl no-underline"
        aria-label="Contact via WhatsApp"
      >
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="whatsapp-label">WhatsApp</span>
      </a>
    </>
  );
}
