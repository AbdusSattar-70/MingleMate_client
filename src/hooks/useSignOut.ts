/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { API_ENDPOINT } from "../utils/constant";
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
        setSignOutError("Sign out failed,Please try again");
      } else {
        setSignOutError("");
      }
    } catch (error: any) {
      setSignOutError("Sign out failed,Please try again");
    }
  };

  return { signOut, signOutError };
};

export default useSignOut;
