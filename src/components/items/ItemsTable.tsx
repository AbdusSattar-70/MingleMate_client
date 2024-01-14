import React from "react";
import { ItemType } from "../../utils/types";
import { FaRegTrashCan } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constant";
import keyId from "../../utils/keyId";
interface CollectionTableProps {
  items: ItemType[];
}

const ItemsTable: React.FC<CollectionTableProps> = ({ items }) => {
  return (
    <section className="space-y-4 font-sans antialiased">
      <div className="relative max-h-screen overflow-x-auto shadow-md sm:rounded-lg">
        <table className="text-blue-100 dark:text-blue-100 w-full text-left text-sm rtl:text-right">
          <thead className="border-blue-400 bg-blue-600 border-b text-xs uppercase text-white dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Item ID
              </th>
              <th scope="col" className="px-6 py-3">
                Item Name
              </th>
              <th scope="col" className="px-6 py-3">
                Item Author
              </th>
              <th scope="col" className="px-6 py-3">
                Likes
              </th>
              <th scope="col" className="px-6 py-3">
                Comments
              </th>
              <th scope="col" className="px-6 py-3">
                Tags
              </th>
              {items[0]?.item_custom_fields
                ?.filter((field) => field.field_type === "string")
                .map((field) => (
                  <th key={keyId()} scope="col" className="px-6 py-3">
                    {field.field_name}
                  </th>
                ))}
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map(
              ({
                item_id,
                item_name,
                item_author,
                item_custom_fields,
                tags,
                comments_count,
              }) => (
                <tr
                  key={keyId()}
                  className="border-blue-400 bg-blue-600 hover:bg-blue-500 border-b"
                >
                  <td className="px-6 py-4">{item_id}</td>
                  <td className="px-6 py-4">{item_name}</td>
                  <td className="px-6 py-4">{item_author}</td>
                  <td className="px-6 py-4">{comments_count}</td>
                  <td className="px-6 py-4">{tags?.join(", ")}</td>
                  {item_custom_fields
                    ?.filter((field) => field.field_type === "string")
                    .map((field) => (
                      <td key={keyId()} className="px-6 py-4">
                        {field.field_value}
                      </td>
                    ))}
                  <td className="px-6 py-4">
                    <div className="flex gap-2 text-sm">
                      <Link
                        to={`${ROUTES.GET_SIGNLE_ITEM}/${item_id}`}
                        className="btn btn-xs"
                      >
                        <FcViewDetails />
                      </Link>
                      <button className="btn btn-xs">
                        <GrUpdate />
                      </button>
                      <button className="btn btn-xs">
                        <FaRegTrashCan />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ItemsTable;
