import Spinner from "../common/Spinner";
import axios from "../../utils/api";
import { API_ENDPOINT } from "../../utils/constant";
import RenderCollections from "../collection/RenderCollections";
import isSuccessRes from "../../utils/apiResponse";
import { useEffect, useState } from "react";

const GetAllCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(2);
  const perPageCount = 5;

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT.COLLECTION}?page=${page}&per_page=${perPageCount}`
        );

        if (isSuccessRes(response)) {
          setLoading(false);
          setCollections((prevCollections) =>
            page === 2 ? response.data : [...prevCollections, ...response.data]
          );
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchCollections();
  }, [page]);

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
                <RenderCollections
                  key={collection_id}
                  collection_id={collection_id}
                  user_name={user_name}
                  title={title}
                  image={image}
                  items_count={items_count}
                  category={category}
                />
              )
            )
          ) : (
            <div className="text-center">No collection to Display</div>
          )}
          <button onClick={handleSeeMore} className="btn btn-secondary">
            See More Collection
          </button>
        </section>
      )}
    </>
  );
};

export default GetAllCollections;
