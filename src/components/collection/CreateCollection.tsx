import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import UploadImage from "./ImageUpload";
import { BiSolidAddToQueue } from "react-icons/bi";
import AddCustomFieldModal from "./AddCustomFieldModal";
import { API_ENDPOINT, TOPICS } from "../../utils/constant";
import { TopicKey } from "../../utils/types";
import useImageUpload from "../../firebase/useImageUpload";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import { useAuth } from "../../hooks/useAuth";
interface CustomField {
  id: number;
  fieldName: string;
  fieldType: string;
}

const CreateCollectionForm: React.FC = () => {
  // const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { downloadURL } = useImageUpload();
  const addCustomFieldRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [field_name, setFieldName] = useState<string>("");
  const [field_type, setFieldType] = useState<string>("");

  const handleCustomField = (): void => {
    const newCustomField: CustomField = {
      id: customFields.length + 1,
      fieldName: field_name,
      fieldType: field_type,
    };

    setCustomFields([...customFields, newCustomField]);
    setFieldName("");
    setFieldType("");
  };

  const handleDeleteField = (id: number): void => {
    const updatedCustomFields = customFields.filter((field) => field.id !== id);
    setCustomFields(updatedCustomFields);
  };

  const CreateNewCollection = async () => {
    try {
      if (!title && !topic && !description) {
        toast.error("error");
        return;
      }
      await axiosPrivate.post(API_ENDPOINT.COLLECTION, {
        collection: {
          user_id: 1,
          title,
          description,
          categories: topic,
          custom_fields: customFields,
          image: downloadURL,
        },
      });
      toast.success("DASHBOARD_TABLE_CONST.BLOCK.SUCCESS");
    } catch (error) {
      toast.error("DASHBOARD_TABLE_CONST.BLOCK.ERROR");
    }
  };
  return (
    <section>
      <div className="hero hero-content">
        <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl">
          <div className="text-center">
            <img
              className="mx-auto w-48"
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              alt="logo"
            />
            <h4 className="mb-4 mt-1 pb-1 text-xl font-semibold">
              Create Your Own Collection!
            </h4>
          </div>
          <form className="card-body">
            <div className="space-y-2">
              <div className="form-control">
                <label htmlFor="title"></label>
                <input
                  type="text"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Collection Name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label htmlFor="selectTopic"></label>
                <select
                  name="selectTopic"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="select select-bordered max-w-sm"
                >
                  <option disabled selected>
                    Select Topic or Category
                  </option>
                  {(Object.entries(TOPICS) as [TopicKey, string][]).map(
                    ([topicKey, topicValue]) => (
                      <option key={topicKey} value={topicKey}>
                        {topicValue}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className="form-control">
              <textarea
                placeholder="Add Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered textarea-lg w-full"
              ></textarea>
            </div>

            {/* create  element for custom field dynamically */}
            <ul className="form-control" id="dynamicUl">
              {customFields.map((field) => (
                <li key={field.id} className="flex gap-4">
                  <p className="text-2xl">
                    {`${field.id}. name: ${field.fieldName} - type: ${field.fieldType}`}
                  </p>
                  <button
                    onClick={() => handleDeleteField(field.id)}
                    className="btn btn-primary"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center justify-center border border-red-400 p-4">
                <BiSolidAddToQueue
                  role="button"
                  aria-label="create board button"
                  className="cursor-pointer text-5xl text-blue-400 hover:text-slate-300 md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
                  onClick={() => addCustomFieldRef?.current?.showModal()}
                />
                <p className="text-center">Add Custom Field</p>
              </div>
              <div className="border border-dashed border-blue-400 p-4 ">
                <UploadImage />
              </div>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                onClick={CreateNewCollection}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} />
      <AddCustomFieldModal
        addCustomFieldRef={addCustomFieldRef}
        field_name={field_name}
        setFieldName={setFieldName}
        setFieldType={setFieldType}
        field_type={field_type}
        handleCustomField={handleCustomField}
      />
    </section>
  );
};

export default CreateCollectionForm;
