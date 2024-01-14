/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { MESSAGES } from "./constant";
import { toast } from "react-toastify";
const isSuccessRes = (response: AxiosResponse): boolean => {
  return (
    (response.status >= 200 && response.status < 300) ||
    (response.status === 201 && response.statusText === "Created")
  );
};

export const setErrorToast = (err: any): void => {
  if (err?.response?.status) {
    toast.warning(err?.response?.data?.message || MESSAGES.TRY_AGAIN);
  } else {
    toast.warn(MESSAGES.SERVER_OFFLINE);
  }
};

export default isSuccessRes;
