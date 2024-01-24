import {
  API_ENDPOINT,
  DELETE_CONFIRMATION,
  MESSAGES,
} from "../../../utils/constant";
import isSuccessRes, { setErrorToast } from "../../../utils/apiResponse";
import { CollectionType } from "../../../utils/types";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Table from "./Table";
import TopPart from "./TopPart";
import SeeMoreButton from "../../common/SeeMoreButton";
import axios from "../../../utils/api";

const CollectionsTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMoreData, setIsMoreData] = useState(true);
  const [page, setPage] = useState(1);
  const searchUri = `${API_ENDPOINT.COLLECTION}?search=${searchTerm}`;
  const paginateUri = `${API_ENDPOINT.COLLECTION}?page=${page}&per_page=5`;

  useEffect(() => {
    const fetchAllCollections = async () => {
      setLoading(true);
      try {
        if (searchTerm) {
          const res = await axios.get(searchUri);
          if (isSuccessRes(res)) {
            setLoading(false);
            setCollections(res.data);
            setIsMoreData(false);
          }
        } else {
          const res = await axios.get(paginateUri);
          if (isSuccessRes(res)) {
            setLoading(false);
            setCollections((prev) =>
              page === 1 ? res.data : [...prev, ...res.data]
            );
            !res.data.length && setIsMoreData(false);
          }
        }
      } catch (error) {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchAllCollections();
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [page, searchTerm, paginateUri, searchUri]);

  const updateDeletedCollection = (collectionId: string) => {
    const updated = collections.filter(
      (collection) => collection.id !== collectionId
    );
    setCollections(updated);
  };

  const handleDeleteCollection = async (id: string) => {
    const confirmResult = window.confirm(DELETE_CONFIRMATION);
    try {
      if (confirmResult) {
        const response = await axiosPrivate.delete(
          `${API_ENDPOINT.COLLECTION}/${id}`
        );

        if (isSuccessRes(response)) {
          toast.success(MESSAGES.SUCCESS);
          updateDeletedCollection(id);
        } else {
          toast.warn(MESSAGES.TRY_AGAIN);
        }
      }
    } catch (error) {
      setErrorToast(error);
    }
  };

  return (
    <>
      <TopPart
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        collections={collections}
      />
      <Table
        collections={collections}
        loading={loading}
        handleDeleteCollection={handleDeleteCollection}
      />
      <SeeMoreButton
        isMoreData={isMoreData}
        loading={loading}
        handleSeeMore={() => setPage((prevPage) => prevPage + 1)}
      />
    </>
  );
};

export default CollectionsTable;
