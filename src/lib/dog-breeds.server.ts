import { prisma } from "@/lib/prisma";
import {
  BREED_CATEGORIES,
  DOG_BREEDS,
  DOG_SIZES,
  type BreedCategory,
  type BreedProfile,
  type DogSize,
} from "@/lib/dog-breeds";

type DbBreed = {
  slug: string;
  name: string;
  size: string;
  category: string;
  temperament: string;
  exercise: string;
  coatCare: string;
  idealFor: string;
  note: string;
  imageUrl: string | null;
};

function isDogSize(size: string): size is DogSize {
  return DOG_SIZES.some((candidate) => candidate === size);
}

function isBreedCategory(category: string): category is BreedCategory {
  return BREED_CATEGORIES.some((candidate) => candidate === category);
}

function normalizeSize(size: string): DogSize {
  return isDogSize(size) ? size : "Medium";
}

function normalizeCategory(category: string): BreedCategory {
  return isBreedCategory(category) ? category : "Family Favourites";
}

function mapDbBreedToProfile(breed: DbBreed): BreedProfile {
  return {
    slug: breed.slug,
    name: breed.name,
    size: normalizeSize(breed.size),
    category: normalizeCategory(breed.category),
    temperament: breed.temperament,
    exercise: breed.exercise,
    coatCare: breed.coatCare,
    idealFor: breed.idealFor,
    note: breed.note,
    imageUrl: breed.imageUrl || "",
  };
}

/**
 * Returns breeds for the public dictionary.
 * Falls back to code defaults if the DB table is empty/unavailable.
 */
export async function getDogBreedsForDictionary(): Promise<BreedProfile[]> {
  try {
    const breeds = await prisma.dogBreed.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        name: true,
        size: true,
        category: true,
        temperament: true,
        exercise: true,
        coatCare: true,
        idealFor: true,
        note: true,
        imageUrl: true,
      },
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });

    if (breeds.length === 0) {
      return DOG_BREEDS;
    }

    return breeds.map(mapDbBreedToProfile);
  } catch (error) {
    console.warn("Dog breed table unavailable, using default breed list.", error);
    return DOG_BREEDS;
  }
}

export async function getDogBreedBySlug(slug: string): Promise<BreedProfile | null> {
  const breeds = await getDogBreedsForDictionary();
  return breeds.find((breed) => breed.slug === slug) || null;
}

export async function getDogBreedSlugs(): Promise<string[]> {
  const breeds = await getDogBreedsForDictionary();
  return breeds.map((breed) => breed.slug);
}
