import { BiSolidAddToQueue } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";
import { InputField } from "../common/InputField";
import { SelectField } from "../common/SelectField";
import { CustomFieldType } from "../../utils/types";
import {
  FieldType,
  INSTRUCTION_COLLECTION_CREATION,
} from "../../utils/constant";
import keyId from "../../utils/keyId";
import { FaCircleInfo } from "react-icons/fa6";
import { Tooltip } from "../common/ToolTip";
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
            key={keyId()}
            className="bg-slate-200 flex flex-col items-center justify-center gap-2 overflow-auto p-2 md:flex-row md:justify-between"
          >
            <h3 className="btn btn-circle text-xl font-semibold dark:bg-form-input dark:text-white">
              {i + 1}
            </h3>
            <InputField
              type="text"
              id={`editableFieldName-${field.id}`}
              className="input input-bordered dark:bg-form-input"
              label=""
              value={field.field_name || ""}
              onChange={(value) =>
                handleEditField(field.id || "", { field_name: value })
              }
            />
            <SelectField
              id={`editableFieldType-${field.id}`}
              label=""
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

      <div className="flex items-center justify-start gap-1 p-4 text-xl font-semibold">
        <span>Add Custom Field:</span>
        <Tooltip html={<p>{INSTRUCTION_COLLECTION_CREATION}</p>}>
          <span>
            <FaCircleInfo className="cursor-pointer text-3xl text-meta-5 hover:text-meta-9" />
          </span>
        </Tooltip>
      </div>

      <form
        onSubmit={addCustomField}
        className="border-blue-600 grid grid-cols-1 gap-4 border p-4 sm:grid-cols-3"
      >
        <InputField
          type="text"
          id="customFieldName"
          className="input input-bordered dark:bg-form-input"
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
        <button className="btn btn-primary mt-6 place-self-stretch">
          <BiSolidAddToQueue className="text-3xl" />
        </button>
      </form>
    </>
  );
};

export default AddCmFieldIntoCollection;
