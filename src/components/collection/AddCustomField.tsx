import { BiSolidAddToQueue } from "react-icons/bi";
import { CustomField, CustomFieldKey } from "../../utils/types";
import { CustomFieldType } from "../../utils/constant";

interface AddCustomFieldProps {
  field_name: string;
  setFieldName: (value: string) => void;
  setFieldType: (value: string) => void;
  field_type: string;
  customFields: CustomField[];
  handleCustomField: () => void;
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
      <ul className="max-w-sm" id="dynamicUl">
        {customFields.map((field) => (
          <div key={field.id}>
            <h3 className="btn btn-circle bg-blue-200 text-2xl font-semibold">
              {field.id}
            </h3>
            <div className=" mb-4 space-y-4 bg-slate-200">
              <div className="form-control">
                <label htmlFor="customFieldName"></label>
                <input
                  type="text"
                  id="customFieldName"
                  value={field.field_name}
                  onChange={(e) => setFieldName(e.target.value)}
                  placeholder="Enter Custom Field Name"
                  className="input input-bordered max-w-sm"
                />
              </div>

              <div className="form-control">
                <label htmlFor="CustomFieldType"></label>
                <select
                  name="CustomFieldType"
                  value={field_type}
                  onChange={(e) => setFieldType(e.target.value)}
                  className="select select-bordered max-w-sm"
                >
                  <option disabled selected>
                    Select Custom Field Type
                  </option>
                  {(
                    Object.entries(CustomFieldType) as [
                      CustomFieldKey,
                      string
                    ][]
                  ).map(([Key, value]) => (
                    <option key={Key} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => handleDeleteField(field.id)}
                className="btn btn-primary"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </ul>

      <div className=" space-y-4">
        <div className="form-control">
          <label htmlFor="customFieldName"></label>
          <input
            type="text"
            id="customFieldName"
            value={field_name}
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
            className="select select-bordered max-w-sm"
          >
            <option disabled selected>
              Select Custom Field Type
            </option>
            {(
              Object.entries(CustomFieldType) as [CustomFieldKey, string][]
            ).map(([Key, value]) => (
              <option key={Key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="btn btn-outline btn-accent"
        onClick={handleCustomField}
      >
        <BiSolidAddToQueue className="text-3xl" />
      </button>
    </>
  );
};

export default AddCustomField;
