import { useState } from "react";
import { CustomFieldType } from "../../../utils/types";
import { FaAngleDoubleDown } from "react-icons/fa";
import { RxDoubleArrowUp } from "react-icons/rx";
const RenderItemCustomFields = ({
  item_custom_fields,
}: {
  item_custom_fields: CustomFieldType[];
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <>
      {item_custom_fields.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-meta-2 dark:text-meta-2 rtl:text-right">
            <thead className="border-b border-meta-9 bg-meta-5 text-xs uppercase text-white dark:text-white">
              <tr>
                {item_custom_fields.map((field) => (
                  <th
                    key={field.id}
                    scope="col"
                    className="border-r border-meta-9 bg-meta-5 px-6 py-3"
                  >
                    {field?.field_name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-body">
                {item_custom_fields.map((field) => (
                  <td
                    key={field.id + 1}
                    className="border-b border-r border-white bg-meta-9 p-2 text-black dark:border-b dark:border-r dark:bg-form-input dark:text-whiter"
                  >
                    {renderFieldValue(field, showFullContent)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          {item_custom_fields.some(
            (field) => String(field?.field_value).length > 50
          ) && (
            <button className="btn btn-sm w-full" onClick={toggleContent}>
              {showFullContent ? (
                <span>
                  <RxDoubleArrowUp />
                </span>
              ) : (
                <span>
                  <FaAngleDoubleDown />
                </span>
              )}
            </button>
          )}
        </div>
      ) : null}
    </>
  );
};

const renderFieldValue = (field: CustomFieldType, showFullContent: boolean) => {
  const value = String(field?.field_value);

  return showFullContent ? value : value.slice(0, 50) + "...";
};

export default RenderItemCustomFields;
