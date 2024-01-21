import { CustomFieldType } from "../../../utils/types";

const RenderItemCustomFields = ({
  item_custom_fields,
}: {
  item_custom_fields: CustomFieldType[];
}) => {
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
              <tr className=" hover:bg-body">
                {item_custom_fields.map((field) => (
                  <td
                    key={field.id + 1}
                    className=" border-b border-r border-white bg-meta-9 p-2 text-black dark:border-b dark:border-r dark:bg-form-input dark:text-whiter"
                  >
                    {renderFieldValue(field)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

const renderFieldValue = (field: CustomFieldType) => {
  switch (field?.field_type) {
    case "boolean":
      return String(field?.field_value);
    case "number":
      return Number(field?.field_value);
    default:
      return String(field?.field_value);
  }
};

export default RenderItemCustomFields;
