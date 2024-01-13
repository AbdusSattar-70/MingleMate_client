import { useEffect, useState } from "react";
import { API_ENDPOINT, ROUTES } from "../../utils/constant";
import isSuccessRes from "../../utils/apiResponse";
import Spinner from "../common/Spinner";
import RenderCollections from "../collection/RenderCollections";
import axios from "../../utils/api";
import { Link } from "react-router-dom";

const GetLargestCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(API_ENDPOINT.TOP_FIVE_COLLECTIONS);

        if (isSuccessRes(response)) {
          setLoading(false);
          setCollections(response.data);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="mx-4 my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mx-8 md:my-10 md:grid-cols-3 md:gap-8 lg:mx-16 lg:grid-cols-4 xl:mx-24 2xl:mx-32">
          {collections.length ? (
            collections.map(
              ({
                id: collection_id,
                user_name,
                title,
                image,
                items_count,
                category,
              }) => (
                <div key={collection_id}>
                  <RenderCollections
                    collection_id={collection_id}
                    user_name={user_name}
                    title={title}
                    image={image}
                    items_count={items_count}
                    category={category}
                  />
                </div>
              )
            )
          ) : (
            <div className="text-center">No collection to Display</div>
          )}
          <Link to={ROUTES.ALL_COLLECTIONS} className="btn btn-primary">
            See More Collections
          </Link>
        </section>
      )}
    </>
  );
};

export default GetLargestCollections;
