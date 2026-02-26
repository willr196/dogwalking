import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";

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
        <section className="py-16 sm:py-20">
          <Container>
            <h1 className="text-4xl leading-tight text-slate-900 sm:text-5xl">About Will&apos;s Walks</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              A calm, professional dog walking service built for dogs that thrive on consistency.
            </p>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="grid gap-8 md:grid-cols-[260px_1fr] md:items-start">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <Image
                  src="/will-placeholder.svg"
                  alt="Portrait placeholder for Will"
                  width={600}
                  height={760}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-3xl leading-tight text-slate-900">Hi, I&apos;m Will.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                  I am Fulham-based and keep my client list intentionally small. You get clear updates, the same
                  handler each week, and walks planned around your dog&apos;s pace and confidence.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <h2 className="text-3xl leading-tight text-slate-900">Trust and qualifications</h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li>Insurance status: Placeholder (add).</li>
              <li>Experience details: Placeholder (add).</li>
              <li>Handling style: safety-first, calm routines.</li>
            </ul>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <h2 className="text-3xl leading-tight text-slate-900">Coverage map</h2>
            <p className="mt-4 text-sm text-slate-600">Fulham and SW6 focused routes.</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <iframe
                title="Map of Fulham SW6 coverage"
                src="https://www.google.com/maps?q=Fulham%20SW6&output=embed"
                width="100%"
                height="360"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <h2 className="text-3xl leading-tight text-slate-900">Want to meet first?</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              Every new dog starts with a free meet and greet before walks begin.
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
