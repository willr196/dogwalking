export function Empty({ text }: { text: string }) {
  return (
    <div className="text-center py-8 text-[var(--muted)]">
      <p className="text-3xl mb-2">🐾</p>
      <p className="text-sm">{text}</p>
    </div>
  );
}
