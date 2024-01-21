import { API_ENDPOINT } from "../../utils/constant";
import { ItemType } from "../../utils/types";
import ItemsTable from "./ItemsTable";
import useFetchByPage from "../../hooks/useFetchByPage";
import SeeMoreButton from "../common/SeeMoreButton";
const AllItemsTable = () => {
  const [items, loading, handleSeeMore, setItems, isMoreData] =
    useFetchByPage<ItemType>(API_ENDPOINT.ITEM);

  return (
    <section>
      <ItemsTable items={items} setItems={setItems} />
      <SeeMoreButton
        isMoreData={isMoreData}
        loading={loading}
        handleSeeMore={handleSeeMore}
      />
    </section>
  );
};

export default AllItemsTable;
