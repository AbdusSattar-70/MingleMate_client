import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import UploadImage from "./ImageUpload";
import { API_ENDPOINT, TOPICS } from "../../utils/constant";
import { CustomFieldType } from "../../utils/types";
import { useAuth } from "../../hooks/useAuth";
import AddCmFieldIntoCollection from "./AddCmFieldIntoCollection";
import { deleteItemById } from "../../utils/deleteItemById";
import { SelectField } from "../commonComponent/SelectField";
import { InputField } from "../commonComponent/InputField";
import TextareaField from "../commonComponent/TextareaField";
import usePostDeletePatch from "../../hooks/usePostDeletePatch";

const CreateCollectionForm: React.FC = () => {
  const { auth } = useAuth();
  const { postDeletePatch } = usePostDeletePatch();

  const [title, setTitle] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [addingField, setAddingField] = useState<CustomFieldType>({
    id: "",
    field_name: "",
    field_type: "",
  });
  const [editableFields, setEditableFields] = useState<CustomFieldType[]>([]);

  const addCustomField = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (addingField.field_name && addingField.field_type) {
      const newField = {
        id: Math.floor(Math.random() * 1000 + 1).toString(),
        field_name: addingField.field_name,
        field_type: addingField.field_type,
      };

      setEditableFields([...editableFields, newField]);
      setAddingField({ id: "", field_name: "", field_type: "" });
    }
  };

  const handleDeleteField = (id: string): void => {
    deleteItemById<CustomFieldType>(editableFields, id, setEditableFields);
  };

  const handleEditField = (
    objId: string,
    updatedField: Partial<CustomFieldType>
  ): void => {
    const updated = editableFields.map((field) =>
      field.id === objId ? { ...field, ...updatedField } : field
    );
    setEditableFields(updated);
  };

  const data = {
    collection: {
      user_id: auth.id,
      title,
      description,
      categories: topic,
      custom_fields: editableFields,
      image: auth.collectImg,
    },
  };

  const CreateNewCollection = async () => {
    await postDeletePatch("post", API_ENDPOINT.COLLECTION, data);
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                id="title"
                label="Collection Name"
                type="text"
                value={title}
                onChange={(value) => setTitle(value)}
                required
                placeholder="Enter Collection Name"
                className="input input-bordered"
              />

              <SelectField
                id="selectTopic"
                label="Topic or Category"
                value={topic}
                onChange={(selectedValue) => setTopic(selectedValue)}
                options={Object.entries(TOPICS).map(
                  ([topicKey, topicValue]) => ({
                    key: topicKey,
                    value: topicValue,
                  })
                )}
              />
            </div>

            <TextareaField
              id="description"
              label="Description"
              value={description}
              onChange={(value) => setDescription(value)}
              required
              placeholder="Add Description"
              className="textarea textarea-bordered textarea-lg w-full"
            />

            <AddCmFieldIntoCollection
              addingField={addingField}
              addCustomField={addCustomField}
              handleEditField={handleEditField}
              handleDeleteField={handleDeleteField}
              editableFields={editableFields}
              setAddingField={setAddingField}
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
