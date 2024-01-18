import { API_ENDPOINT } from "../../utils/constant";
import Spinner from "../common/Spinner";
import { ItemType } from "../../utils/types";
import DisplaySingleItem from "../items/DisplaySingleItem";
import useFetchByPage from "../../hooks/useFetchByPage";
const AllItemsHomePage = () => {
  const [items, loading, handleSeeMore] = useFetchByPage<ItemType>(
    API_ENDPOINT.ITEM
  );

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section>
          {items.length > 0
            ? items.map((item) => (
                <div key={item.item_id}>
                  <DisplaySingleItem itemData={item} />
                </div>
              ))
            : null}

          <div className="mx-auto mb-8 h-20 w-full rounded border border-stroke bg-gray py-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
            <div className="mx-auto flex max-w-[15rem] items-center justify-center gap-4">
              <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl dark:bg-meta-4">
                {items.length && (
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
