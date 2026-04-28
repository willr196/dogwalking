import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Icons } from "@/components/willswalks/Icons";

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
        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="puppy-tag">
                  <Icons.Star size={14} filled /> Reviews
                </p>
                <h1 className="mt-5 text-5xl leading-none text-[var(--text)] sm:text-6xl">
                  Happy dogs, happy humans.
                </h1>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Feedback from owners who wanted playful, consistent walks with small groups and clear updates in
                Fulham and SW6.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <TestimonialCard key={review.name} quote={review.quote} name={review.name} area={review.area} />
              ))}
            </div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <div className="ww-card grid gap-5 p-6 md:grid-cols-3 md:p-7">
              <div className="md:col-span-1">
                <h2 className="text-3xl leading-tight text-[var(--text)]">How reviews work</h2>
              </div>
              <p className="text-sm leading-7 text-[var(--muted)] md:col-span-2">
                Reviews are gathered from active clients after regular walks and meet and greet onboarding. The useful
                details are simple: settled dogs, clear communication, and a routine owners can trust.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="ww-card ww-card-accent p-7 md:p-9">
              <h2 className="text-4xl leading-tight text-[var(--text)]">Ready to book your meet and greet?</h2>
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
