import { useLoaderData } from "react-router-dom";
import { ItemType } from "../../../utils/types";
import ItemDetails from "./ItemDetails";

const ItemDetailsNavigation = () => {
  const itemData: ItemType = useLoaderData() as ItemType;

  return (
    <>
      <ItemDetails itemData={itemData} />
    </>
  );
};

export default ItemDetailsNavigation;
