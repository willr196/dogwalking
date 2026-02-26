interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  rows = 5,
}: InputProps) {
  const fieldClasses = "ww-input";

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[var(--text)]">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`${fieldClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={fieldClasses}
        />
      )}
    </div>
  );
}
