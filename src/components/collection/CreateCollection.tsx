import { ToastContainer } from "react-toastify";
import UploadImage from "./ImageUpload";
import { BiSolidAddToQueue } from "react-icons/bi";
import { useRef, useState } from "react";
import AddCustomFieldModal from "./AddCustomFieldModal";
import { TOPICS } from "../../utils/constant";
import { TopicKey } from "../../utils/types";

const CreateCollectionForm = () => {
  const addCustomFieldRef = useRef();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [field_name, setFieldName] = useState("");
  const [field_type, setFieldType] = useState("");
  const [url, setUrl] = useState("");

  const handleCustomField = () => {
    const ul = document.querySelector("#dynamicUl");
    // Create li element for field name
    const li = document.createElement("li");
    li.innerText = `field-name: ${field_name}- field-type: ${field_type}`;
    li.className = "text-2xl";
    ul.appendChild(li);
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
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered textarea-lg w-full"
              ></textarea>
            </div>

            {/* create  element for custom field dynamically */}
            <ul className="form-control" id="dynamicUl"></ul>

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
              <button type="submit" className="btn btn-primary">
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
