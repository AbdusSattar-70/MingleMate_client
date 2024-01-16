import React from "react";
import { ItemType } from "../../utils/types";
import { FaRegTrashCan } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constant";
import { useAuth } from "../../hooks/useAuth";
import { canManageAll } from "../../utils/canManageAll";
import keyId from "../../utils/keyId";
interface CollectionTableProps {
  items: ItemType[];
}

const ItemsTable: React.FC<CollectionTableProps> = ({ items }) => {
  const { auth } = useAuth();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-meta-2 dark:text-meta-2 rtl:text-right">
        <thead className="border-b border-meta-9 bg-meta-5 text-xs uppercase text-white dark:text-white">
          <tr>
            <th
              scope="col"
              className="border-r border-meta-9 bg-meta-5 px-6 py-3"
            >
              Item ID
            </th>
            <th
              scope="col"
              className="border-r border-meta-9 bg-meta-5 px-6 py-3"
            >
              Item Name
            </th>
            <th
              scope="col"
              className="border-r border-meta-9 bg-meta-5 px-6 py-3"
            >
              Item Author
            </th>
            <th
              scope="col"
              className="border-r border-meta-9 bg-meta-5 px-6 py-3"
            >
              Likes
            </th>
            <th
              scope="col"
              className="border-r border-meta-9 bg-meta-5 px-6 py-3"
            >
              Comments
            </th>
            <th
              scope="col"
              className="border-r border-meta-9 bg-meta-5 px-6 py-3"
            >
              Tags
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
          {items.map(
            ({ item_id, item_name, item_author, likes, tags, comments }) => (
              <tr
                key={keyId()}
                className="border-b border-meta-9 bg-meta-4 hover:bg-body"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap border-r border-meta-9 bg-form-input px-6 py-4 font-medium"
                >
                  {item_id}
                </th>
                <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                  {item_name}
                </td>
                <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                  {item_author}
                </td>
                <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                  {likes.length}
                </td>
                <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                  {comments.length}
                </td>
                <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                  {tags?.join(", ")}
                </td>
                <td className="border-r border-meta-9 bg-form-input px-6 py-4">
                  <div className="flex gap-2 text-sm">
                    <Link
                      to={`${ROUTES.GET_SIGNLE_ITEM}/${item_id}`}
                      className="btn btn-xs"
                    >
                      <FcViewDetails />
                    </Link>
                    {canManageAll(auth.id, auth.role, item_author) && (
                      <>
                        <button className="btn btn-xs">
                          <GrUpdate />
                        </button>
                        <button className="btn btn-xs">
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
  );
};

export default ItemsTable;
