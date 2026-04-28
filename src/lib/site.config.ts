/**
 * Will's Walks — Central Site Configuration
 * ==========================================
 * Edit this file to update business info, areas served, pricing, etc.
 * Keep this file PUBLIC-SAFE: it is imported by client components.
 */

export const siteConfig = {
  brandName: "Will's Walks",
  tagline: "Happy dogs, happy walks in Fulham",
  description:
    "Happy dog walking in Fulham and SW6. Solo and tiny group walks (max 3 dogs). Meet & greet required. Founding client rate: £13 per walk.",

  /** Owner / About */
  owner: {
    name: "Will",
    bio: "I'm a Fulham local with a genuine love for dogs. I believe every dog deserves individual attention during their walks — that's why I keep groups small (max 3) and require a meet & greet before the first walk.",
    phone: "", // e.g. "+447123456789"
    email: "hello@willswalks.co.uk",
    whatsapp: "", // phone number for wa.me link, e.g. "447123456789"
  },

  /** Service areas — add/remove as needed */
  areasServed: [
    { slug: "fulham", name: "Fulham", postcode: "SW6" },
    { slug: "parsons-green", name: "Parsons Green", postcode: "SW6" },
    { slug: "walham-green", name: "Walham Green", postcode: "SW6" },
    { slug: "sands-end", name: "Sands End", postcode: "SW6" },
    { slug: "bishops-park", name: "Bishop's Park", postcode: "SW6" },
    { slug: "hurlingham", name: "Hurlingham", postcode: "SW6" },
  ],

  /** Operating hours */
  businessHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "07:00",
    closes: "19:00",
  },

  /** Pricing */
  pricing: {
    introPrice: 13,
    standardPrice: 18,
    currency: "£",
    introLabel: "Founding client rate",
    introNote: "Limited to first 5 clients",
    walkDuration: 60, // minutes
    maxDogsPerWalk: 3,
  },

  /** Services offered */
  services: [
    {
      slug: "solo-dog-walking",
      name: "Solo Dog Walking",
      shortName: "Solo Walk",
      description:
        "Your dog gets my complete, undivided attention. No distractions, no pack dynamics — just quality one-on-one exercise and enrichment.",
      duration: "60 minutes",
      features: [
        "1-on-1 attention",
        "Photo updates after every walk",
        "Flexible scheduling",
        "Familiar routes your dog will love",
      ],
    },
    {
      slug: "small-group-dog-walking",
      name: "Small Group Dog Walking",
      shortName: "Small Group Walk",
      description:
        "A carefully managed walk with a maximum of 3 compatible dogs. Every dog is assessed during a meet & greet before joining a group.",
      duration: "60 minutes",
      features: [
        "Max 3 dogs per walk",
        "Dogs assessed for compatibility",
        "Socialisation in a safe setting",
        "Photo updates after every walk",
      ],
    },
  ],

  /** How it works steps */
  howItWorks: [
    {
      step: 1,
      title: "Book a Meet & Greet",
      description:
        "We'll arrange a free meet & greet so I can get to know your dog (and you!). This is required before the first walk — it helps me understand their temperament, energy level, and any needs.",
    },
    {
      step: 2,
      title: "Pick a Recurring Slot",
      description:
        "Choose the days and times that work for you. I'll confirm availability and lock in your regular schedule.",
    },
    {
      step: 3,
      title: "Walk + Updates",
      description:
        "Your dog gets a structured, enjoyable walk. You'll receive photo updates and a quick summary after each session.",
    },
    {
      step: 4,
      title: "Easy Changes",
      description:
        "Need to reschedule or cancel? No problem — just let me know with 24 hours' notice. Flexibility is built in.",
    },
  ],

  /** Trust signals — honest, no fake credentials */
  trustSignals: [
    {
      title: "Max 3 Dogs Per Walk",
      description: "Small groups mean more attention, safer walks, and happier dogs.",
    },
    {
      title: "Meet & Greet Required",
      description:
        "Every dog is met before their first walk. I assess temperament and energy level to make sure they're a good fit.",
    },
    {
      title: "Regular Updates",
      description:
        "Photos and messages after every walk so you always know how things went.",
    },
    {
      title: "Clear Safety Rules",
      description:
        "No unsafe off-lead. Dogs are assessed before any group walk. I follow consistent handling rules every time.",
    },
  ],

  /** Social links */
  social: {
    instagram: "", // e.g. "https://instagram.com/willswalks"
    facebook: "",
    google: "", // Google Business Profile URL
  },

  /** Technical */
  siteUrl: "https://willswalks.co.uk",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",

  /** SEO defaults */
  seo: {
    titleTemplate: "%s | Will's Walks",
    defaultTitle: "Dog Walking in Fulham | Will's Walks",
    defaultDescription:
      "Happy dog walking in Fulham, SW6. Solo and tiny group walks, max 3 dogs. Meet & greet required. Founding client rate from £13.",
    locale: "en_GB",
    type: "website",
  },
} as const;

/** Helper: get area by slug */
export function getArea(slug: string) {
  return siteConfig.areasServed.find((a) => a.slug === slug);
}

/** Helper: all area slugs for static generation */
export function getAreaSlugs() {
  return siteConfig.areasServed.map((a) => a.slug);
}

export type Area = (typeof siteConfig.areasServed)[number];
export type Service = (typeof siteConfig.services)[number];
