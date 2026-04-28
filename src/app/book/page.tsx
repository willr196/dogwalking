import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BookClient } from "@/app/book/BookClient";
import { Icons } from "@/components/willswalks/Icons";

export const metadata: Metadata = {
  title: "Book Now",
  description:
    "Book a free meet and greet for dog walking in Fulham and SW6. Founding rate £13 for 60-minute walks.",
  alternates: { canonical: `${siteConfig.siteUrl}/book` },
  openGraph: {
    title: "Book with Will's Walks",
    description: "Book your free meet and greet and request preferred walk days in Fulham and SW6.",
    url: `${siteConfig.siteUrl}/book`,
    type: "website",
  },
};

export default function BookPage() {
  return (
    <>
      <Nav />

      <main>
        <section className="py-14 sm:py-20">
          <Container>
            <p className="puppy-tag">
              <Icons.Calendar size={14} /> Meet and greet
            </p>
            <h1 className="mt-5 text-5xl leading-none text-[var(--text)] sm:text-6xl">
              Let&apos;s get your dog&apos;s first walk started.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Start with a free meet and greet before your first walk. Fulham and SW6 only.
            </p>
          </Container>
        </section>

        <BookClient />
      </main>

      <Footer />
    </>
  );
}
