/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { MESSAGE, RES_TYPE } from "./constant";
import { toast } from "react-toastify";

const isSuccessRes = (response: AxiosResponse): boolean => {
  return response.statusText == RES_TYPE.OK;
};

export const setErrorToast = (err: any): void => {
  if (err?.response?.status) {
    toast.warning(err?.response?.data?.message || MESSAGE.TRY_AGAIN);
  } else {
    toast.warn(MESSAGE.TRY_AGAIN);
  }
};

export default isSuccessRes;
