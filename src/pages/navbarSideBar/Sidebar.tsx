/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaArrowLeftLong, FaUserPen, FaRegUser } from "react-icons/fa6";
import { FaHome, FaSignInAlt } from "react-icons/fa";
import { LuUserSquare } from "react-icons/lu";
import { MdDashboard, MdAddHomeWork } from "react-icons/md";
import { SiSmartthings } from "react-icons/si";
import { BsCollectionFill } from "react-icons/bs";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { ROUTES } from "../../utils/constant";
import { useAuth } from "../../hooks/useAuth";
import useAuthentication from "../../hooks/useAuthentication";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const { auth } = useAuth();
  const { isAdmin, isActive } = useAuthentication();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to={ROUTES.HOME}>
          <h1 className="text-2xl font-semibold text-neutral-300">
            MingleMate
          </h1>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <FaArrowLeftLong className="text-2xl text-whiter" />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Home --> */}
              <SidebarLinkGroup
                activeCondition={pathname === "/" || pathname.includes("home")}
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <NavLink
                        to={ROUTES.HOME}
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === `${ROUTES.HOME}` ||
                            pathname.includes("home")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <MdAddHomeWork />
                        Home && Items
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to={ROUTES.HOME}
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              <FaHome />
                              Home
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={ROUTES.DISPLAY_ALL_ITEMS}
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              <SiSmartthings />
                              All Items
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* <!-- Menu Item Dashboard --> */}
              {isActive && isAdmin && (
                <li>
                  <NavLink
                    to={ROUTES.ADMIN_DASHBOARD}
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("admin-dashboard") &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <MdDashboard />
                    Dashboard
                  </NavLink>
                </li>
              )}

              {/* <!-- Menu Item Profile --> */}
              {isActive && auth.authToken ? (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/my-profile" ||
                    pathname.includes("profile/edit")
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <>
                        <NavLink
                          to={ROUTES.MY_PROFILE}
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === `${ROUTES.MY_PROFILE}` ||
                              pathname.includes("my-profile")) &&
                            "bg-graydark dark:bg-meta-4"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <FaRegUser />
                          My Corner
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && "rotate-180"
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && "hidden"
                          }`}
                        >
                          <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to={ROUTES.MY_PROFILE}
                                className={({ isActive }) =>
                                  "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                  (isActive && "!text-white")
                                }
                              >
                                <LuUserSquare />
                                My Profile
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={ROUTES.PROFILE_EDIT}
                                className={({ isActive }) =>
                                  "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                  (isActive && "!text-white")
                                }
                              >
                                <FaUserPen />
                                Profile Edit
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={ROUTES.MY_ALL_COLLECTIONS}
                                className={({ isActive }) =>
                                  "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                  (isActive && "!text-white")
                                }
                              >
                                <BsCollectionFill />
                                My Collections
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={ROUTES.MY_ITEMS_ALL}
                                className={({ isActive }) =>
                                  "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                  (isActive && "!text-white")
                                }
                              >
                                <SiSmartthings />
                                My Items
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  }}
                </SidebarLinkGroup>
              ) : (
                <li>
                  <NavLink
                    to={ROUTES.SIGNIN}
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes("sign-in") &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                  >
                    <FaSignInAlt />
                    Sign In
                  </NavLink>
                </li>
              )}

              {/* <li>
                <NavLink
                  to={ROUTES.CREATE_ITEM}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("tables") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9756)">
                      <path
                        d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9756">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0 0.052124)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Add Item
                </NavLink>
              </li> */}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
