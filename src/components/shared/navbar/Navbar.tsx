import NavbarEnd from "./NavbarEnd";
import NavbarStart from "./NavbarStart";

const Navbar = (): React.ReactNode => {
  return (
    <header>
      <div className="navbar bg-base-100">
        <NavbarStart />
        <div className="navbar-center">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
        </div>
        <NavbarEnd />
      </div>
    </header>
  );
};

export default Navbar;
