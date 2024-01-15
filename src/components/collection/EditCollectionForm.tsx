import React, { useEffect, useState } from "react";
import {
  API_ENDPOINT,
  COLLECT_IMG,
  MESSAGES,
  ROUTES,
  TOPICS,
} from "../../utils/constant";
import { CollectionType, CustomFieldType } from "../../utils/types";
import { useAuth } from "../../hooks/useAuth";
import AddCmFieldIntoCollection from "./AddCmFieldIntoCollection";
import { deleteItemById } from "../../utils/deleteItemById";
import { SelectField } from "../common/SelectField";
import { InputField } from "../common/InputField";
import PhotoUpload from "../photoUpload/PhotoUpload";
import isSuccessRes, { setErrorToast } from "../../utils/apiResponse";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../utils/api";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { MarkdownField } from "../common/MarkdownField";

const EditCollectionForm: React.FC = () => {
  const { collection_id } = useParams();
  const collection = useLoaderData() as CollectionType;
  const {
    author_id,
    title: prevTitle,
    description: prevDescrip,
    category: prevTopic,
  } = collection;
  const navigate = useNavigate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [title, setTitle] = useState<string>(prevTitle || "");
  const [topic, setTopic] = useState<string>(prevTopic || "");
  const [description, setDescription] = useState<string>(prevDescrip || "");
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

  //fetch custom fields
  useEffect(() => {
    const fetchPreviosCustomFields = async (id: string) => {
      const res = await axios.get(
        `${API_ENDPOINT.COLLECTION_CUSTOM_FIELDS}/${id}`
      );
      console.log(res.data);
      if (isSuccessRes(res)) {
        setEditableFields(res?.data?.custom_fields);
      }
    };

    if (collection_id) {
      fetchPreviosCustomFields(collection_id);
    }
  }, [collection_id]);

  const data = {
    collection: {
      user_id: author_id,
      title,
      description,
      categories: topic,
      image: auth.collectImg,
      custom_fields: editableFields,
    },
  };

  const updateCollection = async () => {
    try {
      const res = await axiosPrivate.patch(
        `${API_ENDPOINT.COLLECTION}/${collection_id}`,
        data
      );
      if (isSuccessRes(res)) {
        toast.success(MESSAGES.SUCCESS);
        navigate(ROUTES.MY_ALL_COLLECTIONS);
      }
    } catch (error) {
      setErrorToast(error);
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
              Update Collection
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
              handleEditField={handleEditField}
              handleDeleteField={handleDeleteField}
              editableFields={editableFields}
              setAddingField={setAddingField}
            />
            <PhotoUpload usage={COLLECT_IMG} />
            <div className="form-control mt-6">
              <button
                type="submit"
                onClick={updateCollection}
                className="btn btn-primary"
              >
                Submit for update
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditCollectionForm;
