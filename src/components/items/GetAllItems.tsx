import { API_ENDPOINT } from "../../utils/constant";
import isSuccessRes from "../../utils/apiResponse";
import axios from "../../utils/api";
import { useEffect, useState } from "react";
import DisplaySingleItem from "./DisplaySingleItem";
import Spinner from "../common/Spinner";
import { ItemType } from "../../utils/types";
import keyId from "../../utils/keyId";

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
        <section>
          {items.length > 0
            ? items.map((itemData) => (
                <DisplaySingleItem
                  key={keyId() + itemData.item_id}
                  itemData={itemData}
                />
              ))
            : null}
          <div className="flex items-center justify-center">
            {items.length && (
              <button onClick={handleSeeMore} className="btn btn-primary">
                see More
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default GetAllItems;
