import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig, getArea, getAreaSlugs } from "@/lib/site.config";
import {
  PageLayout,
  Section,
  Breadcrumbs,
} from "@/components/willswalks/PageLayout";
import { FAQSchema, ServiceSchema } from "@/components/willswalks/JsonLd";

const areaContent: Record<
  string,
  {
    intro: string;
    walkingSpots: string;
    whyLocal: string;
    faqs: { question: string; answer: string }[];
  }
> = {
  fulham: {
    intro:
      "Fulham is the heart of SW6 — a vibrant neighbourhood with tree-lined streets, riverside paths, and some of London's best green spaces for dogs. Whether your pup loves a structured walk along the Thames or exploring the quieter residential streets, Fulham has plenty to offer.",
    walkingSpots:
      "Bishop's Park, the Thames Path, South Park, and Eel Brook Common are all within easy reach. I rotate between routes to keep things interesting for your dog while sticking to safe, familiar areas.",
    whyLocal:
      "Being based in Fulham means I know the area inside out. I know which parks are quiet in the mornings, which paths get muddy after rain, and where the best spots are for a calm, structured walk.",
    faqs: [
      {
        question: "Where do you walk dogs in Fulham?",
        answer:
          "I use a variety of routes including Bishop's Park, the Thames Path, South Park, and Eel Brook Common. The exact route depends on your dog's energy level and temperament — I'll discuss options during the meet & greet.",
      },
      {
        question: "Do you walk in Fulham every day?",
        answer:
          "Yes, I'm available 7 days a week across Fulham and the surrounding areas. I live locally, so I'm always nearby.",
      },
      {
        question: "Can you pick up my dog from my flat in Fulham?",
        answer:
          "Absolutely. I pick up and drop off at your door, whether you're in a house or a flat. Just make sure your dog is ready and I'll handle the rest.",
      },
    ],
  },
  "parsons-green": {
    intro:
      "Parsons Green sits at the quieter end of the Fulham Road, centred around its iconic green — a popular spot for local dog walkers. The area blends village charm with easy access to some excellent walking routes along the New King's Road and down towards the river.",
    walkingSpots:
      "Parsons Green itself is a great starting point, with South Park and Eel Brook Common both a short walk away. I also use the quieter residential streets around Peterborough Road for calmer dogs who prefer a gentler pace.",
    whyLocal:
      "Parsons Green has a real community feel, and many of the dog owners here know each other. I'm building relationships locally and getting to know the regulars — which makes group walks even better when dogs are already familiar with each other.",
    faqs: [
      {
        question: "Is Parsons Green good for dog walking?",
        answer:
          "It's excellent. The green itself is a popular dog-friendly spot, and there are several nearby parks and quiet streets perfect for structured walks. It's one of the best areas in SW6 for dogs.",
      },
      {
        question: "Do you walk near the Parsons Green Tube station area?",
        answer:
          "Yes, I cover the whole Parsons Green neighbourhood. If you're within walking distance of the station, I can pick up your dog from your home.",
      },
      {
        question: "Are there off-lead areas near Parsons Green?",
        answer:
          "Some parks in the area allow off-lead dogs during certain hours. I only let dogs off-lead in safe, enclosed spaces and only with your permission and if I'm confident in their recall.",
      },
    ],
  },
  "walham-green": {
    intro:
      "Walham Green is the historic name for the area around Fulham Broadway — a busy, well-connected part of SW6 with excellent transport links and a mix of residential streets. Despite the urban setting, there are great walking options nearby for dogs who need their daily exercise.",
    walkingSpots:
      "Eel Brook Common is the nearest large green space, and it's one of the best in the area for dog walking. I also use quieter residential routes along Dawes Road and the surrounding streets for dogs who prefer a calmer environment.",
    whyLocal:
      "Walham Green can feel busy, especially near the Broadway, but I know the quieter pockets and the best times to visit the parks. Your dog won't be dragged through crowds — I plan routes that are safe and enjoyable.",
    faqs: [
      {
        question: "Is Walham Green a good area for dogs?",
        answer:
          "Yes — while the Fulham Broadway area is busy, there are excellent parks and quiet residential streets nearby. Eel Brook Common is a short walk away and is one of the best dog-walking spots in SW6.",
      },
      {
        question: "Do you cover the Fulham Broadway area?",
        answer:
          "Yes, Walham Green and the Fulham Broadway area are well within my coverage. I pick up and drop off at your home.",
      },
      {
        question: "What if my dog is nervous around traffic?",
        answer:
          "I'll plan routes that avoid busy roads. There are plenty of quiet residential streets in the area, and I always use safe crossing points when we need to cross main roads.",
      },
    ],
  },
  "sands-end": {
    intro:
      "Sands End is the southern tip of Fulham, running along the Thames towards Battersea Bridge. It's an area that's been transformed in recent years but still retains its riverside charm. For dogs, the proximity to the Thames Path and South Park makes it an excellent base.",
    walkingSpots:
      "The Thames Path along the river is a beautiful walking route, especially in the mornings. South Park is nearby for off-lead play (in designated areas), and the quieter streets around Wandsworth Bridge Road offer calm, structured walks.",
    whyLocal:
      "Sands End's riverside location means there are some genuinely lovely walks on offer. I know which stretches of the Thames Path are dog-friendly and when they're quietest, so your dog gets a peaceful, enriching experience.",
    faqs: [
      {
        question: "Can you walk along the Thames Path in Sands End?",
        answer:
          "Yes, the Thames Path is one of my favourite routes in the area. It's a calm, scenic walk that most dogs love. I adjust the route based on tide times and how busy the path is.",
      },
      {
        question: "Is Sands End safe for dog walking?",
        answer:
          "Absolutely. The residential streets are quiet and the parks are well-maintained. I always keep dogs on the lead near the river and busy roads.",
      },
      {
        question: "Do you cover the area near Imperial Wharf?",
        answer:
          "Yes, I cover the whole of Sands End including Imperial Wharf and the streets around Wandsworth Bridge Road.",
      },
    ],
  },
  "bishops-park": {
    intro:
      "Bishop's Park is one of Fulham's finest green spaces, sitting right on the Thames next to Fulham Palace. The park itself is a destination for dog walkers across the area, with wide paths, riverside sections, and a lovely enclosed garden. If you live near the park, your dog is in for a treat.",
    walkingSpots:
      "The park has a dedicated dog-walking area and wide paths that loop around the grounds. The riverside section is particularly popular. For variety, I also walk along the adjacent streets and down towards the All Saints Church area.",
    whyLocal:
      "Living nearby means I can time our visits to Bishop's Park when it's quieter — early mornings and mid-afternoons are usually best. I know the layout well and can adjust routes based on your dog's mood and energy level.",
    faqs: [
      {
        question: "Can you walk my dog in Bishop's Park?",
        answer:
          "Yes, it's one of my most popular walking locations. The park has excellent facilities for dogs and the riverside paths are beautiful. I'll build Bishop's Park into your dog's regular routine.",
      },
      {
        question: "Are dogs allowed off-lead in Bishop's Park?",
        answer:
          "There are designated areas where dogs can be off-lead. I only use these areas with your permission and if your dog has reliable recall. Otherwise, we stick to on-lead walking on the main paths.",
      },
      {
        question: "How close to Bishop's Park do you need to be for pick-up?",
        answer:
          "I cover the whole SW6 area, so even if you're not right next to the park, I can pick your dog up from home and walk to the park as part of the session.",
      },
    ],
  },
  hurlingham: {
    intro:
      "Hurlingham is one of Fulham's most desirable residential areas, known for its grand houses, quiet streets, and proximity to Hurlingham Park. It's a peaceful pocket of SW6 that feels almost village-like — perfect for dogs who enjoy calm, structured walks.",
    walkingSpots:
      "Hurlingham Park is the obvious highlight, with well-maintained paths and open spaces. The quiet residential streets around Hurlingham Road and Sulivan Road are also excellent for on-lead walks. For a longer route, I can walk down to the river and along the Thames Path.",
    whyLocal:
      "Hurlingham's calm, residential character makes it ideal for dog walking. There's minimal traffic on the side streets, the park is well-kept, and the whole area has a relaxed pace that most dogs respond well to.",
    faqs: [
      {
        question: "Do you walk in Hurlingham Park?",
        answer:
          "Yes, Hurlingham Park is a key part of my walking routes for clients in this area. It's a beautiful, well-maintained park with plenty of space for dogs to enjoy.",
      },
      {
        question: "Is Hurlingham quiet enough for nervous dogs?",
        answer:
          "It's one of the quietest areas I cover. The residential streets have very little traffic, and Hurlingham Park is generally calm. It's a great area for anxious or reactive dogs.",
      },
      {
        question: "Can you walk from Hurlingham to the river?",
        answer:
          "Absolutely. The Thames Path is walkable from Hurlingham, and I can build a longer route that takes in both the park and the riverside if your dog has the energy for it.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return getAreaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};

  return {
    title: `Dog Walking in ${area.name} | ${siteConfig.brandName}`,
    description: `Professional dog walking in ${area.name}, ${area.postcode}. Solo and small-group walks (max ${siteConfig.pricing.maxDogsPerWalk} dogs). From £${siteConfig.pricing.introPrice}. Meet & greet required.`,
    alternates: { canonical: `${siteConfig.siteUrl}/areas/${slug}` },
    openGraph: {
      title: `Dog Walking in ${area.name} | ${siteConfig.brandName}`,
      description: `Dog walking services in ${area.name}. Solo and small-group walks.`,
      url: `${siteConfig.siteUrl}/areas/${slug}`,
    },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const content = areaContent[slug];
  if (!content) notFound();

  return (
    <PageLayout>
      <ServiceSchema
        name={`Dog Walking in ${area.name}`}
        description={`Professional dog walking in ${area.name}, ${area.postcode}. Solo and small-group walks.`}
        url={`/areas/${slug}`}
      />
      <FAQSchema faqs={content.faqs} />

      <Section>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Areas", href: "/areas" },
            { label: area.name },
          ]}
        />

        <h1 className="ww-serif text-[clamp(2rem,4vw,3rem)] leading-tight mb-4">
          Dog Walking in {area.name}
        </h1>
        <p className="text-[var(--muted)] text-lg leading-relaxed max-w-[640px] mb-10">
          {content.intro}
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {siteConfig.services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group bg-white rounded-xl border border-[var(--green)]/10 p-5 hover:shadow-md hover:border-[var(--green)]/20 transition-all"
            >
              <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--deep-green)] transition-colors">
                {s.name}
              </h3>
              <p className="text-xs text-[var(--muted)] mb-2">
                {s.duration} · From £{siteConfig.pricing.introPrice}
              </p>
              <span className="text-xs text-[var(--green)] font-medium">
                Learn more →
              </span>
            </Link>
          ))}
        </div>

        <div className="mb-10">
          <h2 className="ww-serif text-xl font-semibold mb-3">
            Where I Walk in {area.name}
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-4">
            {content.walkingSpots}
          </p>
          <p className="text-[var(--muted)] leading-relaxed">{content.whyLocal}</p>
        </div>

        <div className="bg-[var(--cream)] rounded-2xl p-8 mb-10">
          <h2 className="ww-serif text-xl font-semibold mb-6">How It Works</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {siteConfig.howItWorks.map((step) => (
              <div key={step.step} className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--green)] text-white font-bold text-xs flex items-center justify-center">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                  <p className="text-[var(--muted)] text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="ww-serif text-xl font-semibold mb-4">
            Dog Walking in {area.name} — FAQ
          </h2>
          <div className="space-y-3">
            {content.faqs.map((faq) => (
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
        </div>

        <div className="text-center bg-[var(--deep-green)] text-white rounded-2xl p-10">
          <h2 className="ww-serif text-2xl font-semibold mb-3">
            Dog walking in {area.name} from £{siteConfig.pricing.introPrice}
          </h2>
          <p className="opacity-85 mb-6 max-w-md mx-auto">
            Start with a free meet &amp; greet. I&apos;ll come to your home in {area.name}{" "}
            to meet your dog.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link
              href="/booking"
              className="bg-white text-[var(--deep-green)] px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Book a Meet &amp; Greet
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:border-white/60 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link
            href="/services"
            className="text-sm text-[var(--green)] font-medium hover:underline"
          >
            Our Services →
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-[var(--green)] font-medium hover:underline"
          >
            Pricing →
          </Link>
          <Link
            href="/areas"
            className="text-sm text-[var(--green)] font-medium hover:underline"
          >
            All Areas →
          </Link>
          <Link
            href="/faq"
            className="text-sm text-[var(--green)] font-medium hover:underline"
          >
            FAQ →
          </Link>
        </div>
      </Section>
    </PageLayout>
  );
}
