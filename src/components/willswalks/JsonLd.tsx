import { siteConfig } from "@/lib/site.config";

/** LocalBusiness schema for homepage */
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.siteUrl}/#business`,
    name: siteConfig.brandName,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.siteUrl,
    telephone: siteConfig.owner.phone || undefined,
    email: siteConfig.owner.email,
    areaServed: siteConfig.areasServed.map((a) => ({
      "@type": "Place",
      name: `${a.name}, London`,
    })),
    serviceType: ["Dog Walking", "Solo Dog Walking", "Small Group Dog Walking"],
    priceRange: `£${siteConfig.pricing.introPrice}–£${siteConfig.pricing.standardPrice}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fulham",
      addressRegion: "London",
      postalCode: "SW6",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.4735,
      longitude: -0.2058,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "17:00",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Service schema for service pages */
export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteConfig.siteUrl}${url}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${siteConfig.siteUrl}/#business`,
      name: siteConfig.brandName,
    },
    areaServed: siteConfig.areasServed.map((a) => ({
      "@type": "Place",
      name: `${a.name}, London`,
    })),
    offers: {
      "@type": "Offer",
      price: siteConfig.pricing.introPrice,
      priceCurrency: "GBP",
      description: siteConfig.pricing.introLabel,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** FAQ schema */
export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** BreadcrumbList schema */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
