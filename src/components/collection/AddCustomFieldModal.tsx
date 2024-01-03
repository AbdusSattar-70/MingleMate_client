import { GrClose } from "react-icons/gr";
import { BiSolidAddToQueue } from "react-icons/bi";
import { CustomFieldKey } from "../../utils/types";
import { CustomFieldType } from "../../utils/constant";

const AddCustomFieldModal = ({
  addCustomFieldRef,
  field_name,
  setFieldName,
  setFieldType,
  field_type,
  handleCustomField,
}) => {
  return (
    <dialog
      ref={addCustomFieldRef}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
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
              ).map(([topicKey, topicValue]) => (
                <option key={topicKey} value={topicKey}>
                  {topicValue}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="modal-action justify-between">
          <button
            className="btn btn-outline btn-primary"
            onClick={() => addCustomFieldRef.current.close()}
          >
            <GrClose className="text-3xl" />
          </button>
          <button
            className="btn btn-outline btn-accent"
            onClick={handleCustomField}
          >
            <BiSolidAddToQueue className="text-3xl" />
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddCustomFieldModal;
