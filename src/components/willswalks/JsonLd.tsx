import { siteConfig } from "@/lib/site.config";

type JsonLdData = Record<string, unknown>;

type FAQItem = {
  question: string;
  answer: string;
};

function toAbsoluteUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${siteConfig.siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: toAbsoluteUrl(url),
        provider: {
          "@type": "LocalBusiness",
          name: siteConfig.brandName,
          url: siteConfig.siteUrl,
        },
      }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  return (
    <JsonLd
      data={{
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
      }}
    />
  );
}
