import { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { API_ENDPOINT, INITIAL_AUTH_STATE, ROUTES } from "../utils/constant";
import isSuccessRes from "../utils/apiResponse";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
type UserProps = {
  role: number;
  blocked: boolean;
};

const useAuthentication = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = useCallback(async () => {
    const handleTrue = ({ role, blocked }: UserProps) => {
      if (blocked === false) {
        setIsActive(true);
        setAuth((prev) => {
          return {
            ...prev,
            blocked,
          };
        });
      }
      setIsAdmin(role === 2);
      setAuth((prev) => {
        return {
          ...prev,
          role,
        };
      });
    };

    const handleFalse = () => {
      setIsAdmin(false);
      setIsActive(false);
      setAuth(INITIAL_AUTH_STATE);
      navigate(ROUTES.HOME);
    };

    try {
      setIsLoading(true);
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
  }, [axiosPrivate, navigate, setAuth]);

  useEffect(() => {
    if (auth.authToken) {
      checkAuth();
    }
  }, [auth.authToken, axiosPrivate, checkAuth]);

  return {
    isActive,
    isAdmin,
    isLoading,
    checkAuth,
  };
};

export default useAuthentication;
