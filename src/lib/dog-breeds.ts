export const DOG_SIZES = ["Small", "Medium", "Large"] as const;
export type DogSize = (typeof DOG_SIZES)[number];

/**
 * Default breed source:
 * - Used as fallback when DB breed records are unavailable/empty.
 * - Used by the admin "Import default breeds" action.
 */

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

type BreedSeed = {
  slug: string;
  name: string;
  size: DogSize;
  category: BreedCategory;
  temperament: string;
  exercise?: string;
  coatCare?: string;
  idealFor?: string;
  note?: string;
  imageUrl?: string;
};

const EXERCISE_BY_SIZE: Record<DogSize, string> = {
  Small: "30-45 minutes daily plus short enrichment play.",
  Medium: "60 minutes daily with sniff walks and games.",
  Large: "75-90 minutes daily with structured exercise.",
};

const COAT_CARE_BY_SIZE: Record<DogSize, string> = {
  Small: "Light to moderate brushing depending on coat type.",
  Medium: "Moderate brushing and regular ear/paw checks.",
  Large: "Moderate to high grooming, especially in shed season.",
};

const IDEAL_HOME_BY_CATEGORY: Record<BreedCategory, string> = {
  "Compact Companions": "Owners wanting a social, people-focused companion.",
  "Family Favourites": "Homes looking for adaptable all-round family dogs.",
  "Athletes & Workers": "Active handlers who enjoy routine training and longer walks.",
  "Rare Gems": "Owners who enjoy uncommon breeds and breed-specific handling.",
};

const NOTE_BY_CATEGORY: Record<BreedCategory, string> = {
  "Compact Companions": "Best results come from calm routines and consistent boundaries.",
  "Family Favourites": "Steady lead manners and reliable recall build easier daily walks.",
  "Athletes & Workers": "Mental exercise is just as important as physical exercise.",
  "Rare Gems": "Research breed-specific needs before settling into a routine.",
};

