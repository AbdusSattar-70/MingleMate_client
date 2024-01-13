import DisplaySingleItem from "../items/DisplaySingleItem";
import { ItemType } from "../../utils/types";
import { useEffect, useState } from "react";
import { API_ENDPOINT, MESSAGES } from "../../utils/constant";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import isSuccessRes from "../../utils/apiResponse";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import { useAuth } from "../../hooks/useAuth";

const MyItemsAll = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const response = await axiosPrivate.get(
          `${API_ENDPOINT.USER_ITEMS}/${auth.id}`
        );
        if (isSuccessRes(response)) {
          setLoading(false);
          setItems(response.data);
        }
      } catch (error) {
        toast.error(MESSAGES.TRY_AGAIN);
        setLoading(false);
      }
    };

    fetchMyItems();
  }, [axiosPrivate, auth.id]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {items.length > 0 ? (
            items.map((itemData) => (
              <section
                key={itemData.item_id}
                className="mb-10 bg-white shadow-xl drop-shadow-xl"
              >
                <DisplaySingleItem itemData={itemData} />
              </section>
            ))
          ) : (
            <div>No Item Data found</div>
          )}
        </>
      )}
    </>
  );
};

export default MyItemsAll;
