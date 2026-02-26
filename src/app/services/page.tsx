import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { FAQAccordion } from "@/components/FAQAccordion";

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
        <section className="py-16 sm:py-20">
          <Container>
            <h1 className="text-4xl leading-tight text-slate-900 sm:text-5xl">Walk services built around your dog.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Solo or small-group 60-minute walks across Fulham and SW6. Every plan starts with a meet and greet.
            </p>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl text-slate-900">Solo Walk</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  One-to-one sessions for dogs that do best with focused, calm handling.
                </p>
                <p className="mt-4 text-sm font-semibold text-slate-800">60 min · £13</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>Individual route and pace</li>
                  <li>Photo update after every walk</li>
                  <li>Routine-focused handling</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl text-slate-900">Small Group Walk (max 3)</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Social walks with carefully matched dogs and close supervision.
                </p>
                <p className="mt-4 text-sm font-semibold text-slate-800">60 min · £13</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>Strict max of three dogs</li>
                  <li>Compatibility checked first</li>
                  <li>Photo update after every walk</li>
                </ul>
              </article>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <h2 className="text-3xl leading-tight text-slate-900">Pricing</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full border-collapse text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Service</th>
                    <th className="px-5 py-3 font-semibold">Duration</th>
                    <th className="px-5 py-3 font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200">
                    <td className="px-5 py-3">Solo Walk</td>
                    <td className="px-5 py-3">60 min</td>
                    <td className="px-5 py-3">£13 (founding rate)</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-5 py-3">Small Group Walk</td>
                    <td className="px-5 py-3">60 min</td>
                    <td className="px-5 py-3">£13 (founding rate)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-slate-600">Meet and greet required before first booking.</p>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <h2 className="text-3xl leading-tight text-slate-900">FAQ</h2>
            <div className="mt-6">
              <FAQAccordion items={[...faqItems]} />
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <h2 className="text-3xl leading-tight text-slate-900">Book a free meet and greet.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              We will confirm fit, routine, and the right walk style for your dog.
            </p>
            <Link href="/book" className="btn-primary mt-6">
              Book now
            </Link>
          </Container>
        </section>
      </main>
    </>
  );
}
