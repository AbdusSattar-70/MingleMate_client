import { Link, useLoaderData } from "react-router-dom";
import { CollectionType } from "../../utils/types";
import { useEffect, useState } from "react";
import CollectionTable from "./CollectionTable";
import { fetchItems } from "../../utils/fetchItems";
import { dummyImg } from "../../utils/constant";

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
              {description}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <p>Items: {items_count}</p>
            <p>Category: {category}</p>
            <Link
              to={`/collection/${collection_id}/add-item`}
              className="btn btn-primary"
            >
              Add Item
            </Link>
          </div>
        </div>
      </div>
      {items.length ? <CollectionTable items={items} /> : null}
    </>
  );
};

export default GetSingleCollection;
