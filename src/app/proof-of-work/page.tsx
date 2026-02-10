import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";
import { Icons } from "@/components/willswalks/Icons";

/**
 * ProofOfWorkPage explains how we provide transparency for each walk.
 * It details GPS tracking, live photo updates and walk summaries.
 */
export default function ProofOfWorkPage() {
  const features = [
    {
      title: "GPS Tracking",
      icon: Icons.MapPin,
      description:
        "Every walk is tracked via GPS so you can see the exact route and distance covered. You’ll receive a map once the walk is completed.",
    },
    {
      title: "Photo Updates",
      icon: Icons.Camera,
      description:
        "We send photo updates during the walk so you can see your dog enjoying their outing. Expect plenty of happy snaps!",
    },
    {
      title: "Walk Report",
      icon: Icons.Check,
      description:
        "At the end of the walk, you receive a summary with duration, distance, and any special notes such as water breaks or social interactions.",
    },
  ];

  return (
    <>
      <NavBar />
      <main className="ww-page">
        <section className="ww-container">
          <h1 className="font-serif text-4xl font-bold mb-6 text-ww-deep-green">
            Proof of Work
          </h1>
          <p className="text-ww-text max-w-xl leading-relaxed mb-8">
            Transparency is important to us. Here’s how we keep you informed during every walk.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="flex flex-col items-start p-6 border border-ww-green/20 rounded-2xl shadow-ww-lg bg-ww-cream"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-ww-green/10 mb-4 text-ww-deep-green">
                    {/* Render the icon component */}
                    <IconComp size={28} />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-ww-deep-green mb-2">
                    {feat.title}
                  </h2>
                  <p className="text-ww-text">
                    {feat.description}
                  </p>
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
