export function Empty({ text }: { text: string }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: 48,
        background: "rgba(107,158,126,0.04)",
        borderRadius: 20,
        border: "2px dashed rgba(107,158,126,0.15)",
      }}
    >
      <p style={{ color: "var(--muted)" }}>{text}</p>
    </div>
  );
}
