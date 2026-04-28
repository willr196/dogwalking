import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";

type ServiceCardProps = {
  title: string;
  summary: string;
  price: string;
  duration: string;
};

export function ServiceCard({ title, summary, price, duration }: ServiceCardProps) {
  return (
    <article className="ww-card ww-card-hover p-6">
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[rgba(255,217,93,0.34)] text-[var(--deep-orange)]">
        <Icons.Dog size={20} />
      </div>
      <h3 className="text-xl text-[var(--text)]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{summary}</p>
      <p className="mt-4 text-sm font-black text-[var(--deep-green)]">
        {price} / {duration}
      </p>
      <Link href="/services" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--deep-orange)] hover:text-[var(--deep-green)]">
        View details
        <Icons.ArrowRight size={15} />
      </Link>
    </article>
  );
}
