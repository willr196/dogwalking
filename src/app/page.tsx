import Link from "next/link";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";
import { Icons } from "@/components/willswalks/Icons";
import { AREAS, WALK_PRICE } from "@/components/willswalks/constants";
import { JsonLd } from "@/components/willswalks/JsonLd";

// ISR: revalidate every 60s instead of force-dynamic
export const revalidate = 60;

async function getReviewCount() {
  try {
    return await prisma.review.count();
  } catch (error) {
    console.warn("Failed to fetch review count, defaulting to 0.", error);
    return 0;
  }
}

async function ReviewCount() {
  const reviewCount = await getReviewCount();
  return (
    <p className="text-[var(--muted)] text-[1.05rem]">
      {reviewCount > 0
        ? `${reviewCount} review${reviewCount > 1 ? "s" : ""} and counting!`
        : "Be the first to leave a review!"}
    </p>
  );
}

export default async function Home() {
  const reviewCount = await getReviewCount();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Will's Walks",
          description: "Solo dog walking in Fulham, SW6. Dedicated one-on-one walks.",
          url: "https://willswalks.co.uk",
          telephone: "+447000000000",
          email: "hello@willswalks.co.uk",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Fulham",
            addressRegion: "London",
            postalCode: "SW6",
            addressCountry: "GB",
          },
          areaServed: AREAS.map((a) => ({ "@type": "City", name: a })),
          priceRange: `£${WALK_PRICE}`,
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "07:00",
            closes: "19:00",
          },
        }}
      />
      <div className="grain-overlay" aria-hidden="true" />
      <NavBar />

      {/* ─── Hero Section ─── */}
      <section className="min-h-screen flex items-center px-5 pt-[100px] pb-[60px] relative overflow-hidden">
        {/* Background gradients */}
        <div
          className="absolute pointer-events-none"
          style={{ top: "-30%", right: "-15%", width: "60%", height: "120%" }}
          aria-hidden="true"
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse,rgba(107,158,126,0.12)_0%,transparent_70%)]" />
        </div>
        <div
          className="absolute pointer-events-none"
          style={{ bottom: "-20%", left: "-10%", width: "50%", height: "60%" }}
          aria-hidden="true"
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse,rgba(232,149,106,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="max-w-[1100px] mx-auto grid grid-cols-2 gap-[60px] items-center relative z-[1] w-full hero-grid">
          <div className="anim-fade-up">
            <div className="inline-flex items-center gap-2 bg-[rgba(107,158,126,0.12)] px-4 py-2 rounded-full text-[13px] font-semibold text-[var(--deep-green)] mb-6">
              🐕 Solo walks only · Fulham, SW6
            </div>
            <h1 className="ww-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.1] mb-5">
              Happy dogs, <span className="text-[var(--green)] italic">happy walks</span>
              <br />
              in Fulham
            </h1>
            <p className="text-[1.1rem] text-[var(--muted)] max-w-[460px] mb-8 leading-[1.7]">
              Dedicated one-on-one walks for your furry best friend. Because every dog deserves undivided attention and adventure.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-[var(--green)] text-white px-7 py-[14px] rounded-full font-semibold text-[15px] transition-all duration-200 hover:bg-[var(--deep-green)] hover:-translate-y-0.5 no-underline"
              >
                Book a Walk <Icons.ArrowRight size={18} />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-[var(--green)] text-[var(--green)] px-7 py-[14px] rounded-full font-semibold text-[15px] transition-all duration-200 hover:bg-[var(--green)] hover:text-white no-underline"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="flex justify-center relative hero-visual-col" aria-hidden="true">
            <div
              className="w-[min(380px,100%)] flex items-center justify-center"
              style={{
                aspectRatio: "1",
                background: "linear-gradient(145deg, var(--green), var(--dark-green))",
                animation: "blobMorph 8s ease-in-out infinite",
              }}
            >
              <span className="text-[7rem] drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)]">🐕</span>
            </div>
            <div
              className="absolute bg-[var(--warm-white)] px-[18px] py-3 rounded-[18px] font-semibold text-sm shadow-[var(--shadow-lg)]"
              style={{ top: "8%", right: "2%", animation: "float 3s ease-in-out infinite" }}
            >
              ⭐ Solo walks only
            </div>
            <div
              className="absolute bg-[var(--warm-white)] px-[18px] py-3 rounded-[18px] font-semibold text-sm shadow-[var(--shadow-lg)]"
              style={{ bottom: "12%", left: "2%", animation: "float 3s ease-in-out infinite 1.5s" }}
            >
              📍 Fulham, SW6
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services Section ─── */}
      <section id="services" className="py-20 px-5 bg-[var(--warm-white)]">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="ww-serif text-[clamp(1.8rem,4vw,2.6rem)] mb-3">What I Offer</h2>
            <p className="text-[var(--muted)] text-[1.05rem]">
              Quality time and exercise for your pup, with full attention on them
            </p>
          </div>

          <div className="bg-[var(--cream)] rounded-[28px] p-[clamp(24px,4vw,40px)] shadow-[var(--shadow)] grid grid-cols-[auto_1fr_auto] gap-[clamp(16px,3vw,32px)] items-center transition-all duration-300 service-grid">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--green)] to-[var(--deep-green)] rounded-full flex items-center justify-center text-[2.2rem] shrink-0">
              🦮
            </div>
            <div>
              <h3 className="ww-serif text-[1.4rem] mb-1.5">Solo Walks</h3>
              <p className="text-[var(--muted)] leading-relaxed">
                One hour of dedicated one-on-one time. Your dog gets my complete attention — no distractions, no pack
                dynamics, just quality exercise and enrichment.
              </p>
            </div>
            <div className="text-right">
              <div className="ww-serif text-[2rem] font-bold text-[var(--green)]">£{WALK_PRICE}</div>
              <div className="text-[var(--muted)] text-sm">per walk</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section id="about" className="py-20 px-5 bg-[var(--cream)]">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="ww-serif text-[clamp(1.8rem,4vw,2.6rem)] mb-3">About Will</h2>
          <p className="text-[var(--muted)] text-[1.05rem] leading-relaxed mb-6">
            I&apos;m a passionate dog lover based in Fulham. Every dog I walk gets treated like my own — with patience,
            care, and plenty of adventures in the local parks.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { icon: "🛡️", label: "Fully Insured" },
              { icon: "📍", label: "Local to Fulham" },
              { icon: "🐕", label: "Solo Walks Only" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 bg-[var(--warm-white)] px-5 py-3 rounded-full shadow-[var(--shadow)] text-sm font-medium">
                <span>{item.icon}</span> {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Areas Section ─── */}
      <section className="py-20 px-5 bg-[var(--warm-white)]">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="ww-serif text-[clamp(1.8rem,4vw,2.6rem)] mb-3">Areas I Cover</h2>
          <p className="text-[var(--muted)] text-[1.05rem] mb-8">Walking dogs across Fulham and nearby areas</p>
          <div className="flex flex-wrap justify-center gap-3">
            {AREAS.map((area) => (
              <span
                key={area}
                className="bg-[var(--cream)] px-5 py-2.5 rounded-full text-sm font-medium text-[var(--deep-green)] shadow-[var(--shadow)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                📍 {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reviews CTA ─── */}
      <section className="py-20 px-5 bg-[var(--cream)] text-center">
        <div className="max-w-[500px] mx-auto">
          <h2 className="ww-serif text-[clamp(1.8rem,4vw,2.6rem)] mb-3">What Owners Say</h2>
          <Suspense fallback={<p className="text-[var(--muted)]">Loading reviews...</p>}>
            <ReviewCount />
          </Suspense>
          <Link
            href="/reviews"
            className="inline-block mt-6 bg-[var(--green)] text-white px-7 py-[14px] rounded-full font-semibold text-[15px] transition-all duration-200 hover:bg-[var(--deep-green)] hover:-translate-y-0.5 no-underline"
          >
            {reviewCount > 0 ? "Read Reviews" : "Leave a Review"} →
          </Link>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 px-5 bg-[var(--cream)] text-center">
        <div
          className="max-w-[600px] mx-auto rounded-[32px] p-[clamp(32px,5vw,56px)] text-white"
          style={{ background: `linear-gradient(135deg, var(--green), var(--deep-green))` }}
        >
          <h2 className="ww-serif text-[clamp(1.6rem,3vw,2.2rem)] mb-3">Ready to book a walk?</h2>
          <p className="opacity-90 mb-7 leading-relaxed">Your pup deserves the best. Book a solo walk today.</p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-white text-[var(--deep-green)] px-8 py-4 rounded-full font-bold text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg no-underline"
          >
            Book Now <Icons.ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ─── WhatsApp FAB ─── */}
      <a
        href="https://wa.me/447000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full font-semibold text-sm shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl no-underline"
        aria-label="Contact via WhatsApp"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="whatsapp-label">WhatsApp</span>
      </a>

      <Footer />
    </>
  );
}
