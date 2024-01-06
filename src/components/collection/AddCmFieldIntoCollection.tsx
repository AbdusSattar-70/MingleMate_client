import { BiSolidAddToQueue } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import { InputField } from "../commonComponent/InputField";
import { SelectField } from "../commonComponent/SelectField";
import { CustomFieldType } from "../../utils/types";
import { FieldType } from "../../utils/constant";

interface AddCmFieldIntoCollectionProps {
  addingField: CustomFieldType;
  editableFields: CustomFieldType[];
  handleEditField: (
    objId: string,
    updatedField: Partial<CustomFieldType>
  ) => void;
  handleDeleteField: (id: string) => void;
  addCustomField: (e: React.FormEvent<HTMLFormElement>) => void;
  setAddingField: React.Dispatch<React.SetStateAction<CustomFieldType>>;
}

const AddCmFieldIntoCollection: React.FC<AddCmFieldIntoCollectionProps> = ({
  addingField,
  editableFields,
  handleEditField,
  handleDeleteField,
  addCustomField,
  setAddingField,
}) => {
  return (
    <>
      <ul className="space-y-2" id="dynamicUl">
        {editableFields.map((field, i) => (
          <div
            key={field.id}
            className="flex flex-col gap-2 overflow-auto bg-slate-200 p-2 md:flex-row md:justify-between"
          >
            <h3 className="btn btn-circle text-2xl font-semibold">{i + 1}</h3>
            <InputField
              type="text"
              id={`editableFieldName-${field.id}`}
              className="input input-bordered"
              label="Field Name"
              value={field.field_name || ""}
              onChange={(value) =>
                handleEditField(field.id || "", { field_name: value })
              }
            />
            <SelectField
              id={`editableFieldType-${field.id}`}
              label="Field Type"
              value={field.field_type || ""}
              onChange={(value) =>
                handleEditField(field.id || "", { field_type: value })
              }
              options={Object.entries(FieldType).map(([key, value]) => ({
                key,
                value,
              }))}
            />
            <button
              onClick={() => handleDeleteField(field.id || "")}
              className="btn btn-error"
              type="button"
              aria-label="Delete editableField"
            >
              <FaRegTrashCan />
              <p className="sr-only">Delete</p>
            </button>
          </div>
        ))}
      </ul>

      <p className="text-xl font-semibold">Add Custom Field:</p>

      <form
        onSubmit={addCustomField}
        className="grid grid-cols-1 gap-4 border border-blue-600 p-4 sm:grid-cols-3"
      >
        <InputField
          type="text"
          id="customFieldName"
          className="input input-bordered"
          label="Custom Field Name"
          value={addingField.field_name || ""}
          onChange={(value) =>
            setAddingField((prevField) => ({ ...prevField, field_name: value }))
          }
        />
        <SelectField
          id="CustomFieldType"
          label="Custom Field Type"
          value={addingField.field_type || ""}
          onChange={(value) =>
            setAddingField((prevField) => ({ ...prevField, field_type: value }))
          }
          options={Object.entries(FieldType).map(([key, value]) => ({
            key,
            value,
          }))}
        />
        <button className="btn btn-outline btn-accent">
          <BiSolidAddToQueue className="text-3xl" />
        </button>
      </form>
    </>
  );
};

export default AddCmFieldIntoCollection;
