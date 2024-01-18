import { API_ENDPOINT, MESSAGES } from "../../../utils/constant";
import isSuccessRes, { setErrorToast } from "../../../utils/apiResponse";
import { CollectionType } from "../../../utils/types";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import useFetchByPage from "../../../hooks/useFetchByPage";
import { useEffect, useState } from "react";
import Table from "./Table";
import TopPart from "./TopPart";
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
        handleDeleteCollection={handleDeleteCollection}
      />
      <div className="mx-auto mb-8 h-20 w-full rounded  border border-stroke bg-gray py-4  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
        <div className="mx-auto flex max-w-[15rem] items-center justify-center gap-4">
          <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl dark:bg-meta-4">
            {isMoreData && (
              <button onClick={handleSeeMore} className="btn btn-primary">
                {loading ? (
                  <span className="btn btn-sm text-meta-7">
                    <span className="loading loading-spinner"></span>
                  </span>
                ) : (
                  "Find More Collections"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionsTable;
