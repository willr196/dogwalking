import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";

export const metadata: Metadata = {
  title: "Calm Dog Walking in Fulham",
  description:
    "Calm, safety-first dog walking in Fulham and SW6. Solo and small-group walks, clear photo updates, and a required meet and greet.",
  alternates: { canonical: `${siteConfig.siteUrl}/` },
  openGraph: {
    title: "Will's Walks | Calm Dog Walking in Fulham",
    description: "Solo and small-group dog walks in SW6 with clear updates and max three dogs per group.",
    url: `${siteConfig.siteUrl}/`,
    type: "website",
  },
};

const testimonials = [
  {
    quote: "Reliable, calm, and always sends updates. Our spaniel settled into the routine straight away.",
    name: "Anna M.",
    area: "Fulham",
  },
  {
    quote: "The small group setup is perfect. Max three dogs makes a big difference for safety.",
    name: "James R.",
    area: "Parsons Green",
  },
  {
    quote: "Meet and greet was thorough and thoughtful. Communication is always clear and professional.",
    name: "Priya L.",
    area: "SW6",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Nav />

      <main>
        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Fulham and SW6</p>
                <h1 className="mt-4 text-4xl leading-tight text-slate-900 sm:text-5xl">
                  Calm walks. Consistent care.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                  Safety-first handling, clear photo updates, and reliable weekly routines for dogs that thrive on
                  calm consistency.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href="/book" className="btn-primary">
                    Book now
                  </Link>
                  <Link href="/services" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
                    See services
                  </Link>
                </div>

                <p className="mt-4 text-sm text-slate-500">Fulham &amp; SW6 • £13 • 60 min • Max 3 dogs</p>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <Image
                  src="/hero-fulham-park-placeholder.svg"
                  alt="Dog walking in Fulham park"
                  width={1200}
                  height={900}
                  priority
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <h2 className="text-3xl leading-tight text-slate-900">Services</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <ServiceCard
                title="Solo Walk"
                summary="One-to-one walks for dogs that prefer a focused, quieter session."
                price="£13"
                duration="60 min"
              />
              <ServiceCard
                title="Small Group Walk"
                summary="Carefully matched social walks with a strict maximum of three dogs."
                price="£13"
                duration="60 min"
              />
            </div>
          </Container>
        </section>

        <section className="border-y border-slate-200 py-16">
          <Container>
            <h2 className="text-3xl leading-tight text-slate-900">Why local owners choose Will&apos;s Walks</h2>
            <ul className="mt-6 grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-sky-700" />
                Max 3 dogs
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-sky-700" />
                Photo updates
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-sky-700" />
                Safety-first handling
              </li>
            </ul>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <h2 className="text-3xl leading-tight text-slate-900">Client reviews</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {testimonials.map((item) => (
                <TestimonialCard key={item.name} quote={item.quote} name={item.name} area={item.area} />
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
