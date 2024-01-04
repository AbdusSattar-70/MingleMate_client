import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import UploadImage from "./ImageUpload";
import AddCustomField from "./AddCustomField";
import { API_ENDPOINT, MESSAGES, TOPICS } from "../../utils/constant";
import { CustomField, TopicKey } from "../../utils/types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuth } from "../../hooks/useAuth";

const CreateCollectionForm: React.FC = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [title, setTitle] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [field_name, setFieldName] = useState<string>("");
  const [field_type, setFieldType] = useState<string>("");

  const handleCustomField = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!field_type) {
      toast.warn(MESSAGES.FILL_TYPE_FIELD);
      return;
    }
    setCustomFields([
      ...customFields,
      {
        id: customFields.length + 1,
        field_name,
        field_type,
      },
    ]);
    setFieldName("");
    setFieldType("");
  };

  const handleDeleteField = (id: number): void => {
    const updatedCustomFields = customFields.filter((field) => field.id !== id);
    setCustomFields(updatedCustomFields);
  };

  const data = {
    collection: {
      user_id: auth.id,
      title,
      description,
      categories: topic,
      custom_fields: customFields,
      image: auth.collectImg,
    },
  };

  const CreateNewCollection = async () => {
    try {
      if (!title && !topic && !description) {
        toast.error(MESSAGES.COLLECTION_FIELD);
        return;
      }
      await axiosPrivate.post(API_ENDPOINT.COLLECTION, data);
      toast.success(MESSAGES.SUCCESS);
    } catch (error) {
      toast.error(MESSAGES.TRY_AGAIN);
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
          <div className="card-body">
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
                  className="select select-bordered"
                >
                  <option value="" disabled selected>
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

            <AddCustomField
              field_name={field_name}
              setFieldName={setFieldName}
              setFieldType={setFieldType}
              field_type={field_type}
              customFields={customFields}
              handleCustomField={handleCustomField}
              handleDeleteField={handleDeleteField}
            />
            <div className="flex w-72 gap-2 ">
              <div className="w-36 border border-dashed border-blue-400 p-4 ">
                <UploadImage />
              </div>
              {auth.collectImg && (
                <img
                  className="mx-auto w-36 border border-e-red-600"
                  src={auth.collectImg}
                  alt="collection image"
                />
              )}
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
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </section>
  );
};

export default CreateCollectionForm;
