import { toast } from "react-toastify";
import { MESSAGES } from "../utils/constant";

// Helper function to fetch data from router
export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      toast.warn(`${MESSAGES.SERVER_OFFLINE} or ${MESSAGES.TRY_AGAIN}`);
    }

    return await response.json();
  } catch (error) {
    toast.warn(`${MESSAGES.SERVER_OFFLINE} or ${MESSAGES.TRY_AGAIN}`);
  }
};
