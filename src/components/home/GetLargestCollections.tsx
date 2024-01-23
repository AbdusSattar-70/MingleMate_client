/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_ENDPOINT } from "../../utils/constant";
import Spinner from "../common/Spinner";
import CollectionCard from "../collection/CollectionCard";
import { CollectionType } from "../../utils/types";
import useFetchByPage from "../../hooks/useFetchByPage";
const GetLargestCollections = () => {
  const [collections, loading, _, setCollections] =
    useFetchByPage<CollectionType>(API_ENDPOINT.TOP_FIVE_COLLECTIONS);

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
              (
                {
                  id: collection_id,
                  user_name,
                  author_id,
                  title,
                  image,
                  items_count,
                  category,
                },
                index
              ) => (
                <div
                  key={collection_id + author_id}
                  className={`${
                    index === 0 ? "sm:col-span-2" : "sm:col-span-1"
                  } lg:col-span-1`}
                >
                  <CollectionCard
                    updateDeletedCollection={updateDeletedCollection}
                    collection_id={collection_id}
                    user_name={user_name}
                    author_id={author_id}
                    title={title}
                    image={image}
                    items_count={items_count}
                    category={category}
                  />
                </div>
              )
            )
          ) : (
            <div className="text-center">No collection to Display</div>
          )}
        </section>
      )}
    </>
  );
};

export default GetLargestCollections;
