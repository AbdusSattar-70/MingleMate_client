import DisplaySingleItem from "../items/DisplaySingleItem";
import { ItemType } from "../../utils/types";
import { useLoaderData } from "react-router-dom";
const GetUserItemsAllFromRoute = () => {
  const items: ItemType[] = useLoaderData() as ItemType[];

  return (
    <>
      {items.length > 0 ? (
        items.map((itemData) => (
          <section
            key={itemData.item_id}
            className="mb-10 bg-white shadow-xl drop-shadow-xl"
          >
            <DisplaySingleItem itemData={itemData} />
          </section>
        ))
      ) : (
        <div>No Item Data found</div>
      )}
    </>
  );
};

export default GetUserItemsAllFromRoute;
