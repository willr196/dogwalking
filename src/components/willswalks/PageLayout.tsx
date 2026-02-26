import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";

/**
 * Standard page wrapper with NavBar, Footer, and consistent page spacing.
 */
export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[340px] bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(255,255,255,0.16),transparent)]"
        />
        <NavBar />
        <main className="relative z-[1] flex-1 pb-20 pt-32 md:pt-36">{children}</main>
        <Footer />
      </div>
    </>
  );
}

/** Section wrapper with consistent max-width and padding */
export function Section({
  children,
  className = "",
  bg = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`w-full px-5 py-20 md:py-24 ${bg} ${className}`}>
      <div className="mx-auto w-full max-w-[1240px]">{children}</div>
    </section>
  );
}

/** Breadcrumbs component */
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-7 text-sm text-[var(--muted)]">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-[var(--light)]">/</span>}
            {item.href ? (
              <a href={item.href} className="no-underline transition-colors hover:text-[var(--deep-green)]">
                {item.label}
              </a>
            ) : (
              <span className="font-semibold text-[var(--text)]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
