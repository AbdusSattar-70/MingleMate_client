/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import CustomFieldsForm from "./createItem/CustomFieldsForm";
import { CustomFieldType, ItemType, TagOption } from "../../utils/types";
import { InputField } from "../common/InputField";
import GetAndCreateTag from "./createItem/GetAndCreateTag";
import { useAuth } from "../../hooks/useAuth";
import { API_ENDPOINT, ITEM_IMG, MESSAGES, ROUTES } from "../../utils/constant";
import isSuccessRes, { setErrorToast } from "../../utils/apiResponse";
import { toast } from "react-toastify";
import PhotoUpload from "../photoUpload/PhotoUpload";
import Spinner from "../common/Spinner";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SmallSpinner from "../common/SmallSpinner";
import axios from "../../utils/api";
import { updateItemCustomFields } from "../../utils/updateItemFields";
const EditItemForm: React.FC = () => {
  const getItemFromRoute = useLoaderData() as ItemType;
  const {
    item_name: prevItemName,
    item_custom_fields: prevCustomFields,
    collection_id,
    item_id,
    tags,
    item_image,
  } = getItemFromRoute;
  const tagOptions: TagOption[] = tags.map((tag) => ({
    value: tag,
    label: tag,
  }));
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<string | undefined>(item_image);
  const [item_name, setItem_name] = useState<string>(prevItemName || "");
  const [selectedTags, setSelectedTags] = useState<TagOption[]>(tagOptions);
  const [itemCustomFields, setItemCustomFields] = useState<CustomFieldType[]>(
    []
  );

  useEffect(() => {
    setImg(auth.ItemImg);
  }, [auth.ItemImg]);

  useEffect(() => {
    const fetchCollectionCurrentFields = async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT.COLLECTION_CUSTOM_FIELDS}/${collection_id}`
        );
        if (isSuccessRes(res)) {
          const upicf = updateItemCustomFields(
            prevCustomFields,
            res.data.custom_fields
          );
          setItemCustomFields(upicf);
        }
      } catch (error) {
        console.error("Error fetching", error);
      }
    };

    fetchCollectionCurrentFields();
  }, []);

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
      item_image: img,
      collection_id,
      user_id: auth.id,
      custom_fields: itemCustomFields,
      tags: selectedTags.map((tag) => tag.value).join(" "),
    },
  };

  const editItem = async () => {
    try {
      if (!item_name) {
        toast.warn("please Add Item name");
        return;
      }
      if (!selectedTags.length) {
        toast.warn("please Add some tags");
        return;
      }

      setLoading(true);
      const res = await axiosPrivate.patch(
        `${API_ENDPOINT.ITEM}/${item_id}`,
        data
      );

      if (isSuccessRes(res)) {
        setLoading(false);
        toast.success(MESSAGES.SUCCESS);
        navigate(`${ROUTES.GET_SIGNLE_ITEM}/${res.data.item_id}`);
      }
    } catch (error) {
      setErrorToast(error);
      setLoading(false);
    }
  };

  const handleTagChange = (newValue: TagOption[]) => {
    setSelectedTags(newValue);
  };

  return (
    <section>
      {loading ? (
        <Spinner />
      ) : (
        <div className="hero hero-content">
          <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl dark:bg-meta-4">
            <div className="text-center">
              <img
                className="mx-auto w-48"
                src={
                  item_image
                    ? item_image
                    : "https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                }
                alt="collection image"
              />
              <h4 className="mb-4 mt-1 pb-1 text-xl font-semibold">
                Update {item_name}
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
                  className="input input-bordered dark:bg-form-input"
                />
                <GetAndCreateTag
                  handleTagChange={handleTagChange}
                  selectedTags={selectedTags}
                />
              </div>
              <CustomFieldsForm
                itemCustomFields={itemCustomFields}
                handleCustomInput={handleCustomInput}
              />
              <PhotoUpload usage={ITEM_IMG} />
              <div className="form-control mt-6">
                <button
                  type="submit"
                  onClick={editItem}
                  className="btn btn-primary"
                >
                  {loading ? <SmallSpinner /> : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditItemForm;
