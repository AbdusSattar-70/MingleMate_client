import Spinner from "../common/Spinner";
import { API_ENDPOINT, MESSAGES, ROUTES } from "../../utils/constant";
import isSuccessRes, { setErrorToast } from "../../utils/apiResponse";
import { CollectionType } from "../../utils/types";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { FcViewDetails } from "react-icons/fc";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { canManageAll } from "../../utils/canManageAll";
import { toast } from "react-toastify";
import useFetchByPage from "../../hooks/useFetchByPage";
import { useState } from "react";
const CollectionsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const [collections, loading, handleSeeMore, setCollections, isMoreData] =
    useFetchByPage<CollectionType>(API_ENDPOINT.COLLECTION, searchTerm);

  const updateDeletedCollection = (collectionId: string) => {
    const updated = collections.filter(
      (collection) => collection.id !== collectionId
    );
    setCollections(updated);
  };

  const handleDeleteCollection = async (id: string) => {
    try {
      const response = await axiosPrivate.delete(
        `${API_ENDPOINT.COLLECTION}/${id}`
      );

      if (isSuccessRes(response)) {
        toast.success(MESSAGES.SUCCESS);
        updateDeletedCollection(response.data.item_id);
      } else {
        toast.warn(MESSAGES.TRY_AGAIN);
      }
    } catch (error) {
      setErrorToast(error);
    }
  };

  const { auth } = useAuth();
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (!auth.authToken) {
      navigate(ROUTES.SIGNIN, { state: { from: location.pathname } });
      return;
    } else {
      navigate(ROUTES.CREATE_COLLECTION);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="navbar bg-base-100">
            <div className="navbar-center">
              <button
                onClick={handleNavigate}
                className="btn btn-outline btn-success"
              >
                Create
              </button>
            </div>

            <div className="navbar-end">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">search</span>
                </label>
                <input
                  type="search"
                  placeholder="search by user collection or category name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered dark:bg-form-input"
                  required
                />
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-meta-2 dark:text-meta-2 rtl:text-right">
              <thead className="border-b border-meta-9 bg-meta-5 text-xs uppercase text-white dark:text-white">
                <tr>
                  <th
                    scope="col"
                    className="border-r border-meta-9 bg-meta-5 px-6 py-3"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="border-r border-meta-9 bg-meta-5 px-6 py-3"
                  >
                    Collection Name
                  </th>
                  <th
                    scope="col"
                    className="border-r border-meta-9 bg-meta-5 px-6 py-3"
                  >
                    Collection Author
                  </th>
                  <th
                    scope="col"
                    className="border-r border-meta-9 bg-meta-5 px-6 py-3"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="border-r border-meta-9 bg-meta-5 px-6 py-3"
                  >
                    Available Items
                  </th>
                  <th
                    scope="col"
                    className="border-r border-meta-9 bg-meta-5 px-6 py-3"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="border-r border-meta-9 bg-meta-5 px-6 py-3"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {collections.map(
                  ({
                    id,
                    title,
                    user_name,
                    category,
                    items_count,
                    description,
                    author_id,
                  }) => (
                    <tr
                      key={id}
                      className="border-b border-meta-9 bg-meta-4 hover:bg-body"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap border-r border-meta-9 bg-form-input px-6 py-4 font-medium"
                      >
                        {id}
                      </th>
                      <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                        {title}
                      </td>
                      <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                        {user_name}
                      </td>
                      <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                        {category}
                      </td>
                      <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                        {items_count}
                      </td>
                      <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                        {description}
                      </td>
                      <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                        <div className="flex gap-2 text-sm">
                          <Link
                            to={`${ROUTES.DIESPLAY_SINGLE_COLLECTION}/${id}`}
                            className="btn btn-xs"
                          >
                            <FcViewDetails />
                          </Link>
                          {canManageAll(auth.id, auth.role, author_id) && (
                            <>
                              <Link
                                to={`${ROUTES.EDIT_COLLECTION}/${id}/edit-collection`}
                                className="btn btn-xs"
                              >
                                <GrUpdate />
                              </Link>
                              <button
                                onClick={() => handleDeleteCollection(id)}
                                className="btn btn-xs"
                              >
                                <FaRegTrashCan />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="mx-auto mb-8 h-20 w-full rounded  border border-stroke bg-gray py-4  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
        <div className="mx-auto flex max-w-[15rem] items-center justify-center gap-4">
          <div className="card w-full flex-shrink-0 bg-base-100 shadow-2xl dark:bg-meta-4">
            {isMoreData && (
              <button onClick={handleSeeMore} className="btn btn-secondary">
                See More Collection
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionsTable;
