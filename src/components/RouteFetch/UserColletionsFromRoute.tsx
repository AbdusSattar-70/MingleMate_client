import { useNavigate, useParams } from "react-router-dom";
import UserAllCollections from "../MyCorner/UserAllCollections";
import { ROUTES } from "../../utils/constant";
import { useAuth } from "../../hooks/useAuth";

const UserColletionsFromRoute = () => {
  const { auth } = useAuth();
  const { userId } = useParams<string>();
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (!auth.authToken) {
      navigate(ROUTES.SIGNIN, { state: { from: location.pathname } });
      return;
    } else {
      navigate(ROUTES.CREATE_COLLECTION);
    }
  };
  if (!userId) {
    return <p>No user ID found</p>;
  }

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-center">
          <button
            onClick={handleNavigate}
            className="btn btn-outline btn-success"
          >
            Create
          </button>
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
      <UserAllCollections userId={userId} />
    </>
  );
};

export default UserColletionsFromRoute;
