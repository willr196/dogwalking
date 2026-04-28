import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Icons } from "@/components/willswalks/Icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Solo and small-group 60-minute dog walks in Fulham and SW6. Founding rate £13, clear updates, and meet and greet required.",
  alternates: { canonical: `${siteConfig.siteUrl}/services` },
  openGraph: {
    title: "Will's Walks Services",
    description: "Solo and small-group walks in Fulham, with max three dogs per group and clear updates.",
    url: `${siteConfig.siteUrl}/services`,
    type: "website",
  },
};

const faqItems = [
  {
    question: "Do all new dogs need a meet and greet?",
    answer: "Yes. It is required before first booking so I can assess temperament, routine, and handling preferences.",
  },
  {
    question: "How many dogs are in small-group walks?",
    answer: "A strict maximum of three dogs, matched by temperament and pace.",
  },
  {
    question: "Do I get updates after each walk?",
    answer: "Yes. Every walk includes a short message and photo update.",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <Nav />

      <main>
        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="puppy-tag">
                  <Icons.Dog size={14} /> Services
                </p>
                <h1 className="mt-5 text-5xl leading-none text-[var(--text)] sm:text-6xl">
                  Walks for every kind of wag.
                </h1>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Solo or tiny group walks across Fulham and SW6. Every plan starts with a meet and greet, then settles
                into a cheerful weekly rhythm your dog can recognise.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="ww-card ww-card-hover p-6 md:p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(255,217,93,0.34)] text-[var(--deep-orange)]">
                  <Icons.Heart size={22} filled />
                </div>
                <h2 className="text-3xl leading-tight text-[var(--text)]">Solo Sniff Stroll</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  One-to-one sessions for dogs that do best with focused handling, quieter routes, or a bit more
                  reassurance.
                </p>
                <p className="mt-5 text-sm font-black text-[var(--deep-green)]">
                  {siteConfig.pricing.walkDuration} min / £{siteConfig.pricing.introPrice}
                </p>
                <ul className="mt-5 space-y-3 text-sm text-[var(--text)]">
                  <li className="flex gap-2"><Icons.Check size={16} className="mt-0.5 shrink-0 text-[var(--green)]" /> Individual route and pace</li>
                  <li className="flex gap-2"><Icons.Camera size={16} className="mt-0.5 shrink-0 text-[var(--green)]" /> Photo update after every walk</li>
                  <li className="flex gap-2"><Icons.Shield size={16} className="mt-0.5 shrink-0 text-[var(--green)]" /> Routine-focused handling</li>
                </ul>
                <Link href="/services/solo-dog-walking" className="btn-secondary mt-6 text-sm">
                  <Icons.ArrowRight size={16} /> Solo details
                </Link>
              </article>

              <article className="ww-card ww-card-hover p-6 md:p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(116,189,242,0.18)] text-[var(--deep-green)]">
                  <Icons.Dog size={22} />
                </div>
                <h2 className="text-3xl leading-tight text-[var(--text)]">Tiny Pack Walk</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Social walks with carefully matched dogs, close supervision, and no big-pack chaos.
                </p>
                <p className="mt-5 text-sm font-black text-[var(--deep-green)]">
                  {siteConfig.pricing.walkDuration} min / £{siteConfig.pricing.introPrice}
                </p>
                <ul className="mt-5 space-y-3 text-sm text-[var(--text)]">
                  <li className="flex gap-2"><Icons.Check size={16} className="mt-0.5 shrink-0 text-[var(--green)]" /> Strict max of {siteConfig.pricing.maxDogsPerWalk} dogs</li>
                  <li className="flex gap-2"><Icons.Shield size={16} className="mt-0.5 shrink-0 text-[var(--green)]" /> Compatibility checked first</li>
                  <li className="flex gap-2"><Icons.Camera size={16} className="mt-0.5 shrink-0 text-[var(--green)]" /> Photo update after every walk</li>
                </ul>
                <Link href="/services/small-group-dog-walking" className="btn-secondary mt-6 text-sm">
                  <Icons.ArrowRight size={16} /> Group details
                </Link>
              </article>
            </div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <h2 className="text-4xl leading-tight text-[var(--text)]">Simple pricing</h2>
            <div className="mt-6 overflow-hidden rounded-lg border-2 border-[var(--line)] bg-white shadow-[var(--shadow-soft)]">
              <table className="w-full border-collapse text-left text-sm text-[var(--text)]">
                <thead className="bg-[rgba(255,217,93,0.2)] text-[var(--deep-orange)]">
                  <tr>
                    <th className="px-5 py-3 font-black">Service</th>
                    <th className="px-5 py-3 font-black">Duration</th>
                    <th className="px-5 py-3 font-black">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[var(--line)]">
                    <td className="px-5 py-3">Solo Sniff Stroll</td>
                    <td className="px-5 py-3">{siteConfig.pricing.walkDuration} min</td>
                    <td className="px-5 py-3">£{siteConfig.pricing.introPrice} founding rate</td>
                  </tr>
                  <tr className="border-t border-[var(--line)]">
                    <td className="px-5 py-3">Tiny Pack Walk</td>
                    <td className="px-5 py-3">{siteConfig.pricing.walkDuration} min</td>
                    <td className="px-5 py-3">£{siteConfig.pricing.introPrice} founding rate</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm font-semibold text-[var(--muted)]">Meet and greet required before first booking.</p>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <h2 className="text-4xl leading-tight text-[var(--text)]">Quick questions</h2>
            <div className="mt-6">
              <FAQAccordion items={[...faqItems]} />
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="ww-card ww-card-accent p-7 md:p-9">
              <h2 className="text-4xl leading-tight text-[var(--text)]">Book a free meet and greet.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                We will confirm fit, routine, and the right walk style for your dog.
              </p>
              <Link href="/book" className="btn-primary mt-6">
                <Icons.Calendar size={18} /> Book now
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
