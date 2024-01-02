import UserTableCheckbox from "./UserCheckbox";
import { format } from "date-fns";
import { useAuth } from "../../hooks/useAuth";
import { Users } from "../../utils/types";

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

  // Format the date and time using date-fns
  const formattedRegistrationTime = format(
    new Date(created_at),
    "yyyy-MM-dd HH:mm:ss"
  );

  // Check if lastLoginTime is not an empty string before formatting
  const formattedLastLoginTime = updated_at
    ? format(new Date(updated_at), "yyyy-MM-dd HH:mm:ss")
    : "Not yet logged in";

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
      <td className="px-6 py-4 font-medium">{formattedRegistrationTime}</td>
      <td className="px-6 py-4 font-medium">{formattedLastLoginTime}</td>
      <td className="px-6 py-4 font-medium">
        <div className="flex items-center">
          <div
            className={`${
              blocked === false
                ? "me-2 h-2.5 w-2.5 rounded-full bg-green-500"
                : "me-2 h-2.5 w-2.5 rounded-full bg-red-500"
            }`}
          ></div>
          {blocked === false ? "active" : "blocked"}
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
