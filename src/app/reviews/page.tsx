import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TestimonialCard } from "@/components/TestimonialCard";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Read feedback from dog owners in Fulham and SW6 who book with Will's Walks.",
  alternates: { canonical: `${siteConfig.siteUrl}/reviews` },
  openGraph: {
    title: "Will's Walks Reviews",
    description: "Feedback from Fulham and SW6 dog owners using Will's Walks.",
    url: `${siteConfig.siteUrl}/reviews`,
    type: "website",
  },
};

const reviews = [
  {
    quote: "Always on time, always calm. Our dog is more settled since starting weekly walks.",
    name: "Hannah P.",
    area: "Fulham",
  },
  {
    quote: "Great communication and sensible handling. The updates are clear and reassuring.",
    name: "Tom B.",
    area: "SW6",
  },
  {
    quote: "Small groups are exactly what we wanted. No chaos and no huge packs.",
    name: "Leila D.",
    area: "Parsons Green",
  },
  {
    quote: "Meet and greet was detailed and professional. We felt comfortable from day one.",
    name: "Chris W.",
    area: "Walham Green",
  },
  {
    quote: "Consistent care each week. Our retriever now waits at the door for walk time.",
    name: "Marta S.",
    area: "Sands End",
  },
  {
    quote: "Clear boundaries, calm pace, and thoughtful updates after each session.",
    name: "Alex N.",
    area: "Fulham",
  },
] as const;

export default function ReviewsPage() {
  return (
    <>
      <Nav />

      <main>
        <section className="py-16 sm:py-20">
          <Container>
            <h1 className="text-4xl leading-tight text-slate-900 sm:text-5xl">Client reviews</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Feedback from owners who wanted calm, consistent walks in Fulham and SW6.
            </p>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <TestimonialCard key={review.name} quote={review.quote} name={review.name} area={review.area} />
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <h2 className="text-3xl leading-tight text-slate-900">How reviews work</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              Reviews are gathered from active clients after regular walks and meet and greet onboarding.
            </p>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <h2 className="text-3xl leading-tight text-slate-900">Ready to book your meet and greet?</h2>
            <Link href="/book" className="btn-primary mt-6">
              Book now
            </Link>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
