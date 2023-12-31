import React, { useState } from "react";
import { API_ENDPOINT, COLLECT_IMG, TOPICS } from "../../utils/constant";
import { CustomFieldType } from "../../utils/types";
import { useAuth } from "../../hooks/useAuth";
import AddCmFieldIntoCollection from "./AddCmFieldIntoCollection";
import { deleteItemById } from "../../utils/deleteItemById";
import { SelectField } from "../../components/SelectField";
import { InputField } from "../../components/InputField";
import TextareaField from "../../components/TextareaField";
import PhotoUpload from "../../components/PhotoUpload";
import isSuccessRes, { setErrorToast } from "../../utils/apiResponse";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CreateCollectionForm: React.FC = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
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
    try {
      const res = await axiosPrivate.post(API_ENDPOINT.COLLECTION, data);

      if (isSuccessRes(res)) {
        toast.success("Success");
      }
    } catch (error) {
      setErrorToast(error);
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
            <PhotoUpload usage={COLLECT_IMG} />
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
    </section>
  );
};

export default CreateCollectionForm;
