import { CustomFieldType } from "../../utils/types";

const RenderItemCustomFields = ({
  item_custom_fields,
}: {
  item_custom_fields: CustomFieldType[];
}) => {
  return (
    <>
      {item_custom_fields.length > 0 ? (
        <section className="space-y-4 font-sans antialiased">
          <div className="relative max-h-screen overflow-x-auto">
            <table className="w-full text-left text-sm rtl:text-right">
              <thead className=" border-b text-xs uppercase">
                <tr>
                  {item_custom_fields.map((field) => (
                    <th key={field.id} scope="col" className="px-6 py-3">
                      {field?.field_name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  {item_custom_fields.map((field) => (
                    <td key={field.id} className="px-6 py-4">
                      {field?.field_value}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <p>No data found</p>
      )}
    </>
  );
};

export default RenderItemCustomFields;
