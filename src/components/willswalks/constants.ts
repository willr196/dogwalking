import { siteConfig } from "@/lib/site.config";

export const WALK_PRICE = siteConfig.pricing.introPrice;
export const STANDARD_PRICE = siteConfig.pricing.standardPrice;
export const AREAS = siteConfig.areasServed.map((a) => a.name);
export const TIME_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];
export const DOG_SIZES = ["Small", "Medium", "Large"] as const;
