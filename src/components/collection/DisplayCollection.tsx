import collectionImg from "../../assets/logo/avatar.jpg";

const DisplayCollections = () => {
  return (
    <div>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure style={{ width: "100%", height: "150px", overflow: "hidden" }}>
          <img
            src={collectionImg}
            alt="stage thumbnail"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{"Collection Title goes here"}</h2>
          <p>Created by: {"Abdus Sattar"}</p>
          <button
            aria-label="create board button"
            className="btn btn-outline btn-secondary"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayCollections;
