import React, { useState } from "react";
import {
  API_ENDPOINT,
  COLLECT_IMG,
  MESSAGES,
  ROUTES,
  TOPICS,
} from "../../utils/constant";
import { CustomFieldType } from "../../utils/types";
import { useAuth } from "../../hooks/useAuth";
import AddCmFieldIntoCollection from "./AddCmFieldIntoCollection";
import { deleteItemById } from "../../utils/deleteItemById";
import { SelectField } from "../common/SelectField";
import { InputField } from "../common/InputField";
import PhotoUpload from "../photoUpload/PhotoUpload";
import isSuccessRes, { setErrorToast } from "../../utils/apiResponse";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { MarkdownField } from "../common/MarkdownField";
import keyId from "../../utils/keyId";
import SmallSpinner from "../common/SmallSpinner";

const CreateCollection: React.FC = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
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
        id: keyId(),
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

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    setEditableFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, [e.target.name]: e.target.value } : field
      )
    );
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
      setLoading(true);
      const res = await axiosPrivate.post(API_ENDPOINT.COLLECTION, data);
      if (isSuccessRes(res)) {
        setLoading(false);
        toast.success(MESSAGES.SUCCESS);
        navigate(`${ROUTES.USER_COLLECTIONS}/${auth.id}`);
      }
    } catch (error) {
      setErrorToast(error);
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="hero hero-content">
        <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl dark:bg-meta-4">
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
                className="input input-bordered dark:bg-form-input"
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

            <div className="form-control gap-1">
              <label htmlFor="description"> Description</label>
              <MarkdownField
                value={description}
                setValue={(value: string) => setDescription(value)}
              />
            </div>
            <AddCmFieldIntoCollection
              addingField={addingField}
              addCustomField={addCustomField}
              handleInputChange={handleInputChange}
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
                {loading ? <SmallSpinner /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateCollection;
