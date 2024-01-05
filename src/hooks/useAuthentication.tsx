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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleTrue = ({ id, role, blocked }: AuthData) => {
      const JustifiedSessionstoredData =
        auth.id === id && auth.role === role && auth.blocked === blocked;
      if (JustifiedSessionstoredData && blocked === false) {
        setIsActive(true);
      }

      setIsAuthenticated(JustifiedSessionstoredData);
      setIsAdmin(JustifiedSessionstoredData && role === 2);
    };

    const handleFalse = () => {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setIsActive(false);
      setAuth({});
    };

    const checkAuth = async () => {
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
      }
    };

    if (auth.authToken) {
      checkAuth();
    }
  }, [auth, setAuth, axiosPrivate]);

  return [isAuthenticated, isActive, isAdmin];
};

export default useAuthentication;
