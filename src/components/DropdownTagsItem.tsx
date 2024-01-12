import { useRef, useState } from "react";
import axios from "../utils/api";
import { API_ENDPOINT } from "../utils/constant";
import isSuccessRes from "../utils/apiResponse";
import { TAGRelatedItemType } from "../utils/types";
import DropdownTagsItemModal from "./DropdownTagsItemModal";

const DropdownTagsItem = ({ tag }: { tag: string }) => {
  const tagRef = useRef<HTMLDialogElement | null>(null);
  const [items, setItems] = useState<TAGRelatedItemType[]>([]);

  const handleFetchTagsRelatedItems = async () => {
    const res = await axios.get(`${API_ENDPOINT.TAG_RELATED_ITEMS}${tag}`);
    if (isSuccessRes(res) && tagRef.current) {
      setItems(res.data);
      tagRef.current.showModal();
    }
  };

  return (
    <li>
      <div
        onClick={handleFetchTagsRelatedItems}
        role="button"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>
        <button className="btn btn-xs"> {tag}</button>
      </div>
      <DropdownTagsItemModal tagRef={tagRef} items={items} />
    </li>
  );
};

export default DropdownTagsItem;
