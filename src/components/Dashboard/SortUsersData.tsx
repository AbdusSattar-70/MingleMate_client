import { FILTER_BY_USER } from "../../utils/constant";

interface SortUsersDataProps {
  filterUserData: (value: string) => void;
}
const SortUsersData: React.FC<SortUsersDataProps> = ({ filterUserData }) => {
  return (
    <select
      name="Filter users"
      className="select select-bordered select-sm w-full max-w-xs dark:bg-form-strokedark"
      onChange={(e) => filterUserData(e.target.value)}
    >
      <option disabled value="">
        Filter Users
      </option>
      <option value={FILTER_BY_USER.GENERAL}>Filter all regular users</option>
      <option value={FILTER_BY_USER.BLOCKED}>Filter all blocked users</option>
      <option value={FILTER_BY_USER.ACTIVE}>Filter all active users</option>
      <option value={FILTER_BY_USER.ADMIN}>Filter all admin users</option>
    </select>
  );
};

export default SortUsersData;
