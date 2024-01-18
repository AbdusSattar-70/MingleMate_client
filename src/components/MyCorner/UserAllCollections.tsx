import { API_ENDPOINT } from "../../utils/constant";
import Spinner from "../common/Spinner";
import RenderCollection from "../collection/RenderCollection";
import keyId from "../../utils/keyId";
import { CollectionType } from "../../utils/types";
import useFetchByPage from "../../hooks/useFetchByPage";

const UserAllCollections = ({ userId }: { userId: string }) => {
  const [collections, loading, handleSeeMore, setCollections] =
    useFetchByPage<CollectionType>(
      `${API_ENDPOINT.USER_COLLECTIONS}/${userId}`
    );

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
                <RenderCollection
                  key={keyId()}
                  collection_id={collection_id}
                  user_name={user_name}
                  author_id={author_id}
                  title={title}
                  image={image}
                  items_count={items_count}
                  category={category}
                  updateDeletedCollection={updateDeletedCollection}
                />
              )
            )
          ) : (
            <div className="text-center">No collection to Display</div>
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
        </section>
      )}
    </>
  );
};

export default UserAllCollections;
