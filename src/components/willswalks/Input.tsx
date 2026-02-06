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
      <label className="text-sm font-medium mb-2 block">{label}</label>
      <Tag
        type={multiline ? undefined : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={multiline ? 4 : undefined}
        className={`ww-input ${multiline ? "resize-y leading-relaxed" : ""}`}
      />
    </div>
  );
}
