interface UserTableCheckBoxProps {
  handleCheckboxChange: (userId: string) => void;
  selectedUsers: string[];
  email: string;
}

const UserTableCheckbox: React.FC<UserTableCheckBoxProps> = ({
  email,
  selectedUsers,
  handleCheckboxChange,
}) => {
  return (
    <td className="w-4 p-4">
      <div className="flex items-center">
        <input
          onChange={() => handleCheckboxChange(email)}
          checked={selectedUsers.includes(email)}
          id={`checkbox-table-search-${email}`}
          type="checkbox"
          className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-red-600 focus:ring-2 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-red-600"
        />
        <label htmlFor={`checkbox-table-search-${email}`} className="sr-only">
          checkbox
        </label>
      </div>
    </td>
  );
};

export default UserTableCheckbox;
