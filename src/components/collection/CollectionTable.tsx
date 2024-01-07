import React from "react";
import { ItemType } from "../../utils/types";
import { FaDailymotion, FaDashcube, FaRegTrashCan } from "react-icons/fa6";

interface CollectionTableProps {
  items: ItemType[];
}

const CollectionTable: React.FC<CollectionTableProps> = ({ items }) => {
  console.log(items);

  return (
    <section className="space-y-4 font-sans antialiased">
      <div className="relative max-h-screen overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-blue-100 rtl:text-right dark:text-blue-100">
          <thead className="border-b border-blue-400 bg-blue-600 text-xs uppercase text-white dark:text-white">
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
                .filter((field) => field.field_type === "string")
                .map((field) => (
                  <th key={field.id} scope="col" className="px-6 py-3">
                    {field.field_name}
                  </th>
                ))}
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-blue-400 bg-blue-600 hover:bg-blue-500"
              >
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.item_name}</td>
                <td className="px-6 py-4">{item.item_author}</td>
                <td className="px-6 py-4">{item.likes}</td>
                <td className="px-6 py-4">{item.comments_count}</td>
                <td className="px-6 py-4">{item.tags.join(", ")}</td>
                {item.item_custom_fields
                  .filter((field) => field.field_type === "string")
                  .map((field) => (
                    <td key={field.id} className="px-6 py-4">
                      {field.field_value.slice(0, 20)}
                    </td>
                  ))}
                <td className="px-6 py-4">
                  <div className="join join-vertical lg:join-horizontal">
                    <button className="btn join-item">
                      <span className="tooltip" data-tip="Delete">
                        <FaDailymotion />
                      </span>
                    </button>
                    <button className="btn join-item">
                      <span className="tooltip" data-tip="Delete">
                        <FaDashcube />
                      </span>
                    </button>
                    <button className="btn join-item">
                      <span className="tooltip" data-tip="Delete">
                        <FaRegTrashCan />
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CollectionTable;
