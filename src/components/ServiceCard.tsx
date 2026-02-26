import Link from "next/link";

type ServiceCardProps = {
  title: string;
  summary: string;
  price: string;
  duration: string;
};

export function ServiceCard({ title, summary, price, duration }: ServiceCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{summary}</p>
      <p className="mt-4 text-sm font-semibold text-slate-800">
        {price} / {duration}
      </p>
      <Link href="/services" className="mt-4 inline-flex text-sm font-semibold text-sky-800 hover:text-sky-900">
        View details
      </Link>
    </article>
  );
}
