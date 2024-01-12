import { Link, useLoaderData } from "react-router-dom";
import { CollectionType } from "../../utils/types";
import { useEffect, useState } from "react";
import { fetchItems } from "../../utils/fetchItems";
import { ROUTES, dummyImg } from "../../utils/constant";
import ItemsTable from "../items/ItemsTable";

const GetSingleCollection = () => {
  const collection: CollectionType = useLoaderData() as CollectionType;

  const {
    id: collection_id,
    title,
    image,
    description,
    category,
    items_count,
  } = collection;

  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItems(collection_id);
      setItems(data);
    };

    loadItems();
  }, [collection_id]);

  return (
    <>
      <div className=" flex-1 bg-base-200">
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
              {title}
            </h1>
            <p className="py-6">
              {description || "Collection description goes here"}
            </p>
            <p>Items: {items_count}</p>
            <p>Category: {category}</p>
            <Link
              to={`${ROUTES.CREATE_ITEM}/${collection_id}/create-item`}
              className="btn btn-primary"
            >
              Add Item
            </Link>
          </div>
        </div>
      </div>
      {items.length ? (
        <ItemsTable items={items} />
      ) : (
        <div>No Items to Display</div>
      )}
    </>
  );
};

export default GetSingleCollection;
