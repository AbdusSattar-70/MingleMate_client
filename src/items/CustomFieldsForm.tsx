import React from "react";
import { ItemCustomFieldType } from "../utils/types";

interface CustomFieldProps {
  field: ItemCustomFieldType;
  handleCustomInput: (
    id: number,
    value: string | number | boolean | Date
  ) => void;
}

const CustomField: React.FC<CustomFieldProps> = ({
  field,
  handleCustomInput,
}) => {
  const renderInput = () => {
    switch (field.field_type) {
      case "text":
      case "string":
        return (
          <input
            type="text"
            id={`field_${field.id}`}
            required
            value={field.field_value || ""}
            onChange={(e) => handleCustomInput(field.id, e.target.value)}
            placeholder="Enter Collection Name"
            className="input input-bordered"
          />
        );
      case "number":
        return (
          <input
            type="number"
            id={`field_${field.id}`}
            value={field.field_value || ""}
            onChange={(e) =>
              handleCustomInput(field.id, parseFloat(e.target.value))
            }
          />
        );
      case "boolean":
        return (
          <input
            type="checkbox"
            id={`field_${field.id}`}
            checked={field.field_value || false}
            onChange={(e) => handleCustomInput(field.id, e.target.checked)}
          />
        );
      case "date":
        return (
          <input
            type="date"
            id={`field_${field.id}`}
            value={field.field_value || ""}
            onChange={(e) => handleCustomInput(field.id, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div key={field.id}>
      <label htmlFor={`field_${field.id}`}>{field.field_name}</label>
      {renderInput()}
    </div>
  );
};

interface CustomFieldsFormProps {
  itemCustomFields: ItemCustomFieldType[];
  handleCustomInput: (
    id: number,
    value: string | number | boolean | Date
  ) => void;
}

const CustomFieldsForm: React.FC<CustomFieldsFormProps> = ({
  handleCustomInput,
  itemCustomFields,
}) => {
  return (
    <form>
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
