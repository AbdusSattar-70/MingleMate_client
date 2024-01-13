import { Link } from "react-router-dom";
import UserAllCollections from "../collection/UserAllCollections";
import { ROUTES } from "../../utils/constant";
import { useAuth } from "../../hooks/useAuth";
import useAuthorization from "../../hooks/useAuthorization";

const MyCollections = () => {
  const { auth } = useAuth();
  const { canManageAll } = useAuthorization();
  return (
    <>
      <div className="navbar bg-base-100">
        {canManageAll() && (
          <div className="navbar-center">
            <Link
              to={ROUTES.CREATE_COLLECTION}
              className="btn btn-outline btn-success"
            >
              Create
            </Link>
          </div>
        )}

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
      <UserAllCollections userId={auth.id} />
    </>
  );
};

export default MyCollections;
