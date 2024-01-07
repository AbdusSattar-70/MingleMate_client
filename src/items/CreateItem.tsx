/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { API_ENDPOINT } from "../utils/constant";
import CustomFieldsForm from "./CustomFieldsForm";
import isSuccessRes from "../utils/apiResponse";
import { CollectionType, CustomFieldType, TagOption } from "../utils/types";
import { InputField } from "../components/commonComponent/InputField";
import usePostDeletePatch from "../hooks/usePostDeletePatch";
import GetAndCreateTag from "./GetAndCreateTag";

const CreateItem: React.FC = () => {
  const { postDeletePatch } = usePostDeletePatch();
  const { id: collection_id } = useParams();
  const { auth } = useAuth();
  const [item_name, setItem_name] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const [collection, setCollection] = useState<CollectionType>();
  const [itemCustomFields, setItemCustomFields] = useState<CustomFieldType[]>(
    []
  );

  const handleTagChange = (newValue: TagOption[]) => {
    setSelectedTags(newValue);
  };

  useEffect(() => {
    const fetchCollectionData = async (id: string) => {
      const res = await axiosPrivate.get(
        `${API_ENDPOINT.COLLECTION_CUSTOM_FIELDS}/${id}`
      );
      if (isSuccessRes(res)) {
        setItemCustomFields(res?.data?.custom_fields);
        setCollection(res?.data);
        setTags(res?.data?.tags);
      }
    };

    if (collection_id) {
      fetchCollectionData(collection_id);
    }
  }, [collection_id, axiosPrivate]);

  const handleCustomInput = (id: string, field_value?: any) => {
    if (itemCustomFields.length) {
      setItemCustomFields((prevFields) => {
        return prevFields.map((field) =>
          field.id === id ? { ...field, field_value } : field
        );
      });
    }
  };

  const data = {
    item: {
      item_name,
      collection_id,
      user_id: auth.id,
      custom_fields: itemCustomFields,
      tags: selectedTags.map((tag) => tag.value).join(" "),
    },
  };

  const CreateNewItem = async () => {
    await postDeletePatch("post", API_ENDPOINT.ITEM, data);
  };

  return (
    <section>
      <div className="hero hero-content">
        <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl">
          <div className="text-center">
            <img
              className="mx-auto w-48"
              src={
                collection?.image ||
                "https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              }
              alt="collection image"
            />
            <h4 className="mb-4 mt-1 pb-1 text-xl font-semibold">
              Add items to your <strong>{collection?.title}'s</strong>{" "}
              collection.
            </h4>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                type="text"
                id="item_name"
                label="Item Name"
                value={item_name}
                onChange={setItem_name}
                required
                placeholder="Enter Item Name"
                className="input input-bordered"
              />
              <GetAndCreateTag
                handleTagChange={handleTagChange}
                selectedTags={selectedTags}
                tags={tags}
              />
            </div>
            <CustomFieldsForm
              itemCustomFields={itemCustomFields}
              handleCustomInput={handleCustomInput}
            />
            <div className="form-control mt-6">
              <button
                type="submit"
                onClick={CreateNewItem}
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

export default CreateItem;
