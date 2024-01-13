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
      <div className="card card-compact bg-base-100 shadow-xl">
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
          <div className="join">
            <button className="btn join-item">Delete</button>
            <button className="btn join-item">Edit</button>
          </div>
          <Link
            to={`${ROUTES.DIESPLAY_SINGLE_COLLECTION}/${collection_id}`}
            aria-label="see details link"
            className="btn btn-outline btn-secondary"
          >
            see details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenderCollections;
