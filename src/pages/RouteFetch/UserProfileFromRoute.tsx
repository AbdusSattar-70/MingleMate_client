import { useLoaderData } from "react-router-dom";
import { Users } from "../../utils/types";
import UserProfile from "../../components/UserProfile";

const UserProfileFromRoute = () => {
  const userData = useLoaderData() as Users;

  return (
    <>
      <UserProfile userData={userData} />
    </>
  );
};

export default UserProfileFromRoute;
