import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { API_ENDPOINT, INITIAL_AUTH_STATE, ROUTES } from "../utils/constant";
import isSuccessRes from "../utils/apiResponse";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import useSignOut from "./useSignOut";
type UserProps = {
  role: number;
  blocked: boolean;
};

const useAuthentication = () => {
  const navigate = useNavigate();
  const { signOut } = useSignOut();
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);

  const handleTrue = ({ role, blocked }: UserProps) => {
    setAuth((prev) => {
      return {
        ...prev,
        role,
        blocked,
      };
    });
  };

  const handleFalse = () => {
    setAuth(INITIAL_AUTH_STATE);
    navigate(ROUTES.HOME);
  };

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(API_ENDPOINT.CURRENT_USER);

      if (!isSuccessRes(response)) {
        handleFalse();
        return;
      } else if (response.status !== 401) {
        handleTrue(response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      handleFalse();
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAdminStatus = async () => {
    const data = await checkAuth();
    if (data.role === 1 || data.blocked === true) {
      await signOut();
      navigate(ROUTES.HOME);
    }
  };

  return {
    isLoading,
    verifyAdminStatus,
  };
};

export default useAuthentication;
