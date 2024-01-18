import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../utils/constant";
import isSuccessRes from "../../utils/apiResponse";
import Spinner from "../common/Spinner";
import RenderCollections from "../collection/RenderCollection";
import axios from "../../utils/api";
import keyId from "../../utils/keyId";
import { CollectionType } from "../../utils/types";
const GetLargestCollections = () => {
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const [loading, setLoading] = useState(true);

  const updateDeletedCollection = (collectionId: string) => {
    const updated = collections.filter(
      (collection) => collection.id !== collectionId
    );
    setCollections(updated);
  };

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
        <section className="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
          {collections.length ? (
            collections.map(
              ({
                id: collection_id,
                user_name,
                author_id,
                title,
                image,
                items_count,
                category,
              }) => (
                <div key={keyId()}>
                  <RenderCollections
                    updateDeletedCollection={updateDeletedCollection}
                    collection_id={collection_id}
                    user_name={user_name}
                    author_id={author_id}
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
        </section>
      )}
    </>
  );
};

export default GetLargestCollections;