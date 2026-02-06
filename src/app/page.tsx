import Link from "next/link";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";
import { Icons } from "@/components/willswalks/Icons";
import { AREAS, WALK_PRICE } from "@/components/willswalks/constants";

export default async function Home() {
  const reviewCount = await prisma.review.count();

  return (
    <>
      <div className="grain-overlay" />
      <NavBar />

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center px-5 pt-[100px] pb-[60px] relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-[30%] -right-[15%] w-[60%] h-[120%] bg-[radial-gradient(ellipse,rgba(107,158,126,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[20%] -left-[10%] w-1/2 h-[60%] bg-[radial-gradient(ellipse,rgba(232,149,106,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1100px] mx-auto grid grid-cols-2 gap-[60px] items-center relative z-[1] w-full hero-grid">
          <div className="anim-fade-up">
            <div className="inline-flex items-center gap-2 bg-ww-green/10 px-4 py-2 rounded-full text-[13px] font-semibold text-ww-deep-green mb-6">
              🐕 Solo walks only · Fulham, SW6
            </div>
            <h1 className="ww-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.1] mb-5">
              Happy dogs, <span className="text-ww-green italic">happy walks</span>
              <br />
              in Fulham
            </h1>
            <p className="text-[1.1rem] text-ww-muted max-w-[460px] mb-8 leading-relaxed">
              Dedicated one-on-one walks for your furry best friend. Because every dog deserves
              undivided attention and adventure.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/booking"
                className="bg-ww-green text-white px-8 py-4 rounded-full font-semibold text-base font-sans flex items-center gap-2 no-underline shadow-[0_4px_16px_rgba(107,158,126,0.3)] hover:bg-ww-deep-green transition-colors"
              >
                <Icons.Calendar size={18} color="white" /> Book a Walk
              </Link>
              <Link
                href="/contact"
                className="bg-ww-warm-white text-ww-text border-2 border-ww-green/25 px-8 py-4 rounded-full font-semibold text-base font-sans no-underline hover:border-ww-green/50 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center relative hero-visual-col">
            <div
              className="w-full max-w-[380px] aspect-square relative flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, var(--green), var(--dark-green))",
                animation: "blobMorph 8s ease-in-out infinite",
              }}
            >
              <span className="text-[7rem] drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)]">🐕</span>
            </div>
            <div
              className="absolute top-[8%] right-[2%] bg-ww-warm-white px-4.5 py-3 rounded-[18px] shadow-ww-lg font-semibold text-sm"
              style={{ animation: "float 3s ease-in-out infinite" }}
            >
              ⭐ Solo walks only
            </div>
            <div
              className="absolute bottom-[12%] left-[2%] bg-ww-warm-white px-4.5 py-3 rounded-[18px] shadow-ww-lg font-semibold text-sm"
              style={{ animation: "float 3s ease-in-out infinite 1.5s" }}
            >
              📍 Fulham, SW6
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-visual-col { order: -1 !important; }
          .hero-visual-col > div:first-child { max-width: 260px !important; }
          .hero-visual-col > div:not(:first-child) { display: none; }
        }
      `}</style>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 px-5 bg-ww-warm-white">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="ww-serif text-[clamp(1.8rem,4vw,2.6rem)] mb-3">What I Offer</h2>
            <p className="text-ww-muted text-[1.05rem]">
              Quality time and exercise for your pup, with full attention on them
            </p>
          </div>

          <div
            className="bg-ww-cream rounded-[28px] p-[clamp(24px,4vw,40px)] shadow-ww grid grid-cols-[auto_1fr_auto] gap-[clamp(16px,3vw,32px)] items-center transition-all duration-300 service-grid"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-[2.2rem] shrink-0"
              style={{ background: "linear-gradient(135deg, var(--green), var(--deep-green))" }}
            >
              🦮
            </div>
            <div>
              <h3 className="ww-serif text-[1.4rem] mb-1.5">Solo Walks</h3>
              <p className="text-ww-muted leading-relaxed">
                One hour of dedicated one-on-one time. Your dog gets my complete attention — no
                distractions, no pack dynamics, just quality exercise and enrichment.
              </p>
              <div className="flex flex-wrap gap-2 mt-3.5">
                {["60 minutes", "1-on-1 attention", "Photo updates", "Flexible scheduling"].map(
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
            </div>
          </div>

          <style>{`@media (max-width: 768px) { .service-grid { grid-template-columns: 1fr !important; text-align: center; justify-items: center; } }`}</style>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 px-5 bg-ww-cream">
        <div className="max-w-[900px] mx-auto">
          <div
            className="grid grid-cols-[1fr_1.3fr] gap-12 items-center about-grid-layout"
          >
            <div>
              <div
                className="w-full aspect-[4/5] rounded-[28px] flex items-center justify-center text-[5rem]"
                style={{ background: "linear-gradient(145deg, var(--orange), var(--deep-orange))" }}
              >
                🧑
              </div>
            </div>
            <div>
              <h2 className="ww-serif text-[clamp(1.6rem,3vw,2.2rem)] mb-4">
                Hi, I&apos;m Will 👋
              </h2>
              <p className="text-ww-muted mb-3 leading-relaxed">
                I&apos;m a Fulham local with a genuine love for dogs. I believe every dog deserves
                individual attention during their walks — that&apos;s why I only do solo walks.
              </p>
              <p className="text-ww-muted mb-3 leading-relaxed">
                When your dog is with me, they&apos;re not competing for attention in a pack. They
                get dedicated exercise, mental stimulation, and plenty of fuss.
              </p>
              <p className="text-ww-muted leading-relaxed">
                I&apos;m fully insured, DBS checked, and treat every dog as if they were my own.
              </p>
              <div className="flex gap-8 mt-7 pt-7 border-t border-ww-green/15">
                {[
                  { icon: <Icons.Shield size={28} color="var(--green)" />, label: "Fully Insured" },
                  { icon: <Icons.Check size={28} color="var(--green)" />, label: "DBS Checked" },
                  { icon: <Icons.Camera size={28} color="var(--green)" />, label: "Photo Updates" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="mb-1.5">{stat.icon}</div>
                    <div className="text-[13px] text-ww-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 768px) { .about-grid-layout { grid-template-columns: 1fr !important; } .about-grid-layout > div:first-child { max-width: 280px; margin: 0 auto; } }`}</style>
        </div>
      </section>

      {/* ── AREAS ── */}
      <section className="py-20 px-5 bg-ww-dark-green text-white text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="ww-serif text-[clamp(1.8rem,3vw,2.4rem)] mb-3">Areas I Cover</h2>
          <p className="opacity-85 text-[1.05rem] mb-7">
            Based in Fulham, I walk dogs across SW6 and surrounding areas
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {AREAS.map((a) => (
              <span
                key={a}
                className="bg-white/10 px-5 py-2.5 rounded-full font-medium text-[15px]"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS CTA ── */}
      <section className="py-20 px-5 bg-ww-warm-white text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="ww-serif text-[clamp(1.8rem,3vw,2.4rem)] mb-3">
            Happy Pups & Owners
          </h2>
          <p className="text-ww-muted mb-7">
            {reviewCount > 0
              ? `${reviewCount} review${reviewCount > 1 ? "s" : ""} and counting!`
              : "Be the first to leave a review!"}
          </p>
          <Link
            href="/reviews"
            className="bg-ww-green text-white px-7 py-3.5 rounded-full font-semibold text-[15px] font-sans no-underline hover:bg-ww-deep-green transition-colors"
          >
            {reviewCount > 0 ? "Read Reviews" : "Leave a Review"} →
          </Link>
        </div>
      </section>

      {/* ── BOOKING CTA ── */}
      <section className="py-20 px-5 bg-ww-cream text-center">
        <div
          className="max-w-[600px] mx-auto rounded-[32px] p-[clamp(32px,5vw,56px)] text-white"
          style={{ background: "linear-gradient(135deg, var(--green), var(--deep-green))" }}
        >
          <h2 className="ww-serif text-[clamp(1.6rem,3vw,2.2rem)] mb-3">
            Ready to book a walk?
          </h2>
          <p className="opacity-90 mb-7 leading-relaxed">
            Your pup deserves the best. Let&apos;s get them moving!
          </p>
          <Link
            href="/booking"
            className="bg-white text-ww-deep-green px-9 py-4 rounded-full font-bold text-base font-sans no-underline inline-block shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-shadow"
          >
            Book Now — £{WALK_PRICE}/walk
          </Link>
        </div>
      </section>

      {/* ── WhatsApp FAB ── */}
      <a
        href="https://wa.me/44XXXXXXXXXX"
        target="_blank"
        rel="noopener"
        className="fixed bottom-6 right-6 z-[999] bg-[#25D366] text-white px-5 py-3.5 rounded-full flex items-center gap-2.5 no-underline font-semibold text-[15px] shadow-[0_4px_20px_rgba(37,211,102,0.4)] font-sans hover:shadow-[0_6px_24px_rgba(37,211,102,0.5)] transition-shadow"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="whatsapp-label">WhatsApp</span>
      </a>
      <style>{`@media (max-width: 600px) { .whatsapp-label { display: none; } }`}</style>

      <Footer />
    </>
  );
}