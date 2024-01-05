/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { API_ENDPOINT, MESSAGES } from "../utils/constant";
import isSuccessRes from "../utils/apiResponse";

interface UseSignOutResult {
  signOut: () => Promise<void>;
  signOutError: string;
}

const useSignOut = (): UseSignOutResult => {
  const axiosPrivate = useAxiosPrivate();
  const [signOutError, setSignOutError] = useState("");

  const signOut = async () => {
    try {
      const response = await axiosPrivate.delete(API_ENDPOINT.SIGN_OUT);

      if (!isSuccessRes(response)) {
        setSignOutError(MESSAGES.TRY_AGAIN);
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
