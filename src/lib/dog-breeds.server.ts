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

let loggedMissingDogBreedTable = false;

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

function getPrismaErrorCode(error: unknown): string | null {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
  ) {
    return (error as { code: string }).code;
  }

  return null;
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
    if (getPrismaErrorCode(error) === "P2021") {
      if (!loggedMissingDogBreedTable) {
        console.warn(
          "DogBreed table is missing in the current database. Using built-in default breed list."
        );
        loggedMissingDogBreedTable = true;
      }

      return DOG_BREEDS;
    }

    console.warn(
      "Dog breed query failed unexpectedly. Using built-in default breed list.",
      error
    );
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
