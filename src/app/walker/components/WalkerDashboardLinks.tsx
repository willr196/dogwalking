import Link from "next/link";

export function WalkerDashboardLinks({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      {isAdmin ? (
        <Link
          href="/admin/dog-breeds"
          className="inline-flex items-center gap-2 bg-[var(--green)] text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Open Breed Manager
        </Link>
      ) : (
        <Link
          href="/dog-breeds"
          className="inline-flex items-center gap-2 bg-[var(--green)] text-white px-7 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          View Breed Dictionary
        </Link>
      )}
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-white text-[var(--text)] border-2 border-[var(--green)]/20 px-7 py-3 rounded-full font-semibold hover:border-[var(--green)]/40 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
