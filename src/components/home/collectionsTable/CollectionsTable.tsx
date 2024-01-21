import { API_ENDPOINT, MESSAGES } from "../../../utils/constant";
import isSuccessRes, { setErrorToast } from "../../../utils/apiResponse";
import { CollectionType } from "../../../utils/types";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import useFetchByPage from "../../../hooks/useFetchByPage";
import { useEffect, useState } from "react";
import Table from "./Table";
import TopPart from "./TopPart";
import SeeMoreButton from "../../common/SeeMoreButton";

const CollectionsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const [collections, loading, handleSeeMore, setCollections, isMoreData] =
    useFetchByPage<CollectionType>(API_ENDPOINT.COLLECTION, searchTerm);

  const handleRefresh = () => {
    setSearchTerm("");
    setCollections([]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setSearchCount(collections.length);
  }, [collections]);

  const updateDeletedCollection = (collectionId: string) => {
    const updated = collections.filter(
      (collection) => collection.id !== collectionId
    );
    setCollections(updated);
  };

  const handleDeleteCollection = async (id: string) => {
    try {
      const response = await axiosPrivate.delete(
        `${API_ENDPOINT.COLLECTION}/${id}`
      );

      if (isSuccessRes(response)) {
        toast.success(MESSAGES.SUCCESS);
        updateDeletedCollection(response.data.item_id);
      } else {
        toast.warn(MESSAGES.TRY_AGAIN);
      }
    } catch (error) {
      setErrorToast(error);
    }
  };

  return (
    <>
      <TopPart
        handleRefresh={handleRefresh}
        handleSearch={handleSearch}
        searchCount={searchCount}
        searchTerm={searchTerm}
      />
      <Table
        collections={collections}
        loading={loading}
        handleDeleteCollection={handleDeleteCollection}
      />
      <SeeMoreButton
        isMoreData={isMoreData}
        loading={loading}
        handleSeeMore={handleSeeMore}
      />
    </>
  );
};

export default CollectionsTable;
