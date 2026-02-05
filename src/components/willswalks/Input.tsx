type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
};

export function Input({ label, value, onChange, placeholder, type = "text", multiline }: InputProps) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <div>
      <label style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, display: "block" }}>{label}</label>
      <Tag
        type={multiline ? undefined : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={multiline ? 4 : undefined}
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: 14,
          border: "2px solid rgba(107,158,126,0.15)",
          background: "white",
          fontSize: 15,
          fontFamily: "'Outfit', sans-serif",
          outline: "none",
          resize: multiline ? "vertical" : undefined,
          lineHeight: 1.5,
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(107,158,126,0.15)")}
      />
    </div>
  );
}
