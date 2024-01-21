import { API_ENDPOINT, ROUTES } from "../../utils/constant";
import Spinner from "../common/Spinner";
import CollectionCard from "../collection/CollectionCard";
import { CollectionType } from "../../utils/types";
import useFetchByPage from "../../hooks/useFetchByPage";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UpcaseFirstChar } from "../../utils/UpcaseFirstChar";

const UserAllCollections = () => {
  const { userId } = useParams();
  const [collections, loading, handleSeeMore, setCollections, isMoreData] =
    useFetchByPage<CollectionType>(
      `${API_ENDPOINT.USER_COLLECTIONS}/${userId}`
    );

  const { auth } = useAuth();
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (!auth.authToken) {
      navigate(ROUTES.SIGNIN, { state: { from: location.pathname } });
      return;
    } else {
      navigate(ROUTES.CREATE_COLLECTION);
    }
  };

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
        <>
          <div className="mx-auto mb-4 w-full rounded border border-stroke bg-gray py-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
            <div className="space-y-1 p-8 text-lg font-semibold dark:text-neutral-200">
              <h1 className="text-3xl">
                Welcome{" "}
                <span className="text-meta-5">
                  {UpcaseFirstChar(auth.user_name)}!
                </span>{" "}
                Discover and manage all your fantastic collections here.
              </h1>
              <p className="text-sm text-meta-4 dark:text-whiter">
                You already have {collections.length} Incredible Collections
                waiting for your touch of creativity!
              </p>
              <button onClick={handleNavigate} className="btn btn-primary">
                Create a New Collection
              </button>
            </div>
          </div>

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
                  <CollectionCard
                    key={collection_id}
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
          </section>
          <div className="mx-auto mb-8 h-20 w-full rounded  border border-stroke bg-gray py-4  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
            <div className="mx-auto flex max-w-[15rem] items-center justify-center gap-4">
              <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl dark:bg-meta-4">
                {isMoreData ? (
                  <button onClick={handleSeeMore} className="btn btn-secondary">
                    See More Collection
                  </button>
                ) : (
                  <p className="btn btn-secondary">No More Data</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserAllCollections;
