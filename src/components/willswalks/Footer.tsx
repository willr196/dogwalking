import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--text)] text-white py-9 px-5 text-center">
      <p className="opacity-60 text-sm">© {new Date().getFullYear()} Will&apos;s Walks · Dog Walking in Fulham, London</p>
      <p className="opacity-60 text-sm mt-1.5">
        <Link href="mailto:hello@willswalks.co.uk" className="text-[var(--green)] no-underline hover:underline">
          hello@willswalks.co.uk
        </Link>
      </p>
    </footer>
  );
}
