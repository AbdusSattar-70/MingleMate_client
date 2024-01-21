interface TextareaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  value,
  onChange,
  required,
  placeholder,
  className,
}) => {
  return (
    <div className="form-control gap-1">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      ></textarea>
    </div>
  );
};

export default TextareaField;
