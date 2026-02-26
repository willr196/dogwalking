import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";
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

        <h1 className="ww-serif mb-4 text-[clamp(2.05rem,4.2vw,3.1rem)] leading-tight">
          Frequently Asked Questions
        </h1>
        <p className="mb-10 max-w-[680px] text-lg leading-relaxed text-[var(--muted)]">
          Common questions about booking, walk formats, and safety. Can&apos;t find what you need?{" "}
          <Link href="/contact" className="font-semibold text-[var(--deep-green)] no-underline">
            Send a message
          </Link>
          .
        </p>

        <div className="mb-10 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface)]">
                <span className="pr-4">{faq.question}</span>
                <span className="flex-shrink-0 text-lg text-[var(--light)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-5 pb-4 text-sm leading-relaxed text-[var(--muted)]">{faq.answer}</div>
            </details>
          ))}
        </div>

        <div className="rounded-[28px] bg-[linear-gradient(140deg,var(--orange),var(--deep-green))] p-8 text-white">
          <h2 className="ww-serif text-[1.85rem] leading-tight">Still have questions?</h2>
          <p className="mt-2 max-w-[620px] leading-relaxed text-white/88">
            Happy to chat through your dog&apos;s routine and recommend the right walk setup.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-bold text-[var(--deep-green)] no-underline"
            >
              Get in Touch
            </Link>
            <Link
              href="/booking"
              className="inline-flex rounded-full border border-white/36 bg-white/10 px-8 py-3 text-sm font-semibold text-white no-underline"
            >
              Book a Meet &amp; Greet
            </Link>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
