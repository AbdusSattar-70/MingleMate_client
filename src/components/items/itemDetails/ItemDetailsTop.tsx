import { Link } from "react-router-dom";
import dummyImg from "../../../images/cards/cards-03.webp";
import { UpcaseFirstChar } from "../../../utils/UpcaseFirstChar";
import { ROUTES } from "../../../utils/constant";
import RenderItemCustomFields from "./RenderItemCustomFields";
import { CustomFieldType } from "../../../utils/types";

interface ItemDetailsTopProps {
  item_image?: string;
  item_name: string;
  item_author: string;
  collection_id: string;
  collection_name: string;
  item_custom_fields: CustomFieldType[];
}

const ItemDetailsTop: React.FC<ItemDetailsTopProps> = ({
  item_name,
  item_image,
  item_author,
  collection_id,
  collection_name,
  item_custom_fields,
}) => {
  return (
    <div className="text-center">
      <img
        src={item_image ? item_image : dummyImg}
        className="h-full w-full rounded-lg object-cover shadow-2xl"
        alt="item Image"
      />
      <div className="mb-4 mt-1 pb-1 text-xl font-semibold">
        <h1 className="text-xl font-bold sm:text-3xl lg:text-4xl">
          {UpcaseFirstChar(item_name)} <span>added by</span>{" "}
          <span className=" font-bold ">{UpcaseFirstChar(item_author)}</span>
        </h1>
        <span>under</span>
        <Link
          to={`${ROUTES.DIESPLAY_SINGLE_COLLECTION}/${collection_id}`}
          className="link link-success py-6 "
        >
          {" "}
          {collection_name}{" "}
        </Link>
        <span>collection</span>
      </div>
      <div className="mx-auto mt-4 overflow-x-auto  dark:bg-[#37404F]">
        <RenderItemCustomFields item_custom_fields={item_custom_fields} />
      </div>
    </div>
  );
};

export default ItemDetailsTop;
