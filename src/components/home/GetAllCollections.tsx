import Spinner from "../common/Spinner";
import axios from "../../utils/api";
import { API_ENDPOINT } from "../../utils/constant";
import RenderCollections from "../collection/RenderCollections";
import isSuccessRes from "../../utils/apiResponse";
import { useEffect, useState } from "react";
import keyId from "../../utils/keyId";
import { CollectionType } from "../../utils/types";
const GetAllCollections = () => {
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPageCount = 5;

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT.COLLECTION}?page=${page}&per_page=${perPageCount}`
        );

        if (isSuccessRes(response)) {
          setLoading(false);
          setCollections((prevCollections) =>
            page === 1 ? response.data : [...prevCollections, ...response.data]
          );
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchCollections();
  }, [page]);

  const updateDeletedCollection = (collectionId: string) => {
    const updated = collections.filter(
      (collection) => collection.id !== collectionId
    );
    setCollections(updated);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
          {collections.length ? (
            collections.map(
              ({
                id: collection_id,
                user_name,
                author_id,
                title,
                image,
                items_count,
                category,
              }) => (
                <RenderCollections
                  updateDeletedCollection={updateDeletedCollection}
                  key={keyId() + collection_id}
                  collection_id={collection_id}
                  user_name={user_name}
                  author_id={author_id}
                  title={title}
                  image={image}
                  items_count={items_count}
                  category={category}
                />
              )
            )
          ) : (
            <div className="text-center">No collection to Display</div>
          )}
        </section>
      )}

      <div className="mx-auto mb-8 h-20 w-full rounded  border border-stroke bg-gray py-4  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
        <div className="mx-auto flex max-w-[15rem] items-center justify-center gap-4">
          <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl dark:bg-meta-4">
            <button onClick={handleSeeMore} className="btn btn-secondary">
              See More Collection
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetAllCollections;
