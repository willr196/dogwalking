/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";
import {
  getDogBreedBySlug,
  getDogBreedsForDictionary,
} from "@/lib/dog-breeds.server";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

function fallbackBreedImage(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='420' height='320' viewBox='0 0 420 320'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%236b9e7e'/><stop offset='100%' stop-color='%233d6b50'/></linearGradient></defs><rect width='420' height='320' rx='28' fill='url(%23g)'/><circle cx='210' cy='120' r='62' fill='rgba(255,255,255,0.18)'/><text x='210' y='130' text-anchor='middle' font-family='Arial, sans-serif' font-size='40' font-weight='700' fill='white'>DOG</text><text x='210' y='232' text-anchor='middle' font-family='Arial, sans-serif' font-size='56' font-weight='700' fill='white'>${initials}</text></svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const breed = await getDogBreedBySlug(slug);

  if (!breed) {
    return {
      title: `Breed Not Found | ${siteConfig.brandName}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${breed.name} Breed Guide | ${siteConfig.brandName}`;
  const description = `${breed.name}: ${breed.temperament}. Exercise: ${breed.exercise}`;

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.siteUrl}/dog-breeds/${breed.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.siteUrl}/dog-breeds/${breed.slug}`,
      type: "article",
      locale: siteConfig.seo.locale,
    },
  };
}

export default async function DogBreedDetailPage({ params }: Props) {
  const { slug } = await params;
  const [breed, breeds] = await Promise.all([
    getDogBreedBySlug(slug),
    getDogBreedsForDictionary(),
  ]);

  if (!breed) {
    notFound();
  }

  const related = breeds
    .filter(
      (candidate) =>
        candidate.slug !== breed.slug && candidate.category === breed.category,
    )
    .slice(0, 6);

  const imageSrc = breed.imageUrl || fallbackBreedImage(breed.name);

  return (
    <PageLayout>
      <Section>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Dog Breeds", href: "/dog-breeds" },
            { label: breed.name },
          ]}
        />

        <div className="grid lg:grid-cols-[360px_1fr] gap-8 items-start mb-10">
          <div className="rounded-3xl overflow-hidden border border-[var(--green)]/20 bg-white shadow-[var(--shadow)]">
            <img
              src={imageSrc}
              alt={`${breed.name} breed profile`}
              className="w-full h-[320px] object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-[var(--green)]/10 text-[var(--deep-green)]">
                {breed.size}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  breed.category === "Rare Gems"
                    ? "bg-[var(--orange)]/12 text-[var(--deep-orange)]"
                    : "bg-[var(--cream)] text-[var(--brown)]"
                }`}
              >
                {breed.category}
              </span>
            </div>

            <h1 className="ww-serif text-[clamp(2rem,4vw,3rem)] leading-tight mb-4">
              {breed.name}
            </h1>

            <p className="text-[var(--muted)] text-lg leading-relaxed mb-6">
              {breed.temperament}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl border border-[var(--green)]/15 bg-white p-4">
                <p className="text-xs uppercase tracking-wide text-[var(--muted)] mb-1">
                  Exercise needs
                </p>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  {breed.exercise}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--green)]/15 bg-white p-4">
                <p className="text-xs uppercase tracking-wide text-[var(--muted)] mb-1">
                  Coat care
                </p>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  {breed.coatCare}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-[var(--green)] text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Book a Meet &amp; Greet
              </Link>
              <Link
                href="/dog-breeds"
                className="inline-flex items-center gap-2 bg-white text-[var(--text)] border-2 border-[var(--green)]/20 px-7 py-3 rounded-full font-semibold hover:border-[var(--green)]/40 transition-colors"
              >
                Back to Dictionary
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="rounded-2xl bg-[var(--warm-white)] border border-[var(--green)]/10 p-5">
            <h2 className="ww-serif text-xl mb-2">Great For</h2>
            <p className="text-[var(--muted)] leading-relaxed">{breed.idealFor}</p>
          </div>
          <div className="rounded-2xl bg-[var(--warm-white)] border border-[var(--green)]/10 p-5">
            <h2 className="ww-serif text-xl mb-2">Quick Note</h2>
            <p className="text-[var(--muted)] leading-relaxed">{breed.note}</p>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="ww-serif text-2xl mb-4">More in {breed.category}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/dog-breeds/${item.slug}`}
                  className="rounded-2xl border border-[var(--green)]/15 bg-white p-4 hover:border-[var(--green)]/35 transition-colors"
                >
                  <p className="font-semibold mb-1">{item.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {item.size} · {item.temperament}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>
    </PageLayout>
  );
}
