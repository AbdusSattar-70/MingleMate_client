import { Link } from "react-router-dom";
import dummyImg from "../../images/cards/cards-03.webp";
import {
  API_ENDPOINT,
  DELETE_CONFIRMATION,
  MESSAGES,
  ROUTES,
} from "../../utils/constant";
import isSuccessRes, { setErrorToast } from "../../utils/apiResponse";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { canManageAll } from "../../utils/canManageAll";
import { UpcaseFirstChar } from "../../utils/UpcaseFirstChar";

interface CollectionCardProps {
  collection_id: string;
  user_name: string;
  author_id: string;
  title: string;
  items_count: number;
  image?: string;
  category: string;
  updateDeletedCollection: (collectionId: string) => void;
}
const CollectionCard: React.FC<CollectionCardProps> = ({
  collection_id,
  user_name,
  author_id,
  title,
  image,
  items_count,
  category,
  updateDeletedCollection,
}) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const handleDeleteCollection = async (id: string) => {
    try {
      const confirmResult = window.confirm(DELETE_CONFIRMATION);
      if (confirmResult) {
        const response = await axiosPrivate.delete(
          `${API_ENDPOINT.COLLECTION}/${id}`
        );

        if (isSuccessRes(response)) {
          updateDeletedCollection(id);
          toast.success(MESSAGES.SUCCESS);
        } else {
          toast.warn(MESSAGES.TRY_AGAIN);
        }
      }
    } catch (error) {
      setErrorToast(error);
    }
  };

  return (
    <div>
      <div className="card card-compact rounded border border-stroke bg-gray text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
        <figure style={{ width: "100%", height: "150px", overflow: "hidden" }}>
          <img
            src={image ? image : dummyImg}
            alt="stage thumbnail"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{UpcaseFirstChar(title.split(" ")[0])}</h2>
          <p>Available Items: {items_count}</p>
          <p>Category: {category}</p>

          <p>Created by: {UpcaseFirstChar(user_name.split(" ")[0])}</p>
          {canManageAll(auth.id, auth.role, author_id) && (
            <div className="flex gap-4">
              <button
                className="btn  btn-sm"
                onClick={() => handleDeleteCollection(collection_id)}
              >
                Delete
              </button>
              <Link
                to={`${ROUTES.EDIT_COLLECTION}/${collection_id}`}
                className="btn  btn-sm"
              >
                Edit
              </Link>
              <Link
                to={`${ROUTES.CREATE_ITEM}/${collection_id}/create-item`}
                className="btn  btn-sm"
              >
                Add Item
              </Link>
            </div>
          )}
          <Link
            to={`${ROUTES.DIESPLAY_SINGLE_COLLECTION}/${collection_id}`}
            aria-label="see details link"
            className="btn  btn-primary"
          >
            see details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
