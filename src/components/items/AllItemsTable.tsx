import { API_ENDPOINT } from "../../utils/constant";
import { ItemType } from "../../utils/types";
import ItemsTable from "./ItemsTable";
import useFetchByPage from "../../hooks/useFetchByPage";
import SeeMoreButton from "../common/SeeMoreButton";
import { UpcaseFirstChar } from "../../utils/UpcaseFirstChar";
import { useAuth } from "../../hooks/useAuth";

const AllItemsTable = () => {
  const { auth } = useAuth();
  const [items, loading, handleSeeMore, setItems, isMoreData] =
    useFetchByPage<ItemType>(API_ENDPOINT.ITEM);

  return (
    <section>
      <div className="mb-4 rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:bg-boxdark">
        <div className="space-y-1 px-4 text-lg font-semibold dark:text-neutral-200">
          <h1 className="text-2xl">
            Welcome!{" "}
            <span className="text-meta-5">
              {UpcaseFirstChar(auth.user_name)}
            </span>
            , discover all the items available in this app within your
            personalized space.
          </h1>
          <p className="text-sm text-meta-4 dark:text-whiter">
            Effortlessly navigate through and enhance your extensive collection,
            ready for your impactful use!
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
  );
};

export default AllItemsTable;
