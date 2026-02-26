import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";
import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";
import { BookClient } from "@/app/book/BookClient";

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
        <section className="py-16 sm:py-20">
          <Container>
            <h1 className="text-4xl leading-tight text-slate-900 sm:text-5xl">Book your meet and greet</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Start with a free meet and greet before your first walk. Fulham and SW6 only.
            </p>
          </Container>
        </section>

        <BookClient />
      </main>
    </>
  );
}
