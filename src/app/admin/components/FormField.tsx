interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
}

export default function FormField({
  label, name, type = "text", value, onChange, required, placeholder, textarea,
}: FormFieldProps) {
  const cls = "w-full bg-transparent border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-700 focus:border-zinc-500 focus:outline-none transition";

  return (
    <div>
      <label className="block text-xs text-zinc-500 mb-2">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          rows={3}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  );
}
