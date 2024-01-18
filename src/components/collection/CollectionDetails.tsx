import { Link, useLoaderData } from "react-router-dom";
import { CollectionType, ItemType } from "../../utils/types";
import { API_ENDPOINT, ROUTES, dummyImg } from "../../utils/constant";
import ItemsTable from "../items/ItemsTable";
import { canManageAll } from "../../utils/canManageAll";
import { useAuth } from "../../hooks/useAuth";
import useFetchByPage from "../../hooks/useFetchByPage";

const CollectionDetails = () => {
  const collection: CollectionType = useLoaderData() as CollectionType;

  const {
    id: collection_id,
    title,
    image,
    description,
    category,
    items_count,
    user_name,
    author_id,
  } = collection || {};

  const [items, loading, handleSeeMore, setItems, isMoreData] =
    useFetchByPage<ItemType>(
      `${API_ENDPOINT.COLLECTION_ITEMS}/${collection_id}`
    );
  const { auth } = useAuth();

  return (
    <>
      <div className=" flex-1 bg-base-200 dark:bg-meta-4">
        <div className="mx-auto flex max-w-[80rem] flex-col items-center gap-8 p-8 lg:flex-row lg:gap-16 lg:p-16">
          <div className="h-[400px] w-full lg:w-1/2">
            <div className="h-full max-w-full">
              <img
                src={image ? image : dummyImg}
                className="h-full w-full rounded-lg object-cover shadow-2xl"
                alt="Collection Image"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-xl font-bold sm:text-5xl lg:text-6xl">
              {title} by <span>{user_name}</span>
            </h1>
            <p className="py-6">
              {description || "Collection description goes here"}
            </p>
            <p>Items: {items_count}</p>
            <p>Category: {category}</p>
            {canManageAll(auth.id, auth.role, author_id) && (
              <Link
                to={`${ROUTES.CREATE_ITEM}/${collection_id}/create-item`}
                className="btn btn-primary"
              >
                Add new Item
              </Link>
            )}
          </div>
        </div>
      </div>
      {items.length ? (
        <>
          <ItemsTable items={items} setItems={setItems} />
          <div className="mx-auto mb-8 h-20 w-full rounded border border-stroke bg-gray py-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
            <div className="mx-auto flex max-w-[15rem] items-center justify-center gap-4">
              <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl dark:bg-meta-4">
                {isMoreData && (
                  <button onClick={handleSeeMore} className="btn btn-primary">
                    {loading ? (
                      <span className="btn btn-sm text-meta-7">
                        <span className="loading loading-spinner"></span>
                      </span>
                    ) : (
                      "Find More Items"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No Items to Display</div>
      )}
    </>
  );
};

export default CollectionDetails;
