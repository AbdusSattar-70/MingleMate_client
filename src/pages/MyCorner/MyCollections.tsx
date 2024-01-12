import { Link } from "react-router-dom";
import GetMyAllCollections from "./GetMyAllCollections";
import { ROUTES } from "../../utils/constant";

const MyCollections = () => {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-center">
          <Link
            to={ROUTES.CREATE_COLLECTION}
            className="btn btn-outline btn-success"
          >
            Create
          </Link>
        </div>
        <div className="navbar-end">
          <select
            name="Filter users"
            className="select select-bordered  w-full"
            // onChange={(e) => filterUserData(e.target.value)}
          >
            <option disabled value="">
              Filter Collections
            </option>
            {/* <option value={FILTER_BY_USER.ADMIN}>Filter all admin users</option>
            <option value={FILTER_BY_USER.BLOCKED}>
              Filter all blocked users
            </option>
            <option value={FILTER_BY_USER.GENERAL}>
              Filter all general users
            </option>
            <option value={FILTER_BY_USER.ACTIVE}>
              Filter all active users
            </option> */}
          </select>
        </div>
      </div>
      <GetMyAllCollections />
    </div>
  );
};

export default MyCollections;
