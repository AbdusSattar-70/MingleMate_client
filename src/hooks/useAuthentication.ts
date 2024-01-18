import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { API_ENDPOINT, INITIAL_AUTH_STATE } from "../utils/constant";
import isSuccessRes from "../utils/apiResponse";
import { useAuth } from "./useAuth";
type UserProps = {
  role: number;
  blocked: boolean;
};

const useAuthentication = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleTrue = ({ role, blocked }: UserProps) => {
      if (blocked === false) {
        setIsActive(true);
      }
      setIsAdmin(role === 2 && blocked === false);
    };

    const handleFalse = () => {
      setIsAdmin(false);
      setIsActive(false);
      setAuth(INITIAL_AUTH_STATE);
    };

    const checkAuth = async () => {
      setIsLoading(true);

      try {
        const response = await axiosPrivate.get(API_ENDPOINT.CURRENT_USER);

        if (!isSuccessRes(response)) {
          handleFalse();
        } else if (response.status !== 401) {
          handleTrue(response.data);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        handleFalse();
      } finally {
        setIsLoading(false);
      }
    };

    if (auth.authToken) {
      checkAuth();
    }
  }, [auth.authToken, setAuth, axiosPrivate]);

  return { isActive, isAdmin, isLoading };
};

export default useAuthentication;
