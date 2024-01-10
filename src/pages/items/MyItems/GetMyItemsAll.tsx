import { useEffect, useState } from "react";
import DisplaySingleItem from "../DisplaySingleItem";
import { useAuth } from "../../../hooks/useAuth";
import axios from "../../../utils/api";
import isSuccessRes, { setErrorToast } from "../../../utils/apiResponse";
import { API_ENDPOINT } from "../../../utils/constant";
import { ItemType } from "../../../utils/types";
const GetMyItemsAll = () => {
  const { auth } = useAuth();
  const [itemData, setItemData] = useState<ItemType[]>([]);

  useEffect(() => {
    const fetchUserItemsAll = async (userId: number) => {
      try {
        const res = await axios.get(`${API_ENDPOINT.USER_ITEMS}/${userId}`);
        if (isSuccessRes(res)) {
          setItemData(res.data);
        }
      } catch (error) {
        setErrorToast(error);
      }
    };

    if (auth.id) {
      fetchUserItemsAll(auth.id);
    }
  }, [auth.id]);
  return (
    <>
      {itemData.length > 0 ? (
        itemData.map((item, i) => (
          <section key={i} className="mb-10 bg-white shadow-xl drop-shadow-xl">
            <DisplaySingleItem item={item} />
          </section>
        ))
      ) : (
        <div>No Item Data found</div>
      )}
    </>
  );
};

export default GetMyItemsAll;
