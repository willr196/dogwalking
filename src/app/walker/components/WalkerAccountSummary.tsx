export function WalkerAccountSummary({
  name,
  email,
}: {
  name: string | null;
  email: string;
}) {
  return (
    <div className="rounded-2xl bg-[var(--warm-white)] border border-[var(--green)]/10 p-6 mb-6">
      <p className="text-sm text-[var(--muted)] mb-3">Signed in as</p>
      <p className="font-semibold text-[var(--text)]">{name || "Walker"}</p>
      <p className="text-sm text-[var(--muted)]">{email}</p>
    </div>
  );
}
