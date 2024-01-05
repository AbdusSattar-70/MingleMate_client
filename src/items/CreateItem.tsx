/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { API_ENDPOINT, MESSAGES } from "../utils/constant";
// import GetAndCreateTag from "./GetAndCreateTag";
import CustomFieldsForm from "./CustomFieldsForm";
import isSuccessRes from "../utils/apiResponse";
import { ItemCustomFieldType } from "../utils/types";

const CreateItem: React.FC = () => {
  const { id: collection_id } = useParams();
  const { auth } = useAuth();
  const [item_name, setItem_name] = useState<string>("");
  // const [tags, setTags] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();
  const [itemCustomFields, setItemCustomFields] = useState<
    ItemCustomFieldType[]
  >([]);

  useEffect(() => {
    const fetchCollectionData = async (id: string) => {
      const res = await axiosPrivate.get(`${API_ENDPOINT.COLLECTION}/${id}`);
      if (isSuccessRes(res)) {
        setItemCustomFields(res.data.custom_fields);
      }
    };

    if (collection_id) {
      fetchCollectionData(collection_id);
    }
  }, [collection_id, axiosPrivate]);

  const handleCustomInput = (id: number, value?: any) => {
    if (itemCustomFields.length) {
      setItemCustomFields((prevFields) => {
        const updatedFields = prevFields.map((field) =>
          field.id === id ? { ...field, field_value: value } : field
        );
        return updatedFields;
      });
    }
  };

  const data = {
    item: {
      item_name,
      collection_id,
      user_id: auth.id,
      custom_fields: itemCustomFields,
      tags: "heeloo hidk",
    },
  };

  const CreateNewItem = async () => {
    try {
      await axiosPrivate.post(API_ENDPOINT.ITEM, data);
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
              Add items to your collection.
            </h4>
          </div>
          <div className="card-body">
            <div className="space-y-2">
              <div className="form-control">
                <label htmlFor="item_name"></label>
                <input
                  type="text"
                  id="item_name"
                  required
                  value={item_name}
                  onChange={(e) => setItem_name(e.target.value)}
                  placeholder="Enter Item Name"
                  className="input input-bordered"
                />
              </div>
              {/* <GetAndCreateTag setTags={setTags} /> */}
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
