import PropTypes from "prop-types";
import UserTableCheckbox from "./UserCheckbox";
import { format } from "date-fns";
import { useAuth } from "../../../hooks/useAuth";
const UserTableRow = ({
  id,
  name,
  email,
  registrationTime,
  lastLoginTime,
  status,
  selectedUsers,
  handleCheckboxChange,
}) => {
  const { auth } = useAuth();
  const currentUser = auth.id;

  // Format the date and time using date-fns
  const formattedRegistrationTime = format(
    new Date(registrationTime),
    "yyyy-MM-dd HH:mm:ss"
  );

  // Check if lastLoginTime is not an empty string before formatting
  const formattedLastLoginTime = lastLoginTime
    ? format(new Date(lastLoginTime), "yyyy-MM-dd HH:mm:ss")
    : "Not yet logged in";

  const truncatedId = id.substring(id.length - 4); // Get the last 4 characters of id

  return (
    <tr
      key={String(id)}
      className={`${
        currentUser === id ? "border-red-blink" : ""
      } border-b border-blue-400 bg-blue-600 hover:bg-blue-500`}
    >
      <UserTableCheckbox
        id={id}
        selectedUsers={selectedUsers}
        handleCheckboxChange={handleCheckboxChange}
      />
      <td className="cursor-pointer px-6 py-4 font-medium" title={id}>
        <span>{truncatedId}</span>
      </td>
      <td className="px-6 py-4 font-medium">{name}</td>
      <td className="px-6 py-4 font-medium">{email}</td>
      <td className="px-6 py-4 font-medium">{formattedRegistrationTime}</td>
      <td className="px-6 py-4 font-medium">{formattedLastLoginTime}</td>
      <td className="px-6 py-4 font-medium">
        <div className="flex items-center">
          <div
            className={`${
              status === "active"
                ? "me-2 h-2.5 w-2.5 rounded-full bg-green-500"
                : "me-2 h-2.5 w-2.5 rounded-full bg-red-500"
            }`}
          ></div>
          {status}
        </div>
      </td>
    </tr>
  );
};

UserTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  registrationTime: PropTypes.string.isRequired,
  lastLoginTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]).isRequired,
  status: PropTypes.string.isRequired,
  selectedUsers: PropTypes.array.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default UserTableRow;
