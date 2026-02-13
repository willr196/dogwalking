import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";
import { getDogBreedsForDictionary } from "@/lib/dog-breeds.server";
import { BreedDictionary } from "./BreedDictionary";

export const metadata: Metadata = {
  title: `Dog Breed Dictionary | ${siteConfig.brandName}`,
  description:
    "An editable dog breed dictionary with a large breed list, rare-breed category, and click-open detail bubbles.",
  alternates: { canonical: `${siteConfig.siteUrl}/dog-breeds` },
  openGraph: {
    title: `Dog Breed Dictionary | ${siteConfig.brandName}`,
    description:
      "Explore a large, filterable breed dictionary and open quick profile bubbles for each breed.",
    url: `${siteConfig.siteUrl}/dog-breeds`,
    type: "website",
    locale: siteConfig.seo.locale,
  },
};

export const revalidate = 60;

export default async function DogBreedsPage() {
  const breeds = await getDogBreedsForDictionary();

  return (
    <PageLayout>
      <Section>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Dog Breeds" }]}
        />

        <h1 className="ww-serif text-[clamp(2rem,4vw,2.8rem)] leading-tight mb-4">
          Dog Breed Dictionary
        </h1>
        <p className="text-[var(--muted)] text-lg leading-relaxed max-w-[720px] mb-8">
          Browse a large dog-breed dictionary with quick filters and search.
          Click any breed card to pop open a detail bubble with temperament,
          exercise, and care notes, then jump into full breed profile pages.
        </p>

        <BreedDictionary breeds={breeds} />

        <div className="mt-14 rounded-2xl bg-[var(--cream)] p-8">
          <h2 className="ww-serif text-2xl font-semibold mb-3">
            Need help choosing the right walk style?
          </h2>
          <p className="text-[var(--muted)] mb-6 max-w-[680px]">
            Every dog is different. A quick meet and greet helps us plan the
            right pace, duration, and routine for your dog.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-[var(--green)] text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Book a Meet &amp; Greet
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-white text-[var(--text)] border-2 border-[var(--green)]/20 px-7 py-3 rounded-full font-semibold hover:border-[var(--green)]/40 transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
