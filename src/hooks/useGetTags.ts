import { useState, useEffect } from "react";
import axios from "../utils/api";
import { API_ENDPOINT } from "../utils/constant";
import isSuccessRes from "../utils/apiResponse";

const useGetTags = (): { tags: string[]; loading: boolean } => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_ENDPOINT.TAG);

        if (isSuccessRes(res)) {
          setTags(res.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching tags:", error);
      }
    };

    fetchAllTags();
  }, []);

  return { tags, loading };
};

export default useGetTags;
