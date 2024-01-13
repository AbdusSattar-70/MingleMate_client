/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthentication from "../../hooks/useAuthentication";
import useSignOut from "../../hooks/useSignOut";
import { useAuth } from "../../hooks/useAuth";
import dummyAvatar from "../../images/avatar.jpg";
import { FaUserPen } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { INITIAL_AUTH_STATE, ROUTES } from "../../utils/constant";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const navigate = useNavigate();
  const { isActive } = useAuthentication();
  const { signOut, signOutError } = useSignOut();
  const { setAuth, auth } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    if (signOutError) {
      toast.warning(signOutError);
    } else {
      setAuth(INITIAL_AUTH_STATE);
      navigate(ROUTES.SIGNIN);
    }
  };
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  return (
    <>
      {isActive && auth.authToken ? (
        <div className="relative">
          <Link
            ref={trigger}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-4"
            to="#"
          >
            <span className="hidden text-right lg:block">
              <span className="block text-sm font-medium text-black dark:text-white">
                {auth.user_name?.split(" ")[0]}
              </span>
              <span className="block text-xs">
                {auth?.profession || "UX Designer"}
              </span>
            </span>

            <span className="h-12 w-12 rounded-full">
              <div className="avatar online">
                <div className=" rounded-full">
                  <img src={auth.avatar || dummyAvatar} alt="User" />
                </div>
              </div>
            </span>

            <svg
              className={`hidden fill-current sm:block ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                fill=""
              />
            </svg>
          </Link>

          {/* <!-- Dropdown Start --> */}
          <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
            className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
              dropdownOpen === true ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
              <li>
                <Link
                  to={ROUTES.MY_PROFILE}
                  className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  <FaUserPen />
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.PROFILE_EDIT}
                  className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  <IoSettingsOutline />
                  Update Profile
                </Link>
              </li>
            </ul>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <LuLogOut /> Log Out
            </button>
          </div>
        </div>
      ) : (
        <Link
          to={ROUTES.SIGNIN}
          className="btn btn-circle bg-meta-4 text-white hover:text-meta-5"
        >
          Sign In
        </Link>
      )}
    </>
  );
};

export default DropdownUser;
