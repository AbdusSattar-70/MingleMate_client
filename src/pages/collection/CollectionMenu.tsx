import { Link } from "react-router-dom";

const CollectionMenu = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/delete-collection" className="btn btn-outline btn-success">
          Delete
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/add-collection" className="btn btn-outline btn-success">
          Create
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-outline btn-success">Update</button>
      </div>
    </div>
  );
};

export default CollectionMenu;
