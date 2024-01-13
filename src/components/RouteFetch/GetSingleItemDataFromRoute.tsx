import { useLoaderData } from "react-router-dom";
import { ItemType } from "../../utils/types";
import DisplaySingleItem from "../items/DisplaySingleItem";

const GetSingleItemDataFromRoute = () => {
  const itemData: ItemType = useLoaderData() as ItemType;

  return (
    <>
      <DisplaySingleItem itemData={itemData} />
    </>
  );
};

export default GetSingleItemDataFromRoute;
