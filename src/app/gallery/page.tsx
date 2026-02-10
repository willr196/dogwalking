import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";

/**
 * GalleryPage displays a playful gallery of dog-related icons and emojis.
 * Real photos can be added in the future or via user uploads.
 */
export default function GalleryPage() {
  // An array of emojis to simulate gallery images.
  const emojis = ["🐶", "🐾", "🎾", "🦴", "🐕", "🌳", "🏞️", "☀️", "💧", "🦋"];

  return (
    <>
      <NavBar />
      <main className="ww-page">
        <section className="ww-container">
          <h1 className="font-serif text-4xl font-bold mb-6 text-ww-deep-green">
            Gallery
          </h1>
          <p className="text-ww-text max-w-xl leading-relaxed mb-8">
            Take a peek at some of our favourite moments. More photos coming soon!
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {emojis.map((emoji, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center aspect-square bg-ww-cream border border-ww-green/20 rounded-2xl shadow-ww-lg text-4xl"
              >
                <span role="img" aria-label="gallery emoji">
                  {emoji}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
