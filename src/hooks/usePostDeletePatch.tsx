/* eslint-disable @typescript-eslint/no-explicit-any */
import isSuccessRes from "../utils/apiResponse";
import { MESSAGES } from "../utils/constant";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";

interface UsePostDeletePatch {
  postDeletePatch: <T>(
    method: "post" | "delete" | "patch",
    endpoint: string,
    data?: any
  ) => Promise<T | undefined>;
}

const usePostDeletePatch: () => UsePostDeletePatch = () => {
  const axiosPrivate = useAxiosPrivate();

  const postDeletePatch: UsePostDeletePatch["postDeletePatch"] = async (
    method,
    endpoint,
    data
  ) => {
    try {
      const res = await axiosPrivate[method](endpoint, data);
      if (isSuccessRes(res)) {
        toast.success(MESSAGES.SUCCESS);
        return res.data;
      }
    } catch (error) {
      toast.error(MESSAGES.TRY_AGAIN);
    }
  };

  return { postDeletePatch };
};

export default usePostDeletePatch;
