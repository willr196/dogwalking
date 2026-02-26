import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";
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
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Dog Breeds" }]} />

        <h1 className="ww-serif mb-4 text-[clamp(2.05rem,4.2vw,3rem)] leading-tight">Dog Breed Dictionary</h1>
        <p className="mb-8 max-w-[760px] text-lg leading-relaxed text-[var(--muted)]">
          Browse breeds with filters for size and category. Open any card for quick care notes, then move into
          full breed profiles.
        </p>

        <BreedDictionary breeds={breeds} />

        <div className="mt-14 rounded-[28px] bg-[linear-gradient(140deg,var(--orange),var(--deep-green))] p-8 text-white">
          <h2 className="ww-serif text-[1.85rem] leading-tight">Need help choosing the right walk format?</h2>
          <p className="mt-2 max-w-[620px] leading-relaxed text-white/88">
            A short meet &amp; greet helps us set pace, structure, and handling that fit your dog.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[var(--deep-green)] no-underline"
            >
              Book a Meet &amp; Greet
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/36 bg-white/10 px-7 py-3 text-sm font-semibold text-white no-underline"
            >
              View Services
            </Link>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
