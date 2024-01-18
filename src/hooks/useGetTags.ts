import { useState, useEffect } from "react";
import axios from "../utils/api";
import { API_ENDPOINT } from "../utils/constant";
import isSuccessRes from "../utils/apiResponse";

const useGetTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const res = await axios.get(API_ENDPOINT.TAG);

        if (isSuccessRes(res)) {
          setTags(res.data);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchAllTags();
  }, []);

  return tags;
};

export default useGetTags;
