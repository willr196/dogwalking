import Link from "next/link";
import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";
import { STANDARD_PRICE } from "@/components/willswalks/constants";

export default function DealsPage() {
  const deals = [
    { name: "Starter Pack", walks: 5, price: 80 },
    { name: "Explorer Pack", walks: 10, price: 150 },
    { name: "Unlimited Month", walks: 30, price: 400 },
  ];

  return (
    <PageLayout>
      <Section>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Deals" }]} />

        <h1 className="ww-serif mb-4 text-[clamp(2.05rem,4.2vw,3rem)] leading-tight">Special Deals</h1>
        <p className="mb-8 max-w-[680px] leading-relaxed text-[var(--muted)]">
          Save on regular walking plans with bundle pricing. All packages are compared against the standard
          £{STANDARD_PRICE} per-walk rate.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => {
            const saving = deal.walks * STANDARD_PRICE - deal.price;
            const pricePerWalk = (deal.price / deal.walks).toFixed(2);

            return (
              <article key={deal.name} className="ww-card flex flex-col justify-between p-6">
                <div>
                  <h2 className="ww-serif text-[1.5rem] leading-tight text-[var(--deep-green)]">{deal.name}</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">{deal.walks} walks</p>

                  <p className="ww-serif mt-5 text-[2.2rem] leading-none text-[var(--deep-green)]">£{deal.price}</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--deep-green)]">
                    Save £{saving} · £{pricePerWalk} per walk
                  </p>
                </div>

                <Link
                  href="/booking"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[linear-gradient(132deg,var(--green),var(--deep-green))] px-6 py-3 text-sm font-semibold text-white no-underline"
                >
                  Book this deal
                </Link>
              </article>
            );
          })}
        </div>
      </Section>
    </PageLayout>
  );
}
