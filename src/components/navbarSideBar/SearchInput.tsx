/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT, ROUTES } from "../../utils/constant";
import axios from "../../utils/api";
import { useEffect, useRef, useState } from "react";
import isSuccessRes, { setErrorToast } from "../../utils/apiResponse";
import { useNavigate } from "react-router-dom";
import { UpcaseFirstChar } from "../../utils/UpcaseFirstChar";
import { calculateTimeElapsed } from "../../utils/formattedTime";
import { TAGRelatedItemType } from "../../utils/types";
const SearchInput = () => {
  const [searchResult, setSearchResult] = useState<TAGRelatedItemType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const fetchItemsByTextSearch = async (inputValue: string) => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT.SEARCH_ITEMS_FULL_TEXT}${inputValue}`
        );

        if (isSuccessRes(response)) {
          setSearchResult(response.data);
        }
      } catch (error) {
        setErrorToast(error);
        return [];
      }
    };

    if (inputValue) {
      fetchItemsByTextSearch(inputValue);
    }
  }, [inputValue]);

  const navigate = useNavigate();

  const handleNavigateToItemPage = (item_id: string) => {
    navigate(`${ROUTES.GET_SIGNLE_ITEM}/${item_id}`);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  return (
    <div className="relative">
      <div
        role="button"
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative flex items-center justify-center dark:text-white"
      >
        {/* dummy search input */}

        <input
          placeholder="search..."
          className="w-32 rounded-sm border-0  p-2 dark:bg-meta-4"
        />
      </div>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`fixed left-0 top-0 z-999999 mt-2.5 flex max-h-dvh max-w-full flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">
            <input
              type="text"
              placeholder="Search..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input input-bordered input-primary w-full dark:bg-meta-4"
            />
          </h5>
        </div>

        <ul className="flex h-[20rem] w-[40rem] flex-col overflow-y-auto">
          {searchResult.length > 0 ? (
            searchResult.map(
              ({
                item_id,
                item_author,
                item_name,
                collection_name,
                comments,
                likes,
                created_at,
                updated_at,
              }) => (
                <li key={item_id}>
                  <div
                    role="button"
                    className="link link-success flex cursor-pointer flex-col gap-1 border-t-2 border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                    onClick={() => handleNavigateToItemPage(item_id)}
                  >
                    <p className=" text-sm text-black dark:text-white">
                      <span className="font-semibold">
                        {UpcaseFirstChar(item_name)}
                      </span>
                      <span>
                        {" "}
                        under {UpcaseFirstChar(collection_name)} collection by
                      </span>
                      <span className="font-semibold">
                        {" "}
                        {UpcaseFirstChar(item_author)}
                      </span>
                    </p>
                    <p className="flex items-center gap-7 text-sm text-black dark:text-white">
                      <span>Likes: {likes}</span>
                      <span>Comments: {comments}</span>
                    </p>
                    <p className="text-xs">
                      {calculateTimeElapsed(created_at, updated_at)}
                    </p>
                  </div>
                </li>
              )
            )
          ) : (
            <p className=" p-4">Oops! Nothing is found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchInput;
