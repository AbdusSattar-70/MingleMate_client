import { SelectFieldProps } from "../../utils/types";

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="form-control gap-1">
      <label htmlFor={id}>{label}</label>
      <select
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select select-bordered dark:bg-form-input"
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map(({ key, value }) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};
