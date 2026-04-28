import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Icons } from "@/components/willswalks/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Will, a Fulham-based dog walker focused on calm routines, safety-first handling, and reliable updates.",
  alternates: { canonical: `${siteConfig.siteUrl}/about` },
  openGraph: {
    title: "About Will's Walks",
    description: "Meet Will and learn the calm, safety-first approach behind Will's Walks in SW6.",
    url: `${siteConfig.siteUrl}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav />

      <main>
        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="puppy-tag">
                  <Icons.Heart size={14} filled /> About Will
                </p>
                <h1 className="mt-5 text-5xl leading-none text-[var(--text)] sm:text-6xl">
                  Local walks with a soft spot for happy dogs.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                  Will&apos;s Walks is built around small groups, steady handling, and the kind of familiar routine that
                  helps dogs relax into their week.
                </p>
              </div>
              <div className="overflow-hidden rounded-lg border-2 border-white bg-white p-2 shadow-[0_20px_44px_rgba(76,55,30,0.16)]">
                <Image
                  src="/hero-fulham-park-luxe.svg"
                  alt="Illustrated local dog walk in a bright park"
                  width={1200}
                  height={780}
                  className="h-full w-full rounded-md object-cover"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <div className="grid gap-8 md:grid-cols-[280px_1fr] md:items-start">
              <div className="overflow-hidden rounded-lg border-2 border-white bg-white p-2 shadow-[var(--shadow-soft)]">
                <Image
                  src="/will-placeholder.svg"
                  alt="Illustration of Will with a dog"
                  width={600}
                  height={760}
                  className="h-full w-full rounded-md object-cover"
                />
              </div>

              <div className="ww-card p-6 md:p-7">
                <h2 className="text-4xl leading-tight text-[var(--text)]">Hi, I&apos;m Will.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                  I am Fulham-based and keep my client list intentionally small. You get clear updates, the same
                  handler each week, and walks planned around your dog&apos;s pace and confidence.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <span className="home-chip">Small client list</span>
                  <span className="home-chip">Local SW6 routes</span>
                  <span className="home-chip">Meet first</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <h2 className="text-4xl leading-tight text-[var(--text)]">What guides every walk</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Meet and greet first",
                  text: "Every new dog is met before walks begin, so temperament and routines are understood early.",
                  Icon: Icons.Heart,
                },
                {
                  title: "Clear safety rules",
                  text: "Handling, lead rules, and group fit are kept simple, consistent, and agreed upfront.",
                  Icon: Icons.Shield,
                },
                {
                  title: "Cheerful updates",
                  text: "Owners get a short update after each walk, with photos when possible.",
                  Icon: Icons.Camera,
                },
              ].map(({ title, text, Icon }) => (
                <article key={title} className="ww-card p-6">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[rgba(255,217,93,0.34)] text-[var(--deep-orange)]">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-2xl leading-tight text-[var(--text)]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-12">
          <Container>
            <h2 className="text-4xl leading-tight text-[var(--text)]">Coverage map</h2>
            <p className="mt-4 text-sm text-[var(--muted)]">Fulham and SW6 focused routes.</p>
            <div className="mt-6 overflow-hidden rounded-lg border-2 border-white bg-white p-2 shadow-[var(--shadow-soft)]">
              <iframe
                title="Map of Fulham SW6 coverage"
                src="https://www.google.com/maps?q=Fulham%20SW6&output=embed"
                width="100%"
                height="360"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-md"
              />
            </div>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <div className="ww-card ww-card-accent p-7 md:p-9">
              <h2 className="text-4xl leading-tight text-[var(--text)]">Want to meet first?</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                Every new dog starts with a free meet and greet before walks begin.
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
