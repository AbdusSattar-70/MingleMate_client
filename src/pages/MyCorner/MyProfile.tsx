import UserProfile from "../../components/UserProfile";
import { useAuth } from "../../hooks/useAuth";

const MyProfile = () => {
  const { auth } = useAuth();

  return (
    <>
      <UserProfile userData={{ ...auth }} />
    </>
  );
};

export default MyProfile;
