import { InputFieldProps } from "../../utils/types";

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  required,
  placeholder,
  type,
  className,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};
