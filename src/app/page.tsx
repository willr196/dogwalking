import Link from "next/link";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";
import { Icons } from "@/components/willswalks/Icons";
import { FAQ } from "@/components/willswalks/FAQ";
import { LocalBusinessSchema } from "@/components/willswalks/JsonLd";
import { AREAS, WALK_PRICE } from "@/components/willswalks/constants";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: count }, (_, i) => (
        <Icons.Star key={i} size={16} filled />
      ))}
    </span>
  );
}

export default async function Home() {
  const reviewCount = await prisma.review.count();

  return (
    <>
      <div className="grain-overlay" />
      <NavBar />
      <LocalBusinessSchema />

      {/* ── HERO ── */}
      <section className="min-h-[90vh] flex items-center ww-hero relative overflow-hidden">
        {/* Background depth — subtle gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-ww-cream via-ww-warm-white to-ww-cream pointer-events-none" />
        <div className="absolute -top-[30%] -right-[15%] w-[60%] h-[120%] bg-[radial-gradient(ellipse,rgba(90,143,110,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[20%] -left-[10%] w-1/2 h-[60%] bg-[radial-gradient(ellipse,rgba(232,149,106,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="ww-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center relative z-[1] w-full">
          <div className="anim-fade-up max-w-[560px] mx-auto lg:mx-0 text-center lg:text-left">
            {/* Star rating + review count badge */}
            {reviewCount > 0 && (
              <div className="inline-flex items-center gap-2 mb-4">
                <StarRating />
                <span className="text-[13px] font-medium text-ww-muted">
                  {reviewCount} happy {reviewCount === 1 ? "owner" : "owners"}
                </span>
              </div>
            )}

            <div className="inline-flex items-center gap-2 bg-ww-green/10 px-4 py-2 rounded-full text-[13px] font-semibold text-ww-deep-green mb-5">
              🐕 Personalised walks · Limited weekly slots
            </div>

            <h1 className="ww-serif text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.08] mb-5">
              Calm, personalised walks
              <br />
              <span className="text-ww-green italic">your dog deserves</span>
            </h1>

            <p className="ww-lede mb-6 max-w-[520px]">
              Solo walks and carefully managed small groups (max 3) tailored to
              your dog&apos;s pace and personality. Expect a calmer dog when you get
              home, and photo updates so you never miss a moment.
            </p>

            {/* Trust signals — above the fold */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 mb-7 text-[13px] text-ww-muted font-medium">
              <span className="flex items-center gap-1.5">
                <Icons.Dog size={15} color="var(--green)" /> Max 3 dogs per walk
              </span>
              <span className="flex items-center gap-1.5">
                <Icons.Check size={15} color="var(--green)" /> Meet &amp; greet required
              </span>
              <span className="flex items-center gap-1.5">
                <Icons.Camera size={15} color="var(--green)" /> Photo updates
              </span>
              <span className="flex items-center gap-1.5">
                <Icons.Shield size={15} color="var(--green)" /> Safety-first handling
              </span>
            </div>

            <div className="flex gap-3 flex-wrap items-center justify-center lg:justify-start mt-2">
              <Link href="/booking" className="ww-btn ww-btn-primary text-[16px]">
                <Icons.Calendar size={19} color="white" /> Book a Meet &amp; Greet
              </Link>
              <Link href="/contact" className="ww-btn ww-btn-secondary text-[16px]">
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center relative order-first lg:order-none mb-10 lg:mb-0">
            <div
              className="w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[420px] aspect-square relative flex items-center justify-center overflow-hidden"
              style={{
                background: "linear-gradient(145deg, var(--green), var(--dark-green))",
                animation: "blobMorph 8s ease-in-out infinite",
              }}
            >
              {/* TODO: Replace with real photo — <Image src="/will-walking.jpg" alt="Will walking a happy dog in Fulham" fill className="object-cover" /> */}
              <span className="text-[7rem] drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)]">🐕</span>
            </div>
            <div
              className="hidden lg:block absolute top-[8%] right-[2%] bg-ww-warm-white px-4.5 py-3 rounded-[18px] shadow-ww-lg font-semibold text-sm"
              style={{ animation: "float 3s ease-in-out infinite" }}
            >
              ⭐ Personal walks
            </div>
            <div
              className="hidden lg:block absolute bottom-[12%] left-[2%] bg-ww-warm-white px-4.5 py-3 rounded-[18px] shadow-ww-lg font-semibold text-sm"
              style={{ animation: "float 3s ease-in-out infinite 1.5s" }}
            >
              📍 Fulham, SW6
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="ww-section bg-ww-warm-white">
        <div className="ww-container">
          <div className="text-center mb-12">
            <div className="ww-kicker mb-3">Signature Service</div>
            <h2 className="ww-serif ww-title mb-3">Personalised Walks. Total Focus.</h2>
            <p className="ww-lede">
              Your dog gets my undivided attention — walks tailored to their needs and pace.
            </p>
          </div>

          <div
            className="bg-ww-cream rounded-[28px] p-[clamp(24px,4vw,40px)] shadow-ww grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-[clamp(16px,3vw,32px)] items-center text-center lg:text-left transition-all duration-300"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-[2.2rem] shrink-0 mx-auto lg:mx-0"
              style={{ background: "linear-gradient(135deg, var(--green), var(--deep-green))" }}
            >
              🦮
            </div>
            <div>
              <h3 className="ww-serif text-[1.4rem] mb-1.5">Individual Dog Walk</h3>
              <p className="text-ww-muted leading-relaxed">
                A full hour of one‑on‑one time. Your dog gets proper exercise, mental
                stimulation, and a calmer, happier return home. You&apos;ll receive photo
                updates during the walk so you can see them enjoying every moment.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-3.5">
                {["60 minutes", "Individual attention", "Photo updates", "GPS tracked route", "Flexible scheduling"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="bg-ww-green/10 text-ww-deep-green px-3.5 py-1.5 rounded-full text-[13px] font-medium"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="text-center">
              <div className="ww-serif text-[2.4rem] font-bold text-ww-deep-green">
                £{WALK_PRICE}
              </div>
              <div className="text-ww-muted text-sm">per walk</div>
              <Link
                href="/booking"
                className="mt-3 inline-block ww-btn ww-btn-primary text-[13px] px-5 py-2"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY PERSONAL? ── */}
      <section className="ww-section-tight bg-ww-cream">
        <div className="ww-container">
          <h2 className="ww-serif ww-title text-center mb-10">
            Why Personalised Walks Make All the Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1280px] mx-auto">
            {[
              {
                icon: "🧘",
                title: "A Calmer Dog",
                text: "Fewer distractions. Your dog comes home relaxed and content.",
              },
              {
                icon: "👀",
                title: "Focused Care",
                text: "One‑on‑one walks let me notice the small things — a limp, a mood change, a new fear. Nothing gets missed.",
              },
              {
                icon: "🔒",
                title: "Tailored Safety",
                text: "Individual walks mean a controlled environment that suits your dog’s needs, especially for reactive, nervous or elderly dogs.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-ww-warm-white rounded-[20px] p-6 text-center shadow-ww hover:shadow-ww-lg transition-shadow duration-300"
              >
                <div className="text-[2.4rem] mb-3">{item.icon}</div>
                <h3 className="ww-serif text-[1.1rem] mb-2">{item.title}</h3>
                <p className="text-ww-muted text-[14px] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="ww-section bg-ww-warm-white">
        <div className="ww-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-12 items-center">
            <div className="max-w-[320px] sm:max-w-[380px] lg:max-w-none mx-auto lg:mx-0">
              {/* Image slot — replace with a real photo for maximum trust */}
              <div
                className="w-full aspect-[4/5] rounded-[28px] flex items-center justify-center text-[5rem] overflow-hidden shadow-ww"
                style={{ background: "linear-gradient(145deg, var(--orange), var(--deep-orange))" }}
              >
                {/* <Image src="/will-photo.jpg" alt="Will, your Fulham dog walker" fill className="object-cover" /> */}
                🧑
              </div>
            </div>
            <div className="text-center lg:text-left">
              <div className="ww-kicker mb-3">Your Walker</div>
              <h2 className="ww-serif ww-title mb-5">
                Hi, I&apos;m Will
              </h2>
              <p className="text-ww-muted mb-4 leading-[1.7] max-w-[480px] mx-auto lg:mx-0">
                I&apos;m a Fulham local who keeps walks personal, solo walks and small
                groups capped at 3 dogs. Each walk is paced and planned around
                your dog&apos;s needs.
              </p>
              <p className="text-ww-muted mb-4 leading-[1.7] max-w-[480px] mx-auto lg:mx-0">
                When your dog is with me, they get my full focus. I learn their quirks, their favourite sniff spots, and what makes them happiest. I send you photos mid‑walk so you can see them thriving.
              </p>
              <p className="text-ww-muted leading-[1.7] max-w-[480px] font-medium mx-auto lg:mx-0">
                Meet &amp; greet required, clear safety rules, and genuinely obsessed
                with giving dogs the best hour of their day.
              </p>

              {/* Trust credentials — visual strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-8 pt-8 border-t border-ww-green/12">
                {[
                  { icon: <Icons.Dog size={22} color="white" />, label: "Max 3 Dogs" },
                  { icon: <Icons.Check size={22} color="white" />, label: "Meet & Greet" },
                  { icon: <Icons.Camera size={22} color="white" />, label: "Photo Updates" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 justify-center sm:justify-start">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-ww-green">
                      {stat.icon}
                    </div>
                    <span className="text-[13px] font-semibold text-ww-text leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AREAS ── */}
      <section className="ww-section bg-ww-dark-green text-white text-center">
        <div className="ww-container">
          <h2 className="ww-serif ww-title mb-3">Areas I Cover</h2>
          <p className="ww-lede opacity-80 mb-8">
            Based in Fulham, I walk dogs across SW6 and surrounding areas
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {AREAS.map((a) => (
              <span
                key={a}
                className="bg-white/12 backdrop-blur-sm px-6 py-3 rounded-full font-medium text-[15px] border border-white/10 hover:bg-white/20 transition-colors duration-250"
              >
                📍 {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS CTA ── */}
      <section className="ww-section bg-ww-cream text-center">
        <div className="ww-container">
          <h2 className="ww-serif ww-title mb-3">
            Happy Pups & Owners
          </h2>
          {reviewCount > 0 && (
            <div className="flex justify-center items-center gap-2 mb-3">
              <StarRating />
              <span className="text-ww-muted font-medium">
                {reviewCount} review{reviewCount > 1 ? "s" : ""}
              </span>
            </div>
          )}
          <p className="text-ww-muted mb-8 max-w-[460px] mx-auto">
            {reviewCount > 0
              ? "See what other Fulham dog owners have to say about their experience."
              : "Be the first to leave a review!"}
          </p>
          <Link
            href="/reviews"
            className="ww-btn ww-btn-primary text-[15px]"
          >
            {reviewCount > 0 ? "Read Reviews" : "Leave a Review"} →
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQ />

      {/* ── BOOKING CTA ── */}
      <section className="ww-section bg-ww-cream text-center">
        <div
          className="ww-container ww-cta-card p-[clamp(32px,5vw,56px)] text-white"
          style={{ background: "linear-gradient(135deg, var(--green), var(--dark-green))" }}
        >
          <h2 className="ww-serif ww-title mb-3">
            Ready to give your dog the walk they deserve?
          </h2>
          <p className="ww-lede opacity-90 mb-3 max-w-[480px] mx-auto">
            Limited slots each week to keep every walk personal. Book yours before they fill up.
          </p>
          <p className="opacity-70 text-sm mb-7">
            £{WALK_PRICE} per walk · 60 minutes · Individual attention
          </p>
          <Link
            href="/booking"
            className="ww-btn text-[17px] font-bold bg-white text-ww-deep-green shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
          >
            Book a Meet &amp; Greet
          </Link>
        </div>
      </section>

      {/* ── WhatsApp FAB ── */}
      <a
        href="https://wa.me/44XXXXXXXXXX"
        target="_blank"
        rel="noopener"
        aria-label="Contact via WhatsApp"
        className="fixed bottom-6 right-6 z-[999] bg-[#25D366] text-white px-5 py-3.5 rounded-full flex items-center gap-2.5 no-underline font-semibold text-[15px] shadow-[0_4px_20px_rgba(37,211,102,0.4)] font-sans hover:shadow-[0_6px_24px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 transition-all duration-250"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="whatsapp-label">WhatsApp</span>
      </a>
      <style>{`@media (max-width: 600px) { .whatsapp-label { display: none; } }`}</style>

      <Footer />
    </>
  );
}
