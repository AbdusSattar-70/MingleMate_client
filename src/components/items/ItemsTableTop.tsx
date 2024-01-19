import { FaGears } from "react-icons/fa6";
// import { GrUpdate } from "react-icons/gr";
// import { LiaSortAmountDownSolid } from "react-icons/lia";
// import { TiExport } from "react-icons/ti";
import { UpcaseFirstChar } from "../../utils/UpcaseFirstChar";
import { useAuth } from "../../hooks/useAuth";
import { SORT_BY_ITEMS } from "../../utils/constant";

interface ItemsTableTopProps {
  setUserChoice: React.Dispatch<React.SetStateAction<string>>;
  userChoice: string;
  loading: boolean;
}

const ItemsTableTop: React.FC<ItemsTableTopProps> = ({
  userChoice,
  setUserChoice,
  loading,
}) => {
  const { auth } = useAuth();

  return (
    <>
      <section className="grid grid-cols-1 gap-4 bg-gray p-3 dark:bg-meta-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:bg-boxdark">
          <div className="space-y-1 px-4 text-lg font-semibold dark:text-neutral-200">
            <h1 className="text-2xl">
              <span className="text-meta-5">
                {UpcaseFirstChar(auth.user_name)}
              </span>{" "}
              Dive into the Power of All Items Management.
            </h1>
            <p className="text-sm text-meta-4 dark:text-whiter">
              Manage and elevate your outstanding Items awaiting your creative
              touch!
            </p>
          </div>
        </div>
        {loading ? (
          <span className="btn btn-sm text-meta-7">
            <span className="loading loading-spinner"></span>
          </span>
        ) : (
          <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:bg-boxdark">
            <h4 className="mb-2 flex items-center justify-start gap-1 text-xl">
              <span>
                <FaGears />
              </span>
              Filter or Sort By:
            </h4>

            <div className="flex flex-wrap items-center justify-start gap-3  text-sm"></div>

            <div className="mt-4 flex items-end justify-between">
              <select
                name="Filter Items"
                value={userChoice}
                className="select select-bordered select-sm w-full max-w-xs dark:bg-form-strokedark"
                onChange={(e) => setUserChoice(e.target.value)}
              >
                <option disabled value="">
                  Sort or Filter Items
                </option>
                <option value={SORT_BY_ITEMS.ASC}>
                  Sort By Acending Order
                </option>
                <option value={SORT_BY_ITEMS.DESC}>
                  Sort By Decending Order
                </option>
                <option value={SORT_BY_ITEMS.TOP_COMMENTED}>
                  Sort By Top Commented
                </option>
                <option value={SORT_BY_ITEMS.NO_COMMENT}>
                  Sort By without Comment
                </option>
                <option value={SORT_BY_ITEMS.TOP_LIKED}>
                  Sort By Top Liked
                </option>
                <option value={SORT_BY_ITEMS.NO_LIKE}>
                  Sort By without Like
                </option>
              </select>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ItemsTableTop;
