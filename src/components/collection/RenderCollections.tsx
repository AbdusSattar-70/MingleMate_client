import { Link } from "react-router-dom";
import dummyImg from "../../images/cards/cards-01.png";
import { ROUTES } from "../../utils/constant";

interface RenderCollectionsProps {
  collection_id: string;
  user_name: string;
  title: string;
  items_count: number;
  image?: string;
  category: string;
}
const RenderCollections: React.FC<RenderCollectionsProps> = ({
  collection_id,
  user_name,
  title,
  image,
  items_count,
  category,
}) => {
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
          <h2 className="card-title">{title.split(" ")[0]}</h2>
          <p>items_count: {items_count}</p>
          <p>Category: {category}</p>

          <p>Created by: {user_name.split(" ")[0]}</p>
          <div className="flex gap-4">
            <button className="btn  btn-sm">Delete</button>
            <button className="btn  btn-sm">Edit</button>
          </div>
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

export default RenderCollections;
