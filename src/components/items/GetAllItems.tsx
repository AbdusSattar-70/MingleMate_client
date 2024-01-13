import { API_ENDPOINT } from "../../utils/constant";
import isSuccessRes from "../../utils/apiResponse";
import axios from "../../utils/api";
import { useEffect, useState } from "react";
import DisplaySingleItem from "./DisplaySingleItem";
import Spinner from "../common/Spinner";
import { ItemType } from "../../utils/types";

const GetAllItems = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPageCount = 5;

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT.ITEM}?page=${page}&per_page=${perPageCount}`
        );

        if (isSuccessRes(res)) {
          setLoading(false);
          setItems((prev) => (page === 1 ? res.data : [...prev, ...res.data]));
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchAllItems();
  }, [page]);

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
                <button onClick={handleSeeMore} className="btn btn-primary">
                  see More
                </button>
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

export default GetAllItems;
