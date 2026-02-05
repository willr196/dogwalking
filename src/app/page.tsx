import Link from "next/link";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";
import { Icons } from "@/components/willswalks/Icons";
import { theme } from "@/components/willswalks/theme";
import { AREAS, WALK_PRICE } from "@/components/willswalks/constants";

export default async function Home() {
  const reviewCount = await prisma.review.count();

  return (
    <>
      <div className="grain-overlay" />
      <NavBar />

      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "100px 20px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-30%",
            right: "-15%",
            width: "60%",
            height: "120%",
            background: "radial-gradient(ellipse, rgba(107,158,126,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "50%",
            height: "60%",
            background: "radial-gradient(ellipse, rgba(232,149,106,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            width: "100%",
          }}
          className="hero-grid"
        >
          <div className="anim-fade-up">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(107,158,126,0.12)",
                padding: "8px 16px",
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 600,
                color: theme.deepGreen,
                marginBottom: 24,
              }}
            >
              🐕 Solo walks only · Fulham, SW6
            </div>
            <h1 className="ww-serif" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", lineHeight: 1.1, marginBottom: 20 }}>
              Happy dogs, <span style={{ color: theme.green, fontStyle: "italic" }}>happy walks</span>
              <br />
              in Fulham
            </h1>
            <p style={{ fontSize: "1.1rem", color: theme.muted, maxWidth: 460, marginBottom: 32, lineHeight: 1.7 }}>
              Dedicated one-on-one walks for your furry best friend. Because every dog deserves undivided attention and adventure.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/booking"
                style={{
                  background: theme.green,
                  color: "white",
                  border: "none",
                  padding: "16px 32px",
                  borderRadius: 50,
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(107,158,126,0.3)",
                  transition: "all 0.3s ease",
                  fontFamily: "'Outfit', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                }}
              >
                <Icons.Calendar size={18} color="white" /> Book a Walk
              </Link>
              <Link
                href="/contact"
                style={{
                  background: theme.warmWhite,
                  color: theme.text,
                  border: "2px solid rgba(107,158,126,0.25)",
                  padding: "16px 32px",
                  borderRadius: 50,
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontFamily: "'Outfit', sans-serif",
                  textDecoration: "none",
                }}
              >
                Get in Touch
              </Link>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} className="hero-visual-col">
            <div
              style={{
                width: "100%",
                maxWidth: 380,
                aspectRatio: "1",
                position: "relative",
                background: `linear-gradient(145deg, ${theme.green}, ${theme.darkGreen})`,
                animation: "blobMorph 8s ease-in-out infinite",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "7rem", filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.15))" }}>🐕</span>
            </div>
            <div
              style={{
                position: "absolute",
                top: "8%",
                right: "2%",
                background: theme.warmWhite,
                padding: "12px 18px",
                borderRadius: 18,
                boxShadow: theme.shadowLg,
                fontWeight: 600,
                fontSize: 14,
                animation: "float 3s ease-in-out infinite",
              }}
            >
              ⭐ Solo walks only
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "12%",
                left: "2%",
                background: theme.warmWhite,
                padding: "12px 18px",
                borderRadius: 18,
                boxShadow: theme.shadowLg,
                fontWeight: 600,
                fontSize: 14,
                animation: "float 3s ease-in-out infinite 1.5s",
              }}
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

      <section id="services" style={{ padding: "80px 20px", background: theme.warmWhite }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="ww-serif" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", marginBottom: 12 }}>
              What I Offer
            </h2>
            <p style={{ color: theme.muted, fontSize: "1.05rem" }}>Quality time and exercise for your pup, with full attention on them</p>
          </div>

          <div
            style={{
              background: theme.cream,
              borderRadius: 28,
              padding: "clamp(24px,4vw,40px)",
              boxShadow: theme.shadow,
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "clamp(16px,3vw,32px)",
              alignItems: "center",
              transition: "all 0.3s ease",
            }}
            className="service-grid"
          >
            <div
              style={{
                width: 80,
                height: 80,
                background: `linear-gradient(135deg, ${theme.green}, ${theme.deepGreen})`,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.2rem",
                flexShrink: 0,
              }}
            >
              🦮
            </div>
            <div>
              <h3 className="ww-serif" style={{ fontSize: "1.4rem", marginBottom: 6 }}>
                Solo Walks
              </h3>
              <p style={{ color: theme.muted, lineHeight: 1.6 }}>
                One hour of dedicated one-on-one time. Your dog gets my complete attention — no distractions, no pack dynamics, just quality exercise and enrichment.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                {["60 minutes", "1-on-1 attention", "Photo updates", "Flexible scheduling"].map((tag) => (
                  <span key={tag} style={{ background: "rgba(107,158,126,0.12)", color: theme.deepGreen, padding: "6px 14px", borderRadius: 50, fontSize: 13, fontWeight: 500 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="ww-serif" style={{ fontSize: "2.4rem", fontWeight: 700, color: theme.deepGreen }}>
                £{WALK_PRICE}
              </div>
              <div style={{ color: theme.muted, fontSize: 14 }}>per walk</div>
            </div>
          </div>

          <style>{`@media (max-width: 768px) { .service-grid { grid-template-columns: 1fr !important; text-align: center; justify-items: center; } }`}</style>
        </div>
      </section>

      <section id="about" style={{ padding: "80px 20px", background: theme.cream }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 48, alignItems: "center" }} className="about-grid-layout">
            <div>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  background: `linear-gradient(145deg, ${theme.orange}, ${theme.deepOrange})`,
                  borderRadius: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "5rem",
                }}
              >
                🧑
              </div>
            </div>
            <div>
              <h2 className="ww-serif" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", marginBottom: 16 }}>
                Hi, I'm Will 👋
              </h2>
              <p style={{ color: theme.muted, marginBottom: 12, lineHeight: 1.7 }}>
                I'm a Fulham local with a genuine love for dogs. I believe every dog deserves individual attention during their walks — that's why I only do solo walks.
              </p>
              <p style={{ color: theme.muted, marginBottom: 12, lineHeight: 1.7 }}>
                When your dog is with me, they're not competing for attention in a pack. They get dedicated exercise, mental stimulation, and plenty of fuss.
              </p>
              <p style={{ color: theme.muted, lineHeight: 1.7 }}>I'm fully insured, DBS checked, and treat every dog as if they were my own.</p>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  marginTop: 28,
                  paddingTop: 28,
                  borderTop: "1px solid rgba(107,158,126,0.15)",
                }}
              >
                {[
                  { icon: <Icons.Shield size={28} color={theme.green} />, label: "Fully Insured" },
                  { icon: <Icons.Check size={28} color={theme.green} />, label: "DBS Checked" },
                  { icon: <Icons.Camera size={28} color={theme.green} />, label: "Photo Updates" },
                ].map((stat, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ marginBottom: 6 }}>{stat.icon}</div>
                    <div style={{ fontSize: 13, color: theme.muted }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 768px) { .about-grid-layout { grid-template-columns: 1fr !important; } .about-grid-layout > div:first-child { max-width: 280px; margin: 0 auto; } }`}</style>
        </div>
      </section>

      <section style={{ padding: "80px 20px", background: theme.darkGreen, color: "white", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="ww-serif" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", marginBottom: 12 }}>
            Areas I Cover
          </h2>
          <p style={{ opacity: 0.85, fontSize: "1.05rem", marginBottom: 28 }}>Based in Fulham, I walk dogs across SW6 and surrounding areas</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
            {AREAS.map((a) => (
              <span key={a} style={{ background: "rgba(255,255,255,0.12)", padding: "10px 20px", borderRadius: 50, fontWeight: 500, fontSize: 15 }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 20px", background: theme.warmWhite, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="ww-serif" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", marginBottom: 12 }}>
            Happy Pups & Owners
          </h2>
          <p style={{ color: theme.muted, marginBottom: 28 }}>
            {reviewCount > 0 ? `${reviewCount} review${reviewCount > 1 ? "s" : ""} and counting!` : "Be the first to leave a review!"}
          </p>
          <Link
            href="/reviews"
            style={{
              background: theme.green,
              color: "white",
              border: "none",
              padding: "14px 28px",
              borderRadius: 50,
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
              transition: "all 0.2s",
              textDecoration: "none",
            }}
          >
            {reviewCount > 0 ? "Read Reviews" : "Leave a Review"} →
          </Link>
        </div>
      </section>

      <section style={{ padding: "80px 20px", background: theme.cream, textAlign: "center" }}>
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            background: `linear-gradient(135deg, ${theme.green}, ${theme.deepGreen})`,
            borderRadius: 32,
            padding: "clamp(32px,5vw,56px)",
            color: "white",
          }}
        >
          <h2 className="ww-serif" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", marginBottom: 12 }}>
            Ready to book a walk?
          </h2>
          <p style={{ opacity: 0.9, marginBottom: 28, lineHeight: 1.6 }}>Your pup deserves the best. Let's get them moving!</p>
          <Link
            href="/booking"
            style={{
              background: "white",
              color: theme.deepGreen,
              border: "none",
              padding: "16px 36px",
              borderRadius: 50,
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
              fontFamily: "'Outfit', sans-serif",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Book Now — £{WALK_PRICE}/walk
          </Link>
        </div>
      </section>

      <a
        href="https://wa.me/44XXXXXXXXXX"
        target="_blank"
        rel="noopener"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 999,
          background: "#25D366",
          color: "white",
          padding: "14px 20px",
          borderRadius: 50,
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
          fontWeight: 600,
          fontSize: 15,
          boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
          transition: "all 0.3s ease",
          fontFamily: "'Outfit', sans-serif",
        }}
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
