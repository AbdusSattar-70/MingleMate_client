import { BiSolidAddToQueue } from "react-icons/bi";
import { CustomField, CustomFieldKey } from "../../utils/types";
import { CustomFieldType } from "../../utils/constant";
import { FaRegTrashCan } from "react-icons/fa6";

interface AddCustomFieldProps {
  field_name: string;
  setFieldName: (value: string) => void;
  setFieldType: (value: string) => void;
  field_type: string;
  customFields: CustomField[];
  handleCustomField: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteField: (id: number) => void;
}

const AddCustomField: React.FC<AddCustomFieldProps> = ({
  field_name,
  setFieldName,
  setFieldType,
  field_type,
  customFields,
  handleCustomField,
  handleDeleteField,
}) => {
  return (
    <>
      {/* create  element for custom field dynamically */}
      <ul className="space-y-2" id="dynamicUl">
        {customFields.map((field) => (
          <div
            key={field.id}
            className="flex flex-col gap-2 overflow-auto bg-slate-200 p-2 md:flex-row md:justify-between"
          >
            <h3 className="btn btn-circle text-2xl font-semibold">
              {field.id}
            </h3>
            <div className="form-control">
              <label htmlFor="customFieldName"></label>
              <input
                type="text"
                id={String(field.id)}
                value={field.field_name}
                readOnly
                placeholder="Enter Custom Field Name"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label htmlFor="CustomFieldType"></label>
              <input
                type="text"
                id={String(field.id)}
                value={field.field_type}
                readOnly
                className="input input-bordered"
              />
            </div>
            <button
              onClick={() => handleDeleteField(field.id)}
              className="btn btn-error"
              type="button"
              aria-label="Delete Users"
            >
              <FaRegTrashCan />
              <p className="sr-only">Delete</p>
            </button>
          </div>
        ))}
      </ul>
      <p className="text-xl font-semibold">Add Custom Field:</p>

      <form
        onSubmit={handleCustomField}
        className="grid grid-cols-1 gap-4 border border-blue-600 p-4 sm:grid-cols-3"
      >
        <div className="form-control">
          <label htmlFor="customFieldName"></label>
          <input
            type="text"
            id="customFieldName"
            value={field_name}
            required
            onChange={(e) => setFieldName(e.target.value)}
            placeholder="Enter Custom Field Name"
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label htmlFor="CustomFieldType"></label>
          <select
            name="CustomFieldType"
            value={field_type}
            onChange={(e) => setFieldType(e.target.value)}
            className="select select-bordered"
          >
            <option value="" disabled selected>
              Select Custom Field Type
            </option>
            {(
              Object.entries(CustomFieldType) as [CustomFieldKey, string][]
            ).map(([Key, value]) => (
              <option key={Key} value={Key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-outline btn-accent">
          <BiSolidAddToQueue className="text-3xl" />
        </button>
      </form>
    </>
  );
};

export default AddCustomField;
