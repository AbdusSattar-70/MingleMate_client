import { FcViewDetails } from "react-icons/fc";
import { calculateTimeElapsed, formattedTime } from "../../utils/formattedTime";
import {
  defineUserRole,
  defineUserStatus,
} from "../../utils/userStatusAndRole";
import { Users } from "../../utils/types";
import UserTableCheckbox from "./UserCheckbox";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constant";
const ACTIVE_USER = "Active";
interface UserTableRowProps {
  user: Users;
  selectedUsers: string[];
  handleCheckboxChange: (userEmail: string) => void;
  selectAll: boolean;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user: { id, email, user_name, role, blocked, created_at, updated_at },
  selectedUsers,
  handleCheckboxChange,
}) => {
  return (
    <tr className="border-b border-stroke text-black-2 hover:bg-meta-3 dark:border-strokedark dark:bg-boxdark-2 dark:text-whiten dark:hover:bg-meta-1">
      <UserTableCheckbox
        email={email}
        selectedUsers={selectedUsers}
        handleCheckboxChange={handleCheckboxChange}
      />
      <td className="px-6 py-4 font-medium">{id}</td>
      <td className="px-6 py-4 font-medium">{user_name}</td>
      <td className="px-6 py-4 font-medium">{defineUserRole(role)}</td>
      <td className="px-6 py-4 font-medium">{email}</td>
      <td className="px-6 py-4 font-medium">{formattedTime(created_at)}</td>
      <td className="px-6 py-4 font-medium">
        {calculateTimeElapsed(created_at, updated_at)}
      </td>
      <td className="px-6 py-4 font-medium">
        <div className="flex items-center">
          <div
            className={`${
              defineUserStatus(blocked) === ACTIVE_USER
                ? "me-2 h-2.5 w-2.5 rounded-full bg-meta-5"
                : "me-2 h-2.5 w-2.5 rounded-full bg-danger"
            }`}
          ></div>
          {defineUserStatus(blocked)}
        </div>
      </td>
      <td className="px-6 py-4 font-medium">
        <div className="flex gap-2 text-sm">
          <Link to={`${ROUTES.USER_PROFILE}/${id}`} className="btn btn-xs">
            <FcViewDetails />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
