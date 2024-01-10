import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { API_ENDPOINT, MESSAGES } from "../../utils/constant";
import { toast } from "react-toastify";
import isSuccessRes from "../../utils/apiResponse";
import Spinner from "../../components/Spinner";
import RenderCollections from "./RenderCollections";

const GetLargestCollections = () => {
  const axiosPrivate = useAxiosPrivate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axiosPrivate.get(API_ENDPOINT.COLLECTION);
        console.log(response);
        if (isSuccessRes(response)) {
          setLoading(false);
          setCollections(response.data);
        }
      } catch (error) {
        toast.error(MESSAGES.TRY_AGAIN);
        setLoading(false);
      }
    };
    fetchCollections();
  }, [axiosPrivate]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="mx-4 my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mx-8 md:my-10 md:grid-cols-3 md:gap-8 lg:mx-16 lg:grid-cols-4 xl:mx-24 2xl:mx-32">
          {collections.length ? (
            collections.map(
              ({ id, user_name, title, image, items_count, category }) => (
                <RenderCollections
                  key={id}
                  id={id}
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
        </section>
      )}
    </>
  );
};

export default GetLargestCollections;
