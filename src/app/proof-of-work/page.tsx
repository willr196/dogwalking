import { PageLayout, Section, Breadcrumbs } from "@/components/willswalks/PageLayout";
import { Icons } from "@/components/willswalks/Icons";

export default function ProofOfWorkPage() {
  const features = [
    {
      title: "GPS Tracking",
      icon: Icons.MapPin,
      description:
        "Every walk is logged with route and distance so you can review where your dog went.",
    },
    {
      title: "Photo Updates",
      icon: Icons.Camera,
      description:
        "You receive in-walk or post-walk photos so you can see how the session went.",
    },
    {
      title: "Walk Report",
      icon: Icons.Check,
      description:
        "Each walk includes a short summary with timing, notes, and behaviour highlights.",
    },
  ];

  return (
    <PageLayout>
      <Section>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Proof of Work" }]} />

        <h1 className="ww-serif mb-4 text-[clamp(2.05rem,4.2vw,3rem)] leading-tight">Proof of Work</h1>
        <p className="mb-8 max-w-[680px] leading-relaxed text-[var(--muted)]">
          Clear visibility on each session. You always know where your dog walked and how they got on.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const IconComp = feature.icon;

            return (
              <article key={feature.title} className="ww-card p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(15,141,135,0.14)] text-[var(--deep-green)]">
                  <IconComp size={23} />
                </div>
                <h2 className="ww-serif text-[1.4rem] leading-tight text-[var(--deep-green)]">{feature.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </Section>
    </PageLayout>
  );
}
