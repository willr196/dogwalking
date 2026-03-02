"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  BREED_CATEGORY_FILTERS,
  DOG_SIZES,
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

type BreedSize = (typeof DOG_SIZES)[number];

const SIZE_LABELS: Record<BreedSize, string> = {
  Small: "Small Breeds",
  Medium: "Medium Breeds",
  Large: "Large Breeds",
};

const SIZE_DESCRIPTIONS: Record<BreedSize, string> = {
  Small: "Generally under 10 kg - popular in London flats",
  Medium: "10-25 kg · 35-60 cm at the shoulder",
  Large: "Over 25 kg · 60 cm+ at the shoulder",
};

export function BreedDictionary({ breeds }: Props) {
  const [sizeFilter, setSizeFilter] = useState<DogSizeFilter>("All");
  const [categoryFilter, setCategoryFilter] = useState<BreedCategoryFilter>("All");
  const [query, setQuery] = useState("");
  const [openBreedSlug, setOpenBreedSlug] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const dictionaryRef = useRef<HTMLDivElement>(null);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredBreeds = useMemo(() => {
    return breeds.filter((breed) => {
      const matchesSize = sizeFilter === "All" || breed.size === sizeFilter;
      const matchesCategory = categoryFilter === "All" || breed.category === categoryFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${breed.name} ${breed.temperament} ${breed.category}`.toLowerCase().includes(normalizedQuery);

      return matchesSize && matchesCategory && matchesQuery;
    });
  }, [breeds, sizeFilter, categoryFilter, normalizedQuery]);

  const sizeFilterCounts = useMemo<Record<DogSizeFilter, number>>(() => {
    const counts: Record<DogSizeFilter, number> = {
      All: 0,
      Small: 0,
      Medium: 0,
      Large: 0,
    };

    breeds.forEach((breed) => {
      const matchesCategory = categoryFilter === "All" || breed.category === categoryFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${breed.name} ${breed.temperament} ${breed.category}`.toLowerCase().includes(normalizedQuery);

      if (!matchesCategory || !matchesQuery) {
        return;
      }

      counts.All += 1;
      counts[breed.size] += 1;
    });

    return counts;
  }, [breeds, categoryFilter, normalizedQuery]);

  const categoryFilterCounts = useMemo<Record<BreedCategoryFilter, number>>(() => {
    const counts: Record<BreedCategoryFilter, number> = {
      All: 0,
      "Compact Companions": 0,
      "Family Favourites": 0,
      "Athletes & Workers": 0,
      "Rare Gems": 0,
    };

    breeds.forEach((breed) => {
      const matchesSize = sizeFilter === "All" || breed.size === sizeFilter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${breed.name} ${breed.temperament} ${breed.category}`.toLowerCase().includes(normalizedQuery);

      if (!matchesSize || !matchesQuery) {
        return;
      }

      counts.All += 1;
      counts[breed.category] += 1;
    });

    return counts;
  }, [breeds, sizeFilter, normalizedQuery]);

  const groupedBreedsBySize = useMemo<Record<BreedSize, BreedProfile[]>>(() => {
    const grouped: Record<BreedSize, BreedProfile[]> = {
      Small: [],
      Medium: [],
      Large: [],
    };

    filteredBreeds.forEach((breed) => {
      grouped[breed.size].push(breed);
    });

    return grouped;
  }, [filteredBreeds]);

  const hasActiveFilters = sizeFilter !== "All" || categoryFilter !== "All" || normalizedQuery.length > 0;

  const clearFilters = () => {
    setSizeFilter("All");
    setCategoryFilter("All");
    setQuery("");
  };

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
              {filter} ({sizeFilterCounts[filter]})
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
              {filter} ({categoryFilterCounts[filter]})
            </button>
          );
        })}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <p className="text-sm text-[var(--muted)]">
          Showing {filteredBreeds.length} of {breeds.length} breeds
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--text)] transition-colors hover:border-[var(--green)]/45"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {filteredBreeds.length === 0 ? (
        <div className="rounded-2xl border border-[var(--line)] bg-white p-8 text-sm text-[var(--muted)]">
          No breeds match that filter yet. Try clearing search or selecting different filters.
        </div>
      ) : sizeFilter === "All" ? (
        <div className="space-y-8">
          <nav className="flex flex-wrap items-center gap-2" aria-label="Jump to breed size section">
            {DOG_SIZES.map((size) => {
              const sizeBreeds = groupedBreedsBySize[size];
              if (sizeBreeds.length === 0) return null;

              return (
                <a
                  key={size}
                  href={`#size-${size.toLowerCase()}`}
                  className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--text)] no-underline transition-colors hover:border-[var(--green)]/45"
                >
                  Jump to {size} ({sizeBreeds.length})
                </a>
              );
            })}
          </nav>

          <div className="space-y-10">
            {DOG_SIZES.map((size) => {
              const sizeBreeds = groupedBreedsBySize[size];
              if (sizeBreeds.length === 0) return null;

              return (
                <section key={size} id={`size-${size.toLowerCase()}`}>
                  <div className="mb-5 flex items-end justify-between gap-4 border-b border-[var(--line)] pb-3">
                    <div>
                      <h2 className="ww-serif text-[1.4rem] leading-tight">{SIZE_LABELS[size]}</h2>
                      <p className="mt-0.5 text-sm text-[var(--muted)]">{SIZE_DESCRIPTIONS[size]}</p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-[var(--muted)]">{sizeBreeds.length} breeds</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sizeBreeds.map((breed) => (
                      <BreedCard
                        key={breed.slug}
                        breed={breed}
                        isOpen={openBreedSlug === breed.slug}
                        isBroken={!!brokenImages[breed.slug]}
                        onToggle={() => setOpenBreedSlug(openBreedSlug === breed.slug ? null : breed.slug)}
                        onClose={() => setOpenBreedSlug(null)}
                        onImageError={() =>
                          setBrokenImages((current) => ({ ...current, [breed.slug]: true }))
                        }
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBreeds.map((breed) => (
            <BreedCard
              key={breed.slug}
              breed={breed}
              isOpen={openBreedSlug === breed.slug}
              isBroken={!!brokenImages[breed.slug]}
              onToggle={() => setOpenBreedSlug(openBreedSlug === breed.slug ? null : breed.slug)}
              onClose={() => setOpenBreedSlug(null)}
              onImageError={() =>
                setBrokenImages((current) => ({ ...current, [breed.slug]: true }))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

type BreedCardProps = {
  breed: BreedProfile;
  isOpen: boolean;
  isBroken: boolean;
  onToggle: () => void;
  onClose: () => void;
  onImageError: () => void;
};

function BreedCard({ breed, isOpen, isBroken, onToggle, onClose, onImageError }: BreedCardProps) {
  const bubbleId = `${breed.slug}-bubble`;
  const rareChip = breed.category === "Rare Gems";
  const imageSrc = isBroken || !breed.imageUrl ? fallbackBreedImage(breed.name) : breed.imageUrl;

  return (
    <article className="relative">
      <button
        type="button"
        onClick={onToggle}
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
            onError={onImageError}
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
              onClick={onClose}
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
                onError={onImageError}
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
}
