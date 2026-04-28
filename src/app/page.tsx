import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Icons } from "@/components/willswalks/Icons";

export const metadata: Metadata = {
  title: "Happy Dog Walking in Fulham",
  description:
    "Playful, safety-first dog walking in Fulham and SW6. Solo and tiny group walks, clear photo updates, and a required meet and greet.",
  alternates: { canonical: `${siteConfig.siteUrl}/` },
  openGraph: {
    title: "Will's Walks | Happy Dog Walking in Fulham",
    description: "Solo and tiny group dog walks in SW6 with clear updates and max three dogs per group.",
    url: `${siteConfig.siteUrl}/`,
    type: "website",
  },
};

const testimonials = [
  {
    quote: "Our spaniel comes home happy, calm, and ready for a nap. The photo updates are a lovely bonus.",
    name: "Anna M.",
    area: "Fulham",
  },
  {
    quote: "The tiny group setup is perfect. Social enough to be fun, small enough to feel really cared for.",
    name: "James R.",
    area: "Parsons Green",
  },
  {
    quote: "The meet and greet was thoughtful, and our nervous dog settled into the routine much faster than expected.",
    name: "Priya L.",
    area: "SW6",
  },
] as const;

const promises = [
  {
    title: "Tiny groups",
    text: `A strict maximum of ${siteConfig.pricing.maxDogsPerWalk} dogs keeps every walk relaxed and easy to supervise.`,
    Icon: Icons.Dog,
  },
  {
    title: "Photo pupdates",
    text: "You get a quick note and photo after each outing, so you know how the adventure went.",
    Icon: Icons.Camera,
  },
  {
    title: "Safe routines",
    text: "Routes, pace, and handling are matched to your dog's confidence, energy, and quirks.",
    Icon: Icons.Shield,
  },
] as const;

const steps = [
  "Meet first",
  "Pick the right walk",
  "Enjoy happy updates",
] as const;

export default function HomePage() {
  return (
    <>
      <Nav />

      <main>
        <section className="relative overflow-hidden py-14 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div>
                <p className="puppy-tag">
                  <Icons.MapPin size={14} /> Fulham and SW6
                </p>
                <h1 className="mt-5 text-5xl leading-none text-[var(--text)] sm:text-6xl lg:text-7xl">
                  Playful dog walks, full of puppy energy.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
                  Solo strolls and tiny group walks for dogs who love a good sniff, a cheerful pace, and a familiar
                  local routine.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href="/book" className="btn-primary">
                    <Icons.Calendar size={18} /> Book a meet &amp; greet
                  </Link>
                  <Link href="/services" className="btn-secondary text-sm">
                    <Icons.ArrowRight size={16} /> See walk options
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <span className="home-chip">£{siteConfig.pricing.introPrice} founding rate</span>
                  <span className="home-chip">{siteConfig.pricing.walkDuration} minute walks</span>
                  <span className="home-chip">Max {siteConfig.pricing.maxDogsPerWalk} dogs</span>
                </div>
              </div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-lg border-2 border-white bg-white p-2 shadow-[0_20px_44px_rgba(76,55,30,0.16)]">
                  <Image
                    src="/hero-fulham-park-luxe.svg"
                    alt="Dog walking in a bright Fulham park"
                    width={1200}
                    height={780}
                    priority
                    className="h-full w-full rounded-md object-cover"
                    sizes="(min-width: 1024px) 52vw, 100vw"
                  />
                  <div className="absolute left-5 top-5 rounded-lg border-2 border-white bg-[rgba(255,253,247,0.9)] px-4 py-3 shadow-[0_10px_24px_rgba(76,55,30,0.12)]">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--deep-orange)]">
                      Today&apos;s walkies
                    </p>
                    <p className="mt-1 text-sm font-black text-[var(--deep-green)]">Sniffs, play, home happy</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {promises.map(({ title, Icon }) => (
                    <div key={title} className="ww-card flex items-center gap-3 px-4 py-3">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(255,217,93,0.36)] text-[var(--deep-orange)]">
                        <Icon size={18} />
                      </span>
                      <span className="text-sm font-black text-[var(--text)]">{title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--deep-orange)]">Walk options</p>
              <h2 className="mt-3 text-4xl leading-tight text-[var(--text)]">Pick the walk that fits your dog.</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Same cheerful updates, same careful handling, with the format chosen around your dog&apos;s personality.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <ServiceCard
                title="Solo Sniff Stroll"
                summary="One-to-one walks for dogs who prefer a quieter outing, steady pace, or a little extra confidence."
                price={`£${siteConfig.pricing.introPrice}`}
                duration={`${siteConfig.pricing.walkDuration} min`}
              />
              <ServiceCard
                title="Tiny Pack Walk"
                summary={`Carefully matched social walks with a strict maximum of ${siteConfig.pricing.maxDogsPerWalk} dogs.`}
                price={`£${siteConfig.pricing.introPrice}`}
                duration={`${siteConfig.pricing.walkDuration} min`}
              />
            </div>
          </Container>
        </section>

        <section className="border-y-2 border-[rgba(23,98,79,0.12)] bg-[rgba(255,255,255,0.34)] py-14">
          <Container>
            <div className="grid gap-5 md:grid-cols-3">
              {promises.map(({ title, text, Icon }) => (
                <article key={title} className="ww-card p-6">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(116,189,242,0.18)] text-[var(--deep-green)]">
                    <Icon size={22} />
                  </div>
                  <h2 className="text-2xl leading-tight text-[var(--text)]">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step} className="ww-card p-6">
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--deep-orange)]">
                    Step {index + 1}
                  </p>
                  <h2 className="mt-3 text-2xl leading-tight text-[var(--text)]">{step}</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {index === 0
                      ? "A free meet and greet helps me learn your dog's routine, confidence, and favourite scratches."
                      : index === 1
                        ? "We choose solo or tiny group walks based on temperament, pace, and what feels enjoyable."
                        : "After each walk, you get a quick update so the happy routine is easy to trust."}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--deep-orange)]">
                  Happy humans
                </p>
                <h2 className="mt-3 text-4xl leading-tight text-[var(--text)]">Loved by local dog owners.</h2>
              </div>
              <Link href="/reviews" className="btn-secondary w-fit text-sm">
                <Icons.ArrowRight size={16} /> More reviews
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {testimonials.map((item) => (
                <TestimonialCard key={item.name} quote={item.quote} name={item.name} area={item.area} />
              ))}
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="ww-card ww-card-accent grid gap-6 p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--deep-orange)]">
                  Ready for walkies?
                </p>
                <h2 className="mt-3 text-4xl leading-tight text-[var(--text)]">Let&apos;s meet your dog first.</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                  Every new dog starts with a free meet and greet, so the first walk feels familiar instead of rushed.
                </p>
              </div>
              <Link href="/book" className="btn-primary w-fit">
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
