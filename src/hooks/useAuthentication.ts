import { useEffect, useState, useCallback } from "react";
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

  const handleTrue = useCallback(({ role, blocked }: UserProps) => {
    if (blocked === false) {
      setIsActive(true);
    }
    setIsAdmin(role === 2 && blocked === false);
  }, []);

  const handleFalse = useCallback(() => {
    setIsAdmin(false);
    setIsActive(false);
    setAuth(INITIAL_AUTH_STATE);
  }, [setAuth]);

  const checkAuth = useCallback(async () => {
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
  }, [axiosPrivate, handleFalse, handleTrue]);

  useEffect(() => {
    if (auth.authToken) {
      checkAuth();
    }
  }, [auth.authToken, checkAuth]);

  return { isActive, isAdmin, isLoading };
};

export default useAuthentication;
