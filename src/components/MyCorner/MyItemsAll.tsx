import { ItemType } from "../../utils/types";
import { API_ENDPOINT } from "../../utils/constant";
import Spinner from "../common/Spinner";
import { useAuth } from "../../hooks/useAuth";
import ItemsTable from "../items/ItemsTable";
import useFetchByPage from "../../hooks/useFetchByPage";
const MyItemsAll = () => {
  const { auth } = useAuth();
  const [items, loading, handleSeeMore, setItems, isMoreData] =
    useFetchByPage<ItemType>(`${API_ENDPOINT.USER_ITEMS}/${auth.id}`);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ItemsTable items={items} setItems={setItems} />
          {isMoreData && (
            <div className="mx-auto mb-8 h-20 w-full rounded  border border-stroke bg-gray py-4  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
              <div className="mx-auto flex max-w-[15rem] items-center justify-center gap-4">
                <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl dark:bg-meta-4">
                  <button onClick={handleSeeMore} className="btn btn-secondary">
                    See More Items
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyItemsAll;
