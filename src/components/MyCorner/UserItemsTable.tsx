import { ItemType } from "../../utils/types";
import { API_ENDPOINT } from "../../utils/constant";
import ItemsTable from "../items/ItemsTable";
import useFetchByPage from "../../hooks/useFetchByPage";
import { useParams } from "react-router-dom";
const UserItemsTable = () => {
  const { user_id } = useParams();
  const [items, loading, handleSeeMore, setItems, isMoreData] =
    useFetchByPage<ItemType>(`${API_ENDPOINT.USER_ITEMS}/${user_id}`);

  return (
    <>
      {items.length > 0 ? (
        <section>
          <ItemsTable items={items} setItems={setItems} />
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
      ) : (
        <p>Oops! No Items Found</p>
      )}
    </>
  );
};

export default UserItemsTable;
