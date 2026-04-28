export const DOG_SIZES = ["Small", "Medium", "Large"] as const;
export type DogSize = (typeof DOG_SIZES)[number];

export const BREED_CATEGORIES = [
  "Compact Companions",
  "Family Favourites",
  "Athletes & Workers",
  "Rare Gems",
] as const;
export type BreedCategory = (typeof BREED_CATEGORIES)[number];

export type BreedProfile = {
  slug: string;
  name: string;
  size: DogSize;
  category: BreedCategory;
  temperament: string;
  exercise: string;
  coatCare: string;
  idealFor: string;
  note: string;
  imageUrl: string;
};

export const DOG_SIZE_FILTERS = ["All", ...DOG_SIZES] as const;
export type DogSizeFilter = (typeof DOG_SIZE_FILTERS)[number];

export const BREED_CATEGORY_FILTERS = ["All", ...BREED_CATEGORIES] as const;
export type BreedCategoryFilter = (typeof BREED_CATEGORY_FILTERS)[number];

export function isPlaceholderBreedImage(imageUrl: string) {
  return imageUrl.toLowerCase().includes("placedog.net/");
}
