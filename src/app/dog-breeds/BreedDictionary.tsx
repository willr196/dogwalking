"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  BREED_CATEGORY_FILTERS,
  DOG_SIZE_FILTERS,
  type BreedCategoryFilter,
  type BreedProfile,
  type DogSizeFilter,
} from "@/lib/dog-breeds";

function fallbackBreedImage(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%230f8d87'/><stop offset='100%' stop-color='%2317506a'/></linearGradient></defs><rect width='120' height='120' rx='18' fill='url(%23g)'/><circle cx='60' cy='42' r='22' fill='rgba(255,255,255,0.18)'/><text x='60' y='49' text-anchor='middle' font-family='Arial, sans-serif' font-size='18' font-weight='700' fill='white'>DOG</text><text x='60' y='88' text-anchor='middle' font-family='Arial, sans-serif' font-size='22' font-weight='700' fill='white'>${initials}</text></svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

type Props = {
  breeds: BreedProfile[];
};

export function BreedDictionary({ breeds }: Props) {
  const [sizeFilter, setSizeFilter] = useState<DogSizeFilter>("All");
  const [categoryFilter, setCategoryFilter] = useState<BreedCategoryFilter>("All");
  const [query, setQuery] = useState("");
  const [openBreedSlug, setOpenBreedSlug] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const dictionaryRef = useRef<HTMLDivElement>(null);

  const filteredBreeds = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return breeds.filter((breed) => {
      const matchesSize = sizeFilter === "All" || breed.size === sizeFilter;
      const matchesCategory = categoryFilter === "All" || breed.category === categoryFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${breed.name} ${breed.temperament} ${breed.category}`.toLowerCase().includes(normalizedQuery);

      return matchesSize && matchesCategory && matchesQuery;
    });
  }, [breeds, sizeFilter, categoryFilter, query]);

  useEffect(() => {
    setOpenBreedSlug(null);
  }, [sizeFilter, categoryFilter, query]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!dictionaryRef.current) {
        return;
      }

      if (!dictionaryRef.current.contains(event.target as Node)) {
        setOpenBreedSlug(null);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenBreedSlug(null);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={dictionaryRef}>
      <div className="mb-6">
        <label htmlFor="breed-search" className="sr-only">
          Search dog breeds
        </label>
        <input
          id="breed-search"
          type="search"
          placeholder="Search breed names or traits"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="ww-input max-w-[440px]"
        />
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        {DOG_SIZE_FILTERS.map((filter) => {
          const active = sizeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setSizeFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "border-[var(--green)] bg-[var(--green)] text-white"
                  : "border-[var(--line)] bg-white text-[var(--text)] hover:border-[var(--green)]/45"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        {BREED_CATEGORY_FILTERS.map((filter) => {
          const active = categoryFilter === filter;
          const isRare = filter === "Rare Gems";

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setCategoryFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? isRare
                    ? "border-[var(--orange)] bg-[var(--orange)] text-white"
                    : "border-[var(--deep-green)] bg-[var(--deep-green)] text-white"
                  : isRare
                    ? "border-[rgba(242,120,69,0.45)] bg-white text-[var(--deep-orange)] hover:border-[var(--orange)]"
                    : "border-[var(--line)] bg-white text-[var(--text)] hover:border-[var(--green)]/45"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <p className="mb-6 text-sm text-[var(--muted)]">
        Showing {filteredBreeds.length} of {breeds.length} breeds
      </p>

      {filteredBreeds.length === 0 ? (
        <div className="rounded-2xl border border-[var(--line)] bg-white p-8 text-sm text-[var(--muted)]">
          No breeds match that filter yet. Try clearing search or selecting different filters.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBreeds.map((breed) => {
            const isOpen = openBreedSlug === breed.slug;
            const bubbleId = `${breed.slug}-bubble`;
            const rareChip = breed.category === "Rare Gems";
            const imageSrc = brokenImages[breed.slug] || !breed.imageUrl ? fallbackBreedImage(breed.name) : breed.imageUrl;

            return (
              <article key={breed.slug} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenBreedSlug(isOpen ? null : breed.slug)}
                  aria-expanded={isOpen}
                  aria-controls={bubbleId}
                  className={`w-full rounded-2xl border bg-white p-4 text-left transition-all ${
                    isOpen
                      ? "border-[var(--green)]/55 shadow-[var(--shadow)]"
                      : "border-[var(--line)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-[var(--green)]/45"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={imageSrc}
                      alt={`${breed.name} dog`}
                      width={64}
                      height={64}
                      loading="lazy"
                      onError={() => {
                        setBrokenImages((current) => ({
                          ...current,
                          [breed.slug]: true,
                        }));
                      }}
                      className="h-16 w-16 shrink-0 rounded-xl border border-[var(--line)] bg-[var(--surface)] object-cover"
                    />

                    <div className="min-w-0 w-full">
                      <div className="mb-1.5 flex items-start justify-between gap-2">
                        <h3 className="ww-serif line-clamp-2 text-[1.1rem] leading-tight">{breed.name}</h3>
                        <span className="inline-flex shrink-0 items-center rounded-full bg-[rgba(15,141,135,0.12)] px-2.5 py-1 text-[11px] font-semibold text-[var(--deep-green)]">
                          {breed.size}
                        </span>
                      </div>

                      <p className="line-clamp-2 text-sm text-[var(--muted)]">{breed.temperament}</p>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            rareChip
                              ? "bg-[rgba(242,120,69,0.12)] text-[var(--deep-orange)]"
                              : "bg-[var(--surface)] text-[var(--brown)]"
                          }`}
                        >
                          {breed.category}
                        </span>
                        <span className="text-sm font-semibold text-[var(--deep-green)]">
                          {isOpen ? "Click to close" : "Open profile"}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {isOpen ? (
                  <div id={bubbleId} role="dialog" aria-label={`${breed.name} profile`} className="relative z-20 mt-3 anim-fade-in">
                    <div className="absolute -top-2 left-8 h-4 w-4 rotate-45 border-l border-t border-[var(--line)] bg-white" />
                    <div className="relative rounded-2xl border border-[var(--line)] bg-white p-4 shadow-[var(--shadow)]">
                      <button
                        type="button"
                        onClick={() => setOpenBreedSlug(null)}
                        className="absolute right-3 top-3 text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)]"
                        aria-label={`Close ${breed.name} details`}
                      >
                        Close
                      </button>

                      <div className="mb-3 flex items-center gap-3 pr-12">
                        <img
                          src={imageSrc}
                          alt={`${breed.name} profile`}
                          width={44}
                          height={44}
                          loading="lazy"
                          onError={() => {
                            setBrokenImages((current) => ({
                              ...current,
                              [breed.slug]: true,
                            }));
                          }}
                          className="h-11 w-11 rounded-lg border border-[var(--line)] bg-[var(--surface)] object-cover"
                        />
                        <h4 className="text-sm font-semibold text-[var(--text)]">{breed.name}</h4>
                      </div>

                      <ul className="space-y-2 text-sm text-[var(--muted)]">
                        <li>
                          <span className="font-semibold text-[var(--text)]">Temperament:</span> {breed.temperament}
                        </li>
                        <li>
                          <span className="font-semibold text-[var(--text)]">Exercise:</span> {breed.exercise}
                        </li>
                        <li>
                          <span className="font-semibold text-[var(--text)]">Coat care:</span> {breed.coatCare}
                        </li>
                        <li>
                          <span className="font-semibold text-[var(--text)]">Great for:</span> {breed.idealFor}
                        </li>
                        <li>
                          <span className="font-semibold text-[var(--text)]">Note:</span> {breed.note}
                        </li>
                      </ul>

                      <div className="mt-3 border-t border-[var(--line)] pt-3">
                        <Link
                          href={`/dog-breeds/${breed.slug}`}
                          className="text-sm font-semibold text-[var(--deep-green)] transition-colors hover:text-[var(--green)]"
                        >
                          View full profile →
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
