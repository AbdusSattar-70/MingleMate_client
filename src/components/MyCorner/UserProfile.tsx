import { Link, useLoaderData, useNavigate } from "react-router-dom";
import CoverOne from "../../images/cover/cover-01.webp";
import dummyAvatar from "../../images/avatar.jpg";
import { MdSwitchAccount } from "react-icons/md";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaAngellist,
  FaRegEnvelope,
} from "react-icons/fa";
import { Users } from "../../utils/types";
import { UpcaseFirstChar } from "../../utils/UpcaseFirstChar";
import { calculateTimeElapsed } from "../../utils/formattedTime";
import { Tooltip } from "../common/ToolTip";
import {
  API_ENDPOINT,
  INITIAL_AUTH_STATE,
  MESSAGES,
  ROUTES,
} from "../../utils/constant";
import { useAuth } from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import isSuccessRes from "../../utils/apiResponse";

const UserProfile = () => {
  const userData = useLoaderData() as Users;

  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {
    id: user_id,
    avatar,
    user_name,
    email,
    role,
    profession,
    items_count,
    collections_count,
    created_at,
    updated_at,
    bio,
  } = userData;

  const handleDeleteMyself = async () => {
    try {
      const confirmResult = window.confirm(MESSAGES.DELETE_MYSELF.CONFIRM);
      if (confirmResult) {
        const response = await axiosPrivate.delete(
          API_ENDPOINT.ADMIN.DELETE_URL,
          {
            data: { user_emails: email },
          }
        );
        if (isSuccessRes(response)) {
          navigate(ROUTES.HOME);
          setAuth(INITIAL_AUTH_STATE);
          toast.success(MESSAGES.DELETE_MYSELF.SUCCESS);
        }
      }
    } catch (error) {
      toast.error(MESSAGES.DELETE_MYSELF.ERROR);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
          {auth?.id === user_id && (
            <div>
              <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
                <Link
                  to={ROUTES.PROFILE_EDIT}
                  className="btn btn-primary btn-xs"
                >
                  Edit
                </Link>
              </div>
              <div className="absolute bottom-1 left-1 z-10 xsm:bottom-4 xsm:left-2">
                <div
                  role="button"
                  onClick={handleDeleteMyself}
                  className="btn btn-error btn-xs"
                >
                  Delete
                  <MdSwitchAccount className="3x" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <div className={`avatar ${auth.authToken && "online"}`}>
                <div className=" rounded-full">
                  <img src={avatar || dummyAvatar} alt="profile" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {UpcaseFirstChar(user_name)}{" "}
              <span className="text-xl text-meta-5">
                {role === 2 ? "(Admin user)" : "(Regular user)"}
              </span>
            </h3>
            <p className="font-medium">{profession || "Profession"}</p>
            <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark">
                <div className="text-xs text-black dark:text-white">
                  <span>Profile </span>
                  <span>{calculateTimeElapsed(created_at, updated_at)}</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark">
                <span className="font-semibold text-black dark:text-white">
                  {collections_count}
                </span>
                {collections_count !== 0 ? (
                  <Tooltip html={<p>Click to explore all Collections!</p>}>
                    <Link
                      to={`${ROUTES.USER_COLLECTIONS}/${user_id}`}
                      className="link link-success text-sm"
                    >
                      Collections
                    </Link>
                  </Tooltip>
                ) : (
                  <span className="text-sm">Collection</span>
                )}
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4">
                <span className="font-semibold text-black dark:text-white">
                  {items_count}
                </span>
                {items_count !== 0 ? (
                  <Tooltip html={<p>Click to explore all items!</p>}>
                    <Link
                      to={`${ROUTES.USER_ITEMS}/${user_id}`}
                      className="link link-success text-sm"
                    >
                      Items
                    </Link>
                  </Tooltip>
                ) : (
                  <span className="text-sm">Item</span>
                )}
              </div>
            </div>

            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                About Me
              </h4>
              <p className="mt-4.5">
                {bio ||
                  " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus ultricies. Sed vel aliquet libero. Nunc a augue fermentum, pharetra ligula sed, aliquam lacus."}
              </p>
            </div>

            <Tooltip
              html={
                <p>
                  This part is under construction, The links aren't workable
                  yet.
                </p>
              }
            >
              <div className="mt-6.5">
                <h4 className="mb-3.5 font-medium text-black dark:text-white">
                  Follow me on
                </h4>
                <div className="flex items-center justify-center gap-3.5">
                  <FaFacebookF />
                  <FaLinkedinIn />
                  <FaGithub />
                  <FaAngellist />
                  <FaRegEnvelope />
                </div>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
