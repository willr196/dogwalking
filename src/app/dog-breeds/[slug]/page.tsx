/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site.config";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";
import { getDogBreedBySlug, getDogBreedsForDictionary } from "@/lib/dog-breeds.server";
import { isPlaceholderBreedImage } from "@/lib/dog-breeds.shared";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const breeds = await getDogBreedsForDictionary();
  return breeds.map((breed) => ({ slug: breed.slug }));
}

function fallbackBreedImage(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='420' height='320' viewBox='0 0 420 320'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#0f8d87'/><stop offset='100%' stop-color='#17506a'/></linearGradient></defs><rect width='420' height='320' rx='28' fill='url(#g)'/><circle cx='210' cy='120' r='62' fill='#ffffff' opacity='0.18'/><text x='210' y='130' text-anchor='middle' font-family='Arial, sans-serif' font-size='40' font-weight='700' fill='white'>DOG</text><text x='210' y='232' text-anchor='middle' font-family='Arial, sans-serif' font-size='56' font-weight='700' fill='white'>${initials}</text></svg>`;

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
  const breeds = await getDogBreedsForDictionary();
  const breed = breeds.find((candidate) => candidate.slug === slug);

  if (!breed) {
    notFound();
  }

  const related = breeds
    .filter((candidate) => candidate.slug !== breed.slug && candidate.category === breed.category)
    .slice(0, 6);

  const imageSrc =
    breed.imageUrl && !isPlaceholderBreedImage(breed.imageUrl)
      ? breed.imageUrl
      : fallbackBreedImage(breed.name);

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

        <div className="mb-10 grid items-start gap-8 lg:grid-cols-[360px_1fr]">
          <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-[var(--shadow)]">
            <img src={imageSrc} alt={`${breed.name} breed profile`} className="h-[320px] w-full object-cover" />
          </div>

          <article>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-[rgba(15,141,135,0.12)] px-3 py-1 text-xs font-semibold text-[var(--deep-green)]">
                {breed.size}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  breed.category === "Rare Gems"
                    ? "bg-[rgba(242,120,69,0.12)] text-[var(--deep-orange)]"
                    : "bg-[var(--surface)] text-[var(--brown)]"
                }`}
              >
                {breed.category}
              </span>
            </div>

            <h1 className="ww-serif mb-4 text-[clamp(2.05rem,4.2vw,3rem)] leading-tight">{breed.name}</h1>
            <p className="mb-6 text-lg leading-relaxed text-[var(--muted)]">{breed.temperament}</p>

            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">Exercise needs</p>
                <p className="text-sm leading-relaxed text-[var(--text)]">{breed.exercise}</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">Coat care</p>
                <p className="text-sm leading-relaxed text-[var(--text)]">{breed.coatCare}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-7 py-3 text-sm font-semibold text-white no-underline"
              >
                Book a Meet &amp; Greet
              </Link>
              <Link
                href="/dog-breeds"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-white px-7 py-3 text-sm font-semibold text-[var(--text)] no-underline"
              >
                Back to Dictionary
              </Link>
            </div>
          </article>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <div className="ww-card p-5">
            <h2 className="ww-serif mb-2 text-[1.35rem] leading-tight">Great For</h2>
            <p className="leading-relaxed text-[var(--muted)]">{breed.idealFor}</p>
          </div>
          <div className="ww-card p-5">
            <h2 className="ww-serif mb-2 text-[1.35rem] leading-tight">Quick Note</h2>
            <p className="leading-relaxed text-[var(--muted)]">{breed.note}</p>
          </div>
        </div>

        {related.length > 0 ? (
          <div>
            <h2 className="ww-serif mb-4 text-[1.6rem] leading-tight">More in {breed.category}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/dog-breeds/${item.slug}`}
                  className="rounded-2xl border border-[var(--line)] bg-white p-4 no-underline transition-colors hover:border-[var(--green)]/45"
                >
                  <p className="mb-1 font-semibold text-[var(--text)]">{item.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {item.size} · {item.temperament}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </Section>
    </PageLayout>
  );
}
