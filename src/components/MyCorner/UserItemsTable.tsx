import { ItemType } from "../../utils/types";
import { API_ENDPOINT } from "../../utils/constant";
import ItemsTable from "../items/ItemsTable";
import useFetchByPage from "../../hooks/useFetchByPage";
import { useParams } from "react-router-dom";
import Spinner from "../common/Spinner";
import SeeMoreButton from "../common/SeeMoreButton";
const UserItemsTable = () => {
  const { user_id } = useParams();
  const [items, loading, handleSeeMore, setItems, isMoreData] =
    useFetchByPage<ItemType>(`${API_ENDPOINT.USER_ITEMS}/${user_id}`);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section>
          <ItemsTable items={items} setItems={setItems} />
          <SeeMoreButton
            isMoreData={isMoreData}
            loading={loading}
            handleSeeMore={handleSeeMore}
          />
        </section>
      )}
    </>
  );
};

export default UserItemsTable;
