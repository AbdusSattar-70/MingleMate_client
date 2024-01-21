/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import {
  API_ENDPOINT,
  INITIAL_AUTH_STATE,
  MESSAGES,
  ROUTES,
} from "../utils/constant";
import isSuccessRes from "../utils/apiResponse";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

interface UseSignOutResult {
  signOut: () => Promise<void>;
  signOutError: string;
}

const useSignOut = (): UseSignOutResult => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [signOutError, setSignOutError] = useState("");
  const navigate = useNavigate();
  const signOut = async () => {
    try {
      const response = await axiosPrivate.delete(API_ENDPOINT.SIGN_OUT);

      if (isSuccessRes(response)) {
        setAuth(INITIAL_AUTH_STATE);
        navigate(ROUTES.HOME);
      } else {
        setSignOutError("");
      }
    } catch (error: any) {
      setSignOutError(MESSAGES.TRY_AGAIN);
    }
  };

  return { signOut, signOutError };
};

export default useSignOut;
