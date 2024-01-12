import { useState } from "react";
import PhotoUpload from "../../components/PhotoUpload";
import { API_ENDPOINT, AVATAR, ROUTES } from "../../utils/constant";
import { useAuth } from "../../hooks/useAuth";
import { formattedTime } from "../../utils/formattedTime";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import isSuccessRes, { setErrorToast } from "../../utils/apiResponse";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa6";
import { FcViewDetails } from "react-icons/fc";
import { GrUpdate } from "react-icons/gr";
import { MdWorkHistory } from "react-icons/md";

const EditProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [user_name, setUserName] = useState(auth.user_name || "");
  const [bio, setBio] = useState(auth.bio || "");
  const [profession, setProfession] = useState(auth.profession || "");
  const userInputData = {
    user: {
      avatar: auth.avatar,
      user_name,
      bio,
      profession,
    },
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosPrivate.patch(
        `${API_ENDPOINT.UPDATE_DELETE_USER}/${auth.id}`,
        userInputData
      );

      if (isSuccessRes(res)) {
        const updated = res.data.data;
        setAuth((prev) => ({
          ...prev,
          ...updated,
        }));
        toast.success("Profile updated Successfully");
        navigate(ROUTES.MY_PROFILE);
      }
    } catch (error) {
      setErrorToast(error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="text-center font-medium text-black dark:text-white">
                  Personal Information
                </h3>
                <PhotoUpload usage={AVATAR} />
              </div>
              <div className="p-7">
                <form>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FaRegUser />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="fullName"
                          id="fullName"
                          value={user_name}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="profession"
                      >
                        Profession
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <MdWorkHistory />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="profession"
                          id="profession"
                          value={profession}
                          onChange={(e) => setProfession(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="updated_at"
                      >
                        Last Updated(readOnly)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <GrUpdate />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="updated_at"
                          id="updated_at"
                          defaultValue={formattedTime(auth?.updated_at)}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="email"
                      >
                        Regisered Email(readOnly)
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="email"
                        id="email"
                        defaultValue={auth.email}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="bio"
                    >
                      BIO
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <FcViewDetails />
                      </span>
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bio"
                        id="bio"
                        rows={6}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Write your bio here"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <Link to={ROUTES.MY_PROFILE} className="btn btn-warning">
                      Cancel
                    </Link>
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary"
                      type="button"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
