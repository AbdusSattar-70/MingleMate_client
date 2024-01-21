import { ItemType } from "../../utils/types";
import { API_ENDPOINT } from "../../utils/constant";
import ItemsTable from "../items/ItemsTable";
import useFetchByPage from "../../hooks/useFetchByPage";
import { useParams } from "react-router-dom";
import Spinner from "../common/Spinner";
import SeeMoreButton from "../common/SeeMoreButton";
import { UpcaseFirstChar } from "../../utils/UpcaseFirstChar";
import { useAuth } from "../../hooks/useAuth";
const UserItemsTable = () => {
  const { auth } = useAuth();
  const { user_id } = useParams();
  const [items, loading, handleSeeMore, setItems, isMoreData] =
    useFetchByPage<ItemType>(`${API_ENDPOINT.USER_ITEMS}/${user_id}`);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section>
          <div className="mb-4 rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:bg-boxdark">
            <div className="space-y-1 px-4 text-lg font-semibold dark:text-neutral-200">
              <h1 className="text-2xl">
                Greetings!{" "}
                <span className="text-meta-5">
                  {UpcaseFirstChar(auth.user_name)}
                </span>
                , this is your exclusive hub for all your extraordinary items.
              </h1>
              <p className="text-sm text-meta-4 dark:text-whiter">
                Effortlessly oversee and amplify your remarkable collection,
                poised for your influential touch!
              </p>
            </div>
          </div>

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
