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
  const fieldClasses =
    "w-full px-4 py-3 rounded-2xl border-2 border-[var(--light)] bg-[var(--cream)] text-[var(--text)] text-sm transition-colors duration-200 focus:border-[var(--green)] focus:outline-none placeholder:text-[var(--light)]";

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-[var(--text)]">{label}</label>
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
