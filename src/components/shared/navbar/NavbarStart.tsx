import { RiEnglishInput } from "react-icons/ri";
import ActiveLink from "./ActiveLink";
import { CgMenuGridR } from "react-icons/cg";
import bnIcon from "../../../assets/logo/bn.png";
import { navLinkStart } from "./navlink";

const NavbarStart = (): React.ReactNode => {
  return (
    <>
      <div className="navbar-start gap-1 md:gap-4">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
            <CgMenuGridR className="text-2xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {navLinkStart.map(({ path, title }) => (
              <li key={path} className="sm:mx-1 md:mx-3">
                <ActiveLink
                  isRoot={path === "/"}
                  href={path}
                  activeClassName="text-red-500 font-bold"
                >
                  {title}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </div>

        {/* language toggle */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            value="synthwave"
          />
          <RiEnglishInput className="swap-on h-5 w-5 fill-current" />
          <img
            src={bnIcon}
            alt="bangla icon"
            className="swap-off h-5 w-5 fill-current"
          />
        </label>
      </div>
    </>
  );
};

export default NavbarStart;
