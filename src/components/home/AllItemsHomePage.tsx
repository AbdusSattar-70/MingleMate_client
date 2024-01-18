import { API_ENDPOINT } from "../../utils/constant";
import { ItemType } from "../../utils/types";
import ItemDetails from "../items/itemDetails/ItemDetails";
import useFetchByPage from "../../hooks/useFetchByPage";
import Spinner from "../common/Spinner";
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
        </section>
      )}
    </>
  );
};

export default AllItemsHomePage;
