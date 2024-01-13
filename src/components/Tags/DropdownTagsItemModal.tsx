/* eslint-disable @typescript-eslint/no-explicit-any */
import { TAGRelatedItemType } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constant";
import { calculateTimeElapsed } from "../../utils/formattedTime";
interface DropdownTagsItemModalProps {
  tagRef: any;
  items: TAGRelatedItemType[];
}
const DropdownTagsItemModal: React.FC<DropdownTagsItemModalProps> = ({
  tagRef,
  items,
}) => {
  const navigate = useNavigate();

  const handleNavigateToItemPage = (item_id: string) => {
    navigate(`${ROUTES.GET_SIGNLE_ITEM}/${item_id}`);
    tagRef.current.close();
  };

  return (
    <dialog ref={tagRef} className="modal">
      <div className="max-w-70">
        <div className="mt-2.5 flex max-h-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  sm:w-80">
          <div className="flex items-center justify-between border-b px-4.5 py-3">
            <h5 className="border-b text-sm font-medium text-bodydark2">
              Related Items Found: {items.length}
            </h5>
            <p role="button" onClick={() => tagRef.current.close()}>
              X
            </p>
          </div>
          <ul className="flex flex-col overflow-y-auto">
            {items.length > 0
              ? items.map(
                  ({
                    item_id,
                    item_author,
                    item_name,
                    collection_name,
                    comments,
                    likes,
                    created_at,
                    updated_at,
                  }) => (
                    <li key={item_id}>
                      <div
                        role="button"
                        className="link link-success flex cursor-pointer flex-col gap-1 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                        onClick={() => handleNavigateToItemPage(item_id)}
                      >
                        <p className=" text-sm text-black dark:text-white">
                          <span className="font-semibold">{item_name}</span>
                          <span> under {collection_name} collection by</span>
                          <span className="font-semibold"> {item_author}</span>
                        </p>
                        <p className="flex items-center justify-between text-sm text-black dark:text-white">
                          <span>Likes: {likes}</span>
                          <span>Comments: {comments}</span>
                        </p>
                        <p className="text-xs">
                          {calculateTimeElapsed(created_at, updated_at)}
                        </p>
                      </div>
                    </li>
                  )
                )
              : null}
          </ul>
        </div>
      </div>
    </dialog>
  );
};

export default DropdownTagsItemModal;
