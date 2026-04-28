import { Icons } from "@/components/willswalks/Icons";

type TestimonialCardProps = {
  quote: string;
  name: string;
  area: string;
};

export function TestimonialCard({ quote, name, area }: TestimonialCardProps) {
  return (
    <article className="ww-card ww-card-hover p-6">
      <div className="mb-4 flex gap-1 text-[var(--orange)]" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <Icons.Star key={index} size={15} filled />
        ))}
      </div>
      <p className="text-sm leading-6 text-[var(--text)]">&quot;{quote}&quot;</p>
      <p className="mt-4 text-sm font-black text-[var(--deep-green)]">{name}</p>
      <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--deep-orange)]">{area}</p>
    </article>
  );
}
