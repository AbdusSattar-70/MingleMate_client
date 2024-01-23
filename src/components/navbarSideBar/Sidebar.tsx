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
import { BiSolidAddToQueue } from "react-icons/bi";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const { auth } = useAuth();
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
          <h1 className="mb-4 ml-4 font-light text-bodydark1">
            <span className="text-3xl font-bold text-meta-5">M</span>ingle
            <span className="font-semibold text-meta-1">M</span>
            ate
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
                        Home
                        <BiSolidAddToQueue />
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
                              to={ROUTES.ALL_COLLECTIONS}
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              <SiSmartthings />
                              Collections
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to={ROUTES.GET_ITEMS_ALL}
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              <SiSmartthings />
                              Items
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* <!-- Menu Item Dashboard --> */}
              {auth.role === 2 && (
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
              {auth.authToken ? (
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
                          to={`${ROUTES.USER_PROFILE}`}
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === `${ROUTES.USER_PROFILE}` ||
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
                                to={`${ROUTES.USER_PROFILE}/${auth.id}`}
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
                                to={`${ROUTES.USER_COLLECTIONS}/${auth.id}`}
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
                                to={ROUTES.CREATE_COLLECTION}
                                className={({ isActive }) =>
                                  "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                  (isActive && "!text-white")
                                }
                              >
                                <BsCollectionFill />
                                Create Collection
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to={`${ROUTES.USER_ITEMS}/${auth.id}`}
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
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
