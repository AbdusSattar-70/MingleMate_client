import { Link, useLoaderData } from "react-router-dom";
import { CollectionType, ItemType } from "../../utils/types";
import { API_ENDPOINT, ROUTES, dummyImg } from "../../utils/constant";
import ItemsTable from "../items/ItemsTable";
import { canManageAll } from "../../utils/canManageAll";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import isSuccessRes from "../../utils/apiResponse";
import axios from "../../utils/api";
import ItemsTableTop from "../items/ItemsTableTop";

const CollectionDetails = () => {
  const { auth } = useAuth();
  const [userChoice, setUserChoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ItemType[]>([]);
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

  useEffect(() => {
    const fetchItemsSortBy = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_ENDPOINT.COLLECTION_ITEMS}/${collection_id}?sort_by=${userChoice}`
        );
        if (isSuccessRes(res)) {
          setLoading(false);
          setItems(res.data);
        }
      } catch (error) {
        setLoading(false);
        console.error(`Error fetching data from`, error);
      }
    };

    fetchItemsSortBy();
  }, [userChoice, collection_id, setItems]);

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
          <ItemsTableTop
            loading={loading}
            userChoice={userChoice}
            setUserChoice={setUserChoice}
          />
          <ItemsTable items={items} setItems={setItems} />
        </>
      ) : (
        <div>No Items to Display</div>
      )}
    </>
  );
};

export default CollectionDetails;
