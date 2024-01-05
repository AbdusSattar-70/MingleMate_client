import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { API_ENDPOINT } from "../utils/constant";
import isSuccessRes from "../utils/apiResponse";
import { useAuth } from "./useAuth";
import { AuthData } from "../utils/types";

/*
This hook is designed to ensure the integrity of sessionStorage data
and provides information about the user's authentication status,
admin privileges, and active state throughout the application.
It verifies the stored authentication data against the server response,
 updating state variables accordingly. In case of a mismatch or error,
it clears auth provider Data to prevent the use of potentially tampered data. */

const useAuthentication = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleTrue = ({ role, blocked }: AuthData) => {
      if (blocked === false) {
        setIsActive(true);
      }

      setIsAdmin(role === 2 && blocked == false);
    };

    const handleFalse = () => {
      setIsAdmin(false);
      setIsActive(false);
      setAuth({});
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
  }, [axiosPrivate, setAuth, auth]);

  return { isActive, isAdmin, isLoading };
};

export default useAuthentication;
