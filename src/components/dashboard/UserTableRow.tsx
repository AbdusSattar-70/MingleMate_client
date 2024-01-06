import UserTableCheckbox from "./UserCheckbox";
import { useAuth } from "../../hooks/useAuth";
import { Users } from "../../utils/types";
import { formattedTime } from "../../utils/formattedTime";
import { isActive } from "../../utils/isActive";
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
  const { auth } = useAuth();
  const currentUser = auth.id;

  return (
    <tr
      className={`${
        currentUser === id ? "border-red-blink" : ""
      } border-b border-blue-400 bg-blue-600 hover:bg-blue-500`}
    >
      <UserTableCheckbox
        email={email}
        selectedUsers={selectedUsers}
        handleCheckboxChange={handleCheckboxChange}
      />
      <td className="px-6 py-4 font-medium">{id}</td>
      <td className="px-6 py-4 font-medium">{user_name}</td>
      <td className="px-6 py-4 font-medium">
        {role === 1 ? "General" : "Admin"}
      </td>
      <td className="px-6 py-4 font-medium">{email}</td>
      <td className="px-6 py-4 font-medium">{formattedTime(created_at)}</td>
      <td className="px-6 py-4 font-medium">{formattedTime(updated_at)}</td>
      <td className="px-6 py-4 font-medium">
        <div className="flex items-center">
          <div
            className={`${
              isActive(blocked) === ACTIVE_USER
                ? "me-2 h-2.5 w-2.5 rounded-full bg-green-500"
                : "me-2 h-2.5 w-2.5 rounded-full bg-red-500"
            }`}
          ></div>
          {isActive(blocked)}
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
