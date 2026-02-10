import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;
  const lastModified = new Date();

  const staticPages = [
    { url: baseUrl, lastModified, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/services/solo-dog-walking`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/services/small-group-dog-walking`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/reviews`, lastModified, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/booking`, lastModified, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/areas`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${baseUrl}/guides/how-to-choose-a-dog-walker-in-london`, lastModified, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/guides/solo-vs-small-group-dog-walking`, lastModified, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/guides/what-to-expect-from-a-meet-and-greet`, lastModified, changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const areaPages = siteConfig.areasServed.map((area) => ({
    url: `${baseUrl}/areas/${area.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...areaPages];
}

