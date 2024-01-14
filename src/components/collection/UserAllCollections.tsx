import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../utils/constant";
import isSuccessRes from "../../utils/apiResponse";
import Spinner from "../common/Spinner";
import RenderCollections from "./RenderCollections";
import axios from "../../utils/api";
import keyId from "../../utils/keyId";
const UserAllCollections = ({ userId }: { userId: string }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT.USER_COLLECTIONS}/${userId}`
        );

        if (isSuccessRes(response)) {
          setLoading(false);
          setCollections(response.data);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [userId]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
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
                  key={keyId()}
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
        </section>
      )}
    </>
  );
};

export default UserAllCollections;
