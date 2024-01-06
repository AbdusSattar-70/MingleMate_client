import { SWITCH_CASE } from "../utils/constant";
import { CustomFieldType } from "../utils/types";
import { UpcaseFirstChar } from "../utils/UpcaseFirstChar";

interface CustomFieldProps {
  field: CustomFieldType;
  handleCustomInput: (
    id: string,
    value: string | number | boolean | Date
  ) => void;
}

const CustomField: React.FC<CustomFieldProps> = ({
  field,
  handleCustomInput,
}) => {
  const renderInput = () => {
    switch (field.field_type) {
      case SWITCH_CASE.STRING:
        return (
          <input
            type="text"
            id={`field_${field.id}`}
            required
            value={field.field_value || ""}
            onChange={(e) => handleCustomInput(field.id, e.target.value)}
            className="input input-bordered"
          />
        );
      case SWITCH_CASE.TEXT:
        return (
          <textarea
            id={`field_${field.id}`}
            value={field.field_value || ""}
            onChange={(e) => handleCustomInput(field.id, e.target.value)}
            required
            className="textarea textarea-bordered textarea-lg w-full"
          ></textarea>
        );
      case SWITCH_CASE.NUMBER:
        return (
          <input
            type="number"
            id={`field_${field.id}`}
            value={field.field_value || ""}
            className="input input-bordered"
            onChange={(e) =>
              handleCustomInput(field.id, parseFloat(e.target.value))
            }
          />
        );
      case SWITCH_CASE.BOOLEAN:
        return (
          <input
            type="checkbox"
            id={`field_${field.id}`}
            checked={field.field_value || false}
            className="checkbox-primary checkbox"
            onChange={(e) => handleCustomInput(field.id, e.target.checked)}
          />
        );
      case SWITCH_CASE.DATE:
        return (
          <input
            type="date"
            id={`field_${field.id}`}
            value={field.field_value || ""}
            className="input input-bordered"
            onChange={(e) => handleCustomInput(field.id, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div key={field.id} className="form-control">
      <label htmlFor={`field_${field.id}`}>
        {UpcaseFirstChar(field.field_name) + " :"}
      </label>
      {renderInput()}
    </div>
  );
};

interface CustomFieldsFormProps {
  itemCustomFields: CustomFieldType[];
  handleCustomInput: (
    id: string,
    value: string | number | boolean | Date
  ) => void;
}

const CustomFieldsForm: React.FC<CustomFieldsFormProps> = ({
  handleCustomInput,
  itemCustomFields,
}) => {
  return (
    <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {itemCustomFields.length > 0 ? (
        itemCustomFields.map((field) => (
          <CustomField
            key={field.id}
            field={field}
            handleCustomInput={handleCustomInput}
          />
        ))
      ) : (
        <p>no data found</p>
      )}
    </form>
  );
};

export default CustomFieldsForm;
