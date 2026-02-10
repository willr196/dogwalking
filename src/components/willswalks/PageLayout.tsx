import { NavBar } from "@/components/willswalks/NavBar";
import { Footer } from "@/components/willswalks/Footer";

/**
 * Standard page wrapper with NavBar, Footer, and consistent padding.
 * Use for all public-facing content pages.
 */
export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grain-overlay" />
      <NavBar />
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 pt-24 pb-16">{children}</main>
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
    <section
      id={id}
      className={`w-full px-5 py-20 md:py-24 ${bg} ${className}`}
    >
      <div className="w-full max-w-[1400px] mx-auto">{children}</div>
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
    <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted)] mb-6">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-[var(--light)]">/</span>}
            {item.href ? (
              <a
                href={item.href}
                className="hover:text-[var(--deep-green)] transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-[var(--text)] font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
