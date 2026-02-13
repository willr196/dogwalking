import Link from "next/link";
import { Icons } from "@/components/willswalks/Icons";

export function AdminHeader() {
  return (
    <div className="flex justify-between items-center mb-7 flex-wrap gap-3">
      <div>
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--muted)] mb-2 text-sm no-underline hover:text-[var(--deep-green)] transition-colors"
        >
          <Icons.ArrowLeft size={16} /> Home
        </Link>
        <h1 className="ww-serif text-[clamp(1.6rem,4vw,2.2rem)]">Dashboard</h1>
      </div>
      <Link
        href="/admin/dog-breeds"
        className="inline-flex items-center gap-2 bg-[var(--green)] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        Manage Dog Breeds
      </Link>
    </div>
  );
}
