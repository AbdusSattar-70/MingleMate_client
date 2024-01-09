import { DASHBOARD_TABLE_CONST } from "../../utils/constant";

interface TableHeaderProps {
  handleCheckboxChange: (all_selected_user: string) => void;
  selectAll: boolean;
}

const UserTableHeader: React.FC<TableHeaderProps> = ({
  handleCheckboxChange,
  selectAll,
}) => {
  return (
    <thead className=" border-b border-white bg-form-input text-xs uppercase text-white dark:bg-meta-4 dark:text-white">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <label htmlFor="checkbox-all-search" className="sr-only">
              checkbox
            </label>
            <input
              id="checkbox-all-search"
              onChange={() =>
                handleCheckboxChange(DASHBOARD_TABLE_CONST.ALL_USER)
              }
              checked={selectAll}
              type="checkbox"
              className="border-gray-300 bg-gray-100 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800 h-4 w-4 cursor-pointer rounded text-white focus:ring-2"
            />
          </div>
        </th>
        <th scope="col" className="px-6 py-3">
          ID
        </th>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Role
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          Registration Time
        </th>
        <th scope="col" className="px-6 py-3">
          Last Login Time
        </th>
        <th scope="col" className="px-6 py-3">
          Status
        </th>
      </tr>
    </thead>
  );
};

export default UserTableHeader;
