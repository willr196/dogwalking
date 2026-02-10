import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";
import { STANDARD_PRICE } from "@/components/willswalks/constants";

/**
 * DealsPage lists special bundles for multiple walks.
 * Each bundle shows its name, number of walks, total price and the savings relative to individual bookings.
 */
export default function DealsPage() {
  // Define deals relative to the constant walk price.
  const deals = [
    {
      name: "Starter Pack",
      walks: 5,
      price: 80,
    },
    {
      name: "Explorer Pack",
      walks: 10,
      price: 150,
    },
    {
      name: "Unlimited Month",
      walks: 30,
      price: 400,
    },
  ];

  return (
    <>
      <NavBar />
      <main className="ww-page">
        <section className="ww-container mb-14">
          <h1 className="font-serif text-4xl font-bold mb-6 text-ww-deep-green">
            Special Deals
          </h1>
          <p className="text-ww-text max-w-xl leading-relaxed mb-8">
            Save on your dog walks with our curated bundles. Each package offers a better price per walk compared to our standard rate of £{STANDARD_PRICE}.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => {
              const saving = deal.walks * STANDARD_PRICE - deal.price;
              const pricePerWalk = (deal.price / deal.walks).toFixed(2);
              return (
                <div
                  key={deal.name}
                  className="flex flex-col justify-between rounded-2xl border border-ww-green/20 shadow-ww-lg p-6 bg-ww-cream"
                >
                  <div>
                    <h2 className="font-serif text-2xl font-semibold text-ww-deep-green">
                      {deal.name}
                    </h2>
                    <p className="text-ww-text mt-1 mb-4">
                      {deal.walks} walks
                    </p>
                    <p className="text-ww-deep-green font-bold text-xl">
                      £{deal.price}
                    </p>
                    <p className="text-ww-green mt-1">
                      Save £{saving} · £{pricePerWalk} per walk
                    </p>
                  </div>
                  <a
                    href="/booking"
                    className="ww-btn ww-btn-primary mt-6"
                  >
                    Book this deal
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
