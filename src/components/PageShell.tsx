import type { ReactNode } from "react";

export function PageShell({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar?: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6">
      <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr] items-start">
        <main className="min-w-0">{children}</main>
        {sidebar ? (
          <aside className="lg:sticky lg:top-24">{sidebar}</aside>
        ) : null}
      </div>
    </div>
  );
}

