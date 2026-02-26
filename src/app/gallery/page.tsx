import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";

export default function GalleryPage() {
  const emojis = ["🐶", "🐾", "🎾", "🦴", "🐕", "🌳", "🏞", "☀", "💧", "🦋"];

  return (
    <PageLayout>
      <Section>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gallery" }]} />

        <h1 className="ww-serif mb-4 text-[clamp(2.05rem,4.2vw,3rem)] leading-tight">Gallery</h1>
        <p className="mb-8 max-w-[680px] leading-relaxed text-[var(--muted)]">
          A quick visual board of walk-day mood. Full photo updates are shared directly after each booking.
        </p>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
          {emojis.map((emoji, index) => (
            <div
              key={index}
              className="flex aspect-square items-center justify-center rounded-2xl border border-[var(--line)] bg-white text-4xl shadow-[var(--shadow-soft)]"
            >
              <span role="img" aria-label="gallery emoji">
                {emoji}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
