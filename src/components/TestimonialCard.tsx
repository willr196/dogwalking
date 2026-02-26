type TestimonialCardProps = {
  quote: string;
  name: string;
  area: string;
};

export function TestimonialCard({ quote, name, area }: TestimonialCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm leading-6 text-slate-700">&quot;{quote}&quot;</p>
      <p className="mt-4 text-sm font-semibold text-slate-900">{name}</p>
      <p className="text-xs uppercase tracking-wide text-slate-500">{area}</p>
    </article>
  );
}
