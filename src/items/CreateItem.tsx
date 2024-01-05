import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import { CustomField, TopicKey } from "../utils/types";
import { API_ENDPOINT, MESSAGES, TOPICS } from "../utils/constant";
import { TopicKey } from "../utils/types";

const CreateItem: React.FC = () => {
  const { collection_id } = useParams();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [item_name, setItem_name] = useState<string>("");
  const [tag, setTags] = useState<string>("");
  // const [customFields, setCustomFields] = useState<CustomField[]>([]);

  // const handleCustomField = (e: React.FormEvent<HTMLFormElement>): void => {
  //   e.preventDefault();
  //   setItem_name("");
  // };

  const data = {
    item: {
      item_name,
      collection_id,
      user_id: auth.id,
      tags: tag,
      // custom_fields:customFields,
    },
  };

  const CreateNewCollection = async () => {
    try {
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
              <div className="form-control">
                <label htmlFor="selectTopic"></label>
                <select
                  name="selectTopic"
                  required
                  value={tag}
                  onChange={(e) => setTags(e.target.value)}
                  className="select select-bordered"
                >
                  <option value="" disabled selected>
                    Select or Create new Tags
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

            {/* <AddCustomField
              customFields={customFields}
              handleCustomField={handleCustomField}
            /> */}

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

export default CreateItem;
