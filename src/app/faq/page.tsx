import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";
import { FAQSchema } from "@/components/willswalks/JsonLd";

const faqs = [
  {
    question: "Do you only walk dogs in Fulham?",
    answer:
      "I'm based in Fulham (SW6) and cover the surrounding areas including Parsons Green, Walham Green, Sands End, Bishop's Park, and Hurlingham. If you're nearby and unsure whether I cover your area, get in touch and I'll let you know.",
  },
  {
    question: "What happens at the meet & greet?",
    answer:
      "The meet & greet is a short, informal visit where I come to your home to meet you and your dog. It gives me a chance to understand your dog's temperament, energy level, and any specific needs. It also lets your dog get familiar with me before their first walk. There's no charge and no obligation.",
  },
  {
    question: "Why is a meet & greet required?",
    answer:
      "Safety and trust. I need to assess every dog before walking them — especially before any group walk. The meet & greet helps me understand how your dog behaves, whether they're suited to a group or better with solo walks, and any handling notes I should know about.",
  },
  {
    question: "How many dogs do you walk at once?",
    answer: `A maximum of ${siteConfig.pricing.maxDogsPerWalk}. Keeping groups small means every dog gets proper attention and the walk stays safe and structured. Solo walks are also available if your dog prefers one-on-one time.`,
  },
  {
    question: "Will my dog be off-lead?",
    answer:
      "Only in safe, enclosed areas and only if you've given permission and I'm confident your dog has reliable recall. I never take risks with off-lead walking — if there's any doubt, your dog stays on the lead.",
  },
  {
    question: "How long are the walks?",
    answer: `Every walk is ${siteConfig.pricing.walkDuration} minutes. This includes pick-up from your home, the walk itself, and drop-off.`,
  },
  {
    question: "How much does it cost?",
    answer: `The founding client rate is £${siteConfig.pricing.introPrice} per walk (limited to the first 5 clients). The standard rate is £${siteConfig.pricing.standardPrice}. There are no sign-up fees, no contracts, and no hidden charges.`,
  },
  {
    question: "What if I need to cancel?",
    answer:
      "Just let me know at least 24 hours in advance and there's no charge. Last-minute cancellations (within 24 hours) may be charged at the full rate.",
  },
  {
    question: "Do you send updates during the walk?",
    answer:
      "Yes — you'll receive photo updates and a quick summary after every walk, so you always know how things went.",
  },
  {
    question: "Are you insured?",
    answer:
      "I'm working on getting fully insured. I'll update this page as soon as that's in place. In the meantime, I take every precaution to keep your dog safe.",
  },
  {
    question: "Can you walk my puppy?",
    answer:
      "Yes, as long as they've had their vaccinations. Puppies are great candidates for solo walks where they can get individual attention and gentle socialisation at their own pace.",
  },
  {
    question: "Do you offer dog sitting or daycare?",
    answer:
      "Not at the moment — I focus exclusively on dog walking to make sure I do one thing well.",
  },
];

export const metadata: Metadata = {
  title: `Dog Walking FAQ | ${siteConfig.brandName}`,
  description:
    "Frequently asked questions about dog walking with Will's Walks in Fulham. Meet & greets, group sizes, pricing, safety, and more.",
  alternates: { canonical: `${siteConfig.siteUrl}/faq` },
};

export default function FAQPage() {
  return (
    <PageLayout>
      <FAQSchema faqs={faqs} />
      <Section>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
        <h1 className="ww-serif text-[clamp(2rem,4vw,3rem)] leading-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-[var(--muted)] text-lg leading-relaxed max-w-[600px] mb-10">
          Everything you need to know about walking with {siteConfig.brandName}.
          Can&apos;t find your answer?{" "}
          <Link href="/contact" className="text-[var(--green)] font-medium hover:underline">
            Get in touch
          </Link>
          .
        </p>

        <div className="space-y-3 mb-12">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-white rounded-xl border border-[var(--green)]/10 overflow-hidden"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-medium text-sm hover:bg-[var(--cream)]/40 transition-colors">
                <span className="pr-4">{faq.question}</span>
                <span className="flex-shrink-0 text-[var(--light)] group-open:rotate-45 transition-transform text-lg">
                  +
                </span>
              </summary>
              <div className="px-5 pb-4 text-sm text-[var(--muted)] leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center bg-[var(--cream)] rounded-2xl p-10">
          <h2 className="ww-serif text-xl font-semibold mb-3">
            Still have questions?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            I&apos;m happy to chat, no pressure.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/contact"
              className="bg-[var(--green)] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              Get in Touch
            </Link>
            <Link
              href="/booking"
              className="bg-white text-[var(--text)] border-2 border-[var(--green)]/20 px-8 py-3 rounded-full font-semibold hover:border-[var(--green)]/40 transition-colors"
            >
              Book a Meet &amp; Greet
            </Link>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}

