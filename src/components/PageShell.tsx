import type { ReactNode } from "react";

export function PageShell({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar?: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-6">
      <div className="grid items-start gap-8 lg:gap-10 xl:grid-cols-[minmax(0,1.62fr)_minmax(320px,0.88fr)]">
        <main className="min-w-0">{children}</main>
        {sidebar ? <aside className="lg:sticky lg:top-28">{sidebar}</aside> : null}
      </div>
    </div>
  );
}
