import { FILTER_BY } from "../../utils/constant";

interface SortUsersDataProps {
  filterUserData: (value: string) => void;
}
const SortUsersData: React.FC<SortUsersDataProps> = ({ filterUserData }) => {
  return (
    <div className="flex flex-col gap-2">
      <select
        name="Filter users"
        className="select select-bordered  w-full"
        onChange={(e) => filterUserData(e.target.value)}
      >
        <option disabled value="">
          Filter Users
        </option>
        <option value={FILTER_BY.ADMIN}>Filter all admin users</option>
        <option value={FILTER_BY.BLOCKED}>Filter all blocked users</option>
        <option value={FILTER_BY.GENERAL}>Filter all general users</option>
        <option value={FILTER_BY.ACTIVE}>Filter all active users</option>
      </select>

      <button
        //  onClick={() => exportToCSV(usersData)}
        className="btn btn-outline btn-primary"
        type="button"
        aria-label="Export to CSV"
      >
        Export to CSV
      </button>
    </div>
  );
};

export default SortUsersData;