const BREED_SEEDS: BreedSeed[] = [
  {
    slug: "chihuahua",
    name: "Chihuahua",
    size: "Small",
    category: "Compact Companions",
    temperament: "Alert, devoted, bold",
  },
  {
    slug: "pomeranian",
    name: "Pomeranian",
    size: "Small",
    category: "Compact Companions",
    temperament: "Lively, outgoing, curious",
  },
  {
    slug: "dachshund",
    name: "Dachshund",
    size: "Small",
    category: "Compact Companions",
    temperament: "Brave, clever, loyal",
    exercise: "40-50 minutes daily with controlled low-impact movement.",
    note: "Back-friendly handling is important, so limit repeated jumping.",
  },
  {
    slug: "french-bulldog",
    name: "French Bulldog",
    size: "Small",
    category: "Compact Companions",
    temperament: "Playful, affectionate, easygoing",
    exercise: "20-40 minutes daily, ideally in cooler parts of the day.",
    note: "Heat management and short recovery breaks are important.",
  },
  {
    slug: "pug",
    name: "Pug",
    size: "Small",
    category: "Compact Companions",
    temperament: "Charming, social, mischievous",
    exercise: "20-40 minutes daily with steady pace and cooling breaks.",
    note: "Avoid intense exercise in warm weather.",
  },
  {
    slug: "cavalier-king-charles-spaniel",
    name: "Cavalier King Charles Spaniel",
    size: "Small",
    category: "Compact Companions",
    temperament: "Gentle, affectionate, sociable",
  },
  {
    slug: "shih-tzu",
    name: "Shih Tzu",
    size: "Small",
    category: "Compact Companions",
    temperament: "Sweet, calm, friendly",
    coatCare: "High coat maintenance with regular brushing and trims.",
  },
  {
    slug: "bichon-frise",
    name: "Bichon Frise",
    size: "Small",
    category: "Compact Companions",
    temperament: "Happy, cheerful, affectionate",
    coatCare: "Regular clipping and brushing to prevent matting.",
  },
  {
    slug: "yorkshire-terrier",
    name: "Yorkshire Terrier",
    size: "Small",
    category: "Compact Companions",
    temperament: "Feisty, confident, loving",
    coatCare: "Frequent grooming if coat is kept long.",
  },
  {
    slug: "maltese",
    name: "Maltese",
    size: "Small",
    category: "Compact Companions",
    temperament: "Gentle, lively, affectionate",
    coatCare: "Frequent brushing and regular eye-area cleaning.",
  },
  {
    slug: "havanese",
    name: "Havanese",
    size: "Small",
    category: "Compact Companions",
    temperament: "Outgoing, playful, people-focused",
  },
  {
    slug: "miniature-schnauzer",
    name: "Miniature Schnauzer",
    size: "Small",
    category: "Compact Companions",
    temperament: "Smart, spirited, friendly",
  },
  {
    slug: "west-highland-white-terrier",
    name: "West Highland White Terrier",
    size: "Small",
    category: "Compact Companions",
    temperament: "Independent, upbeat, sturdy",
  },
  {
    slug: "boston-terrier",
    name: "Boston Terrier",
    size: "Small",
    category: "Compact Companions",
    temperament: "Bright, friendly, comical",
    exercise: "30-45 minutes daily with moderate intensity.",
  },
  {
    slug: "papillon",
    name: "Papillon",
    size: "Small",
    category: "Compact Companions",
    temperament: "Alert, quick, eager",
  },
  {
    slug: "italian-greyhound",
    name: "Italian Greyhound",
    size: "Small",
    category: "Compact Companions",
    temperament: "Sensitive, affectionate, graceful",
  },
  {
    slug: "lhasa-apso",
    name: "Lhasa Apso",
    size: "Small",
    category: "Compact Companions",
    temperament: "Watchful, loyal, composed",
    coatCare: "Regular brushing and professional grooming support.",
  },
  {
    slug: "pekingese",
    name: "Pekingese",
    size: "Small",
    category: "Compact Companions",
    temperament: "Independent, affectionate, dignified",
    exercise: "20-35 minutes daily with gentle pacing.",
  },
  {
    slug: "miniature-pinscher",
    name: "Miniature Pinscher",
    size: "Small",
    category: "Compact Companions",
    temperament: "Fearless, spirited, alert",
  },
  {
    slug: "scottish-terrier",
    name: "Scottish Terrier",
    size: "Small",
    category: "Compact Companions",
    temperament: "Dignified, independent, loyal",
  },
  {
    slug: "norfolk-terrier",
    name: "Norfolk Terrier",
    size: "Small",
    category: "Compact Companions",
    temperament: "Plucky, outgoing, affectionate",
  },
  {
    slug: "norwich-terrier",
    name: "Norwich Terrier",
    size: "Small",
    category: "Compact Companions",
    temperament: "Alert, affectionate, energetic",
  },
  {
    slug: "toy-poodle",
    name: "Toy Poodle",
    size: "Small",
    category: "Compact Companions",
    temperament: "Intelligent, trainable, lively",
    coatCare: "Frequent clipping and brushing is required.",
  },
  {
    slug: "coton-de-tulear",
    name: "Coton de Tulear",
    size: "Small",
    category: "Compact Companions",
    temperament: "Cheerful, gentle, devoted",
    coatCare: "Frequent brushing helps prevent knots and mats.",
  },
  {
    slug: "japanese-chin",
    name: "Japanese Chin",
    size: "Small",
    category: "Compact Companions",
    temperament: "Charming, cat-like, sensitive",
    exercise: "20-35 minutes daily with gentle play.",
  },
  {
    slug: "labrador-retriever",
    name: "Labrador Retriever",
    size: "Large",
    category: "Family Favourites",
    temperament: "Friendly, outgoing, food-motivated",
  },
  {
    slug: "golden-retriever",
    name: "Golden Retriever",
    size: "Large",
    category: "Family Favourites",
    temperament: "Patient, social, eager to please",
    coatCare: "High brushing frequency, especially around feathering.",
  },
  {
    slug: "beagle",
    name: "Beagle",
    size: "Medium",
    category: "Family Favourites",
    temperament: "Curious, merry, scent-driven",
    exercise: "60-90 minutes daily plus scent games.",
    note: "Recall work matters because scent focus can override cues.",
  },
  {
    slug: "cocker-spaniel",
    name: "Cocker Spaniel",
    size: "Medium",
    category: "Family Favourites",
    temperament: "Cheerful, affectionate, eager",
    coatCare: "Moderate-high grooming with ear checks.",
  },
  {
    slug: "english-springer-spaniel",
    name: "English Springer Spaniel",
    size: "Medium",
    category: "Family Favourites",
    temperament: "Energetic, friendly, biddable",
    exercise: "75+ minutes daily with field-style games.",
  },
  {
    slug: "pembroke-welsh-corgi",
    name: "Pembroke Welsh Corgi",
    size: "Medium",
    category: "Family Favourites",
    temperament: "Bright, bold, affectionate",
  },
  {
    slug: "staffordshire-bull-terrier",
    name: "Staffordshire Bull Terrier",
    size: "Medium",
    category: "Family Favourites",
    temperament: "Courageous, affectionate, playful",
  },
  {
    slug: "whippet",
    name: "Whippet",
    size: "Medium",
    category: "Family Favourites",
    temperament: "Calm indoors, athletic outdoors, gentle",
    exercise: "60 minutes daily with safe sprint opportunities.",
  },
  {
    slug: "border-terrier",
    name: "Border Terrier",
    size: "Small",
    category: "Family Favourites",
    temperament: "Affectionate, hardy, spirited",
  },
  {
    slug: "samoyed",
    name: "Samoyed",
    size: "Large",
    category: "Family Favourites",
    temperament: "Friendly, vocal, social",
    coatCare: "Heavy coat maintenance with regular de-shedding.",
  },
  {
    slug: "flat-coated-retriever",
    name: "Flat-Coated Retriever",
    size: "Large",
    category: "Family Favourites",
    temperament: "Optimistic, outgoing, playful",
  },
  {
    slug: "standard-poodle",
    name: "Standard Poodle",
    size: "Large",
    category: "Family Favourites",
    temperament: "Intelligent, trainable, active",
    coatCare: "Frequent grooming schedule is essential.",
  },
  {
    slug: "portuguese-water-dog",
    name: "Portuguese Water Dog",
    size: "Medium",
    category: "Family Favourites",
    temperament: "Spirited, loyal, adventurous",
    exercise: "75+ minutes daily with variety and training.",
  },
  {
    slug: "newfoundland",
    name: "Newfoundland",
    size: "Large",
    category: "Family Favourites",
    temperament: "Sweet, patient, calm",
    exercise: "60-75 minutes daily with low-impact activity.",
    note: "Large frame benefits from controlled intensity and joint care.",
  },
  {
    slug: "boxer",
    name: "Boxer",
    size: "Large",
    category: "Family Favourites",
    temperament: "Fun-loving, loyal, energetic",
  },
  {
    slug: "dalmatian",
    name: "Dalmatian",
    size: "Large",
    category: "Family Favourites",
    temperament: "Athletic, bright, alert",
    exercise: "90 minutes daily with structured outlets.",
  },
  {
    slug: "collie",
    name: "Collie",
    size: "Large",
    category: "Family Favourites",
    temperament: "Gentle, responsive, devoted",
  },
  {
    slug: "irish-setter",
    name: "Irish Setter",
    size: "Large",
    category: "Family Favourites",
    temperament: "Affectionate, lively, friendly",
    exercise: "90 minutes daily with room to move.",
  },
  {
    slug: "airedale-terrier",
    name: "Airedale Terrier",
    size: "Large",
    category: "Family Favourites",
    temperament: "Clever, confident, versatile",
  },
  {
    slug: "brittany",
    name: "Brittany",
    size: "Medium",
    category: "Family Favourites",
    temperament: "Bright, eager, lively",
    exercise: "75+ minutes daily with active games.",
  },
  {
    slug: "border-collie",
    name: "Border Collie",
    size: "Medium",
    category: "Athletes & Workers",
    temperament: "Highly intelligent, focused, intense",
    exercise: "90+ minutes daily with jobs, drills, and puzzle tasks.",
  },
  {
    slug: "australian-shepherd",
    name: "Australian Shepherd",
    size: "Medium",
    category: "Athletes & Workers",
    temperament: "Driven, trainable, people-oriented",
    exercise: "90+ minutes daily plus training reps.",
  },
  {
    slug: "german-shepherd",
    name: "German Shepherd",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Loyal, observant, versatile",
    exercise: "90+ minutes daily with clear structure.",
  },
  {
    slug: "belgian-malinois",
    name: "Belgian Malinois",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Intense, agile, handler-focused",
    exercise: "90+ minutes daily and consistent advanced training.",
  },
  {
    slug: "vizsla",
    name: "Vizsla",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Affectionate, energetic, sensitive",
    exercise: "90 minutes daily with active retrieval or running games.",
  },
  {
    slug: "weimaraner",
    name: "Weimaraner",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Bold, active, intelligent",
    exercise: "90+ minutes daily with structured outlets.",
  },
  {
    slug: "rhodesian-ridgeback",
    name: "Rhodesian Ridgeback",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Dignified, independent, loyal",
  },
  {
    slug: "siberian-husky",
    name: "Siberian Husky",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Athletic, vocal, social",
    exercise: "90+ minutes daily with pulling or running work.",
  },
  {
    slug: "alaskan-malamute",
    name: "Alaskan Malamute",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Powerful, affectionate, determined",
    exercise: "90+ minutes daily with controlled strength work.",
  },
  {
    slug: "doberman-pinscher",
    name: "Doberman Pinscher",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Alert, responsive, loyal",
    exercise: "75-90 minutes daily with obedience and engagement.",
  },
  {
    slug: "rottweiler",
    name: "Rottweiler",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Calm, confident, protective",
  },
  {
    slug: "bernese-mountain-dog",
    name: "Bernese Mountain Dog",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Good-natured, steady, affectionate",
    exercise: "60-75 minutes daily with moderate intensity.",
  },
  {
    slug: "great-dane",
    name: "Great Dane",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Gentle, dependable, friendly",
    exercise: "60-75 minutes daily with controlled low-impact movement.",
    note: "Avoid repetitive high-impact exercise for growing dogs.",
  },
  {
    slug: "akita",
    name: "Akita",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Reserved, loyal, dignified",
  },
  {
    slug: "german-shorthaired-pointer",
    name: "German Shorthaired Pointer",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Driven, eager, versatile",
    exercise: "90+ minutes daily with varied working tasks.",
  },
  {
    slug: "english-pointer",
    name: "English Pointer",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Athletic, focused, gentle",
    exercise: "90+ minutes daily with open-space exercise.",
  },
  {
    slug: "curly-coated-retriever",
    name: "Curly-Coated Retriever",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Independent, confident, upbeat",
  },
  {
    slug: "bloodhound",
    name: "Bloodhound",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Patient, scent-focused, determined",
    exercise: "60-90 minutes daily with scent-heavy enrichment.",
  },
  {
    slug: "anatolian-shepherd",
    name: "Anatolian Shepherd",
    size: "Large",
    category: "Athletes & Workers",
    temperament: "Independent, watchful, calm",
  },
  {
    slug: "azawakh",
    name: "Azawakh",
    size: "Large",
    category: "Rare Gems",
    temperament: "Elegant, reserved, devoted",
    exercise: "75+ minutes daily with secure running opportunities.",
  },
  {
    slug: "otterhound",
    name: "Otterhound",
    size: "Large",
    category: "Rare Gems",
    temperament: "Boisterous, friendly, scent-driven",
  },
  {
    slug: "norwegian-lundehund",
    name: "Norwegian Lundehund",
    size: "Small",
    category: "Rare Gems",
    temperament: "Curious, agile, alert",
  },
  {
    slug: "chinook",
    name: "Chinook",
    size: "Large",
    category: "Rare Gems",
    temperament: "Friendly, willing, calm",
  },
  {
    slug: "xoloitzcuintli",
    name: "Xoloitzcuintli",
    size: "Medium",
    category: "Rare Gems",
    temperament: "Loyal, calm, watchful",
    coatCare: "Hairless types need skin care and sun protection.",
  },
  {
    slug: "thai-ridgeback",
    name: "Thai Ridgeback",
    size: "Large",
    category: "Rare Gems",
    temperament: "Independent, athletic, loyal",
  },
  {
    slug: "komondor",
    name: "Komondor",
    size: "Large",
    category: "Rare Gems",
    temperament: "Protective, composed, confident",
    coatCare: "Corded coat requires specialist maintenance.",
  },
  {
    slug: "bergamasco-sheepdog",
    name: "Bergamasco Sheepdog",
    size: "Large",
    category: "Rare Gems",
    temperament: "Patient, observant, balanced",
    coatCare: "Flocked coat needs specific long-term care routine.",
  },
  {
    slug: "sloughi",
    name: "Sloughi",
    size: "Large",
    category: "Rare Gems",
    temperament: "Sensitive, elegant, loyal",
  },
  {
    slug: "canaan-dog",
    name: "Canaan Dog",
    size: "Medium",
    category: "Rare Gems",
    temperament: "Alert, territorial, agile",
  },
  {
    slug: "belgian-laekenois",
    name: "Belgian Laekenois",
    size: "Large",
    category: "Rare Gems",
    temperament: "Bright, protective, active",
  },
  {
    slug: "cesky-terrier",
    name: "Cesky Terrier",
    size: "Small",
    category: "Rare Gems",
    temperament: "Steady, friendly, trainable",
  },
  {
    slug: "lagotto-romagnolo",
    name: "Lagotto Romagnolo",
    size: "Medium",
    category: "Rare Gems",
    temperament: "Affectionate, energetic, sharp",
    coatCare: "Curly coat needs clipping and anti-matting routine.",
  },
  {
    slug: "icelandic-sheepdog",
    name: "Icelandic Sheepdog",
    size: "Medium",
    category: "Rare Gems",
    temperament: "Friendly, cheerful, attentive",
  },
  {
    slug: "mudi",
    name: "Mudi",
    size: "Medium",
    category: "Rare Gems",
    temperament: "Quick, versatile, alert",
    exercise: "75+ minutes daily plus obedience and agility-style games.",
  },
  {
    slug: "kooikerhondje",
    name: "Kooikerhondje",
    size: "Medium",
    category: "Rare Gems",
    temperament: "Sensitive, agile, friendly",
  },
  {
    slug: "pyrenean-shepherd",
    name: "Pyrenean Shepherd",
    size: "Medium",
    category: "Rare Gems",
    temperament: "Fast, eager, devoted",
    exercise: "90 minutes daily with high engagement tasks.",
  },
  {
    slug: "dandie-dinmont-terrier",
    name: "Dandie Dinmont Terrier",
    size: "Small",
    category: "Rare Gems",
    temperament: "Dignified, affectionate, independent",
  },
  {
    slug: "skye-terrier",
    name: "Skye Terrier",
    size: "Small",
    category: "Rare Gems",
    temperament: "Loyal, calm, brave",
    coatCare: "Long coat needs frequent brushing and tidy trims.",
  },
  {
    slug: "cirneco-dell-etna",
    name: "Cirneco dell'Etna",
    size: "Medium",
    category: "Rare Gems",
    temperament: "Athletic, independent, affectionate",
  },
];

export const DOG_BREEDS: BreedProfile[] = BREED_SEEDS.map((breed, index) => ({
  slug: breed.slug,
  name: breed.name,
  size: breed.size,
  category: breed.category,
  temperament: breed.temperament,
  exercise: breed.exercise ?? EXERCISE_BY_SIZE[breed.size],
  coatCare: breed.coatCare ?? COAT_CARE_BY_SIZE[breed.size],
  idealFor: breed.idealFor ?? IDEAL_HOME_BY_CATEGORY[breed.category],
  note: breed.note ?? NOTE_BY_CATEGORY[breed.category],
  imageUrl: breed.imageUrl ?? `https://placedog.net/180/180?id=${520 + index}`,
})).sort((a, b) => a.name.localeCompare(b.name));

export const DOG_SIZE_FILTERS = ["All", ...DOG_SIZES] as const;
export type DogSizeFilter = (typeof DOG_SIZE_FILTERS)[number];

export const BREED_CATEGORY_FILTERS = ["All", ...BREED_CATEGORIES] as const;
export type BreedCategoryFilter = (typeof BREED_CATEGORY_FILTERS)[number];
