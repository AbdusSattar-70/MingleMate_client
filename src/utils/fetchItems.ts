import { toast } from "react-toastify";
import { API_ENDPOINT, MESSAGES } from "./constant";
import isSuccessRes from "./apiResponse";
import axios from "./api";

export const fetchItems = async (id: string) => {
  const res = await axios.get(`${API_ENDPOINT.COLLECTION_ITEMS}/${id}`);
  if (isSuccessRes(res)) {
    return res?.data;
  }
  toast.warn(MESSAGES.TRY_AGAIN);
};
