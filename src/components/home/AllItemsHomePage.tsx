import { API_ENDPOINT } from "../../utils/constant";
import { ItemType } from "../../utils/types";
import ItemDetails from "../items/itemDetails/ItemDetails";
import useFetchByPage from "../../hooks/useFetchByPage";
import Spinner from "../common/Spinner";
import SeeMoreButton from "../common/SeeMoreButton";
const AllItemsHomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items, loading, handleSeeMore, _, isMoreData] =
    useFetchByPage<ItemType>(API_ENDPOINT.ITEM);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.item_id}>
                <ItemDetails itemData={item} />
              </div>
            ))
          ) : (
            <p>Oops! No Items Found</p>
          )}
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

export default AllItemsHomePage;
