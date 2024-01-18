import { useRef, useState } from "react";
import axios from "../../../../utils/api";
import { API_ENDPOINT } from "../../../../utils/constant";
import isSuccessRes from "../../../../utils/apiResponse";
import { TAGRelatedItemType } from "../../../../utils/types";
import DropdownTagsItemModal from "./DropdownTagsItemModal";
import { HiOutlineStatusOnline } from "react-icons/hi";
const DropdownTagsItem = ({ tag }: { tag: string }) => {
  const tagRef = useRef<HTMLDialogElement | null>(null);
  const [items, setItems] = useState<TAGRelatedItemType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchTagsRelatedItems = async () => {
    setLoading(true);
    const res = await axios.get(`${API_ENDPOINT.TAG_RELATED_ITEMS}${tag}`);
    if (isSuccessRes(res) && tagRef.current) {
      setItems(res.data);
      setLoading(false);
      tagRef.current.showModal();
    }
  };

  return (
    <>
      <button className="btn  btn-xs" onClick={handleFetchTagsRelatedItems}>
        <HiOutlineStatusOnline className="text-meta-5" />
        {loading ? (
          <span className="btn btn-sm text-meta-7">
            <span className="loading loading-spinner"></span>
          </span>
        ) : (
          tag
        )}
      </button>
      <DropdownTagsItemModal tagRef={tagRef} items={items} />
    </>
  );
};

export default DropdownTagsItem;
