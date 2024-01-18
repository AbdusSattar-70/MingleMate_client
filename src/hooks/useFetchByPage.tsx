import { useState, useEffect, SetStateAction, Dispatch } from "react";
import axios from "../utils/api";
import isSuccessRes from "../utils/apiResponse";

type SetData<T> = Dispatch<SetStateAction<T[]>>;

const useFetchByPage = <T,>(
  apiEndpoint: string,
  searchTerm?: string
): [T[], boolean, () => void, SetData<T>, boolean] => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMoreData, setIsMoreData] = useState(true);
  const [page, setPage] = useState(1);
  const perPageCount = 5;

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${apiEndpoint}?search=${searchTerm}&page=${page}&per_page=${perPageCount}`
        );

        if (isSuccessRes(res)) {
          setLoading(false);
          setData((prev) => (page === 1 ? res.data : [...prev, ...res.data]));
          if (!res.data.length) {
            setIsMoreData(false);
          }
        }
      } catch (error) {
        setLoading(false);
        console.error(`Error fetching data from ${apiEndpoint}:`, error);
      }
    };

    fetchData();
  }, [apiEndpoint, page, perPageCount, searchTerm]);

  return [data, loading, handleSeeMore, setData, isMoreData];
};

export default useFetchByPage;
