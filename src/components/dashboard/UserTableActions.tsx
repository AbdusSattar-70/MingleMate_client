import { FaRegTrashCan, FaLockOpen, FaLock } from "react-icons/fa6";
import { FILTER_BY } from "../../utils/constant";

interface UserTableActionProps {
  filterUserData: (value: string) => void;
  handleRoleToggle: () => void;
  handleBlock: () => void;
  handleUnblock: () => void;
  handleDelete: () => void;
}

const UserTableActions: React.FC<UserTableActionProps> = ({
  filterUserData,
  handleRoleToggle,
  handleBlock,
  handleUnblock,
  handleDelete,
}) => {
  return (
    <section className=" sm:grid-col-1 grid gap-4 md:grid-cols-3 ">
      <div className="flex flex-col gap-2">
        <button
          onClick={handleDelete}
          className="btn btn-error"
          type="button"
          aria-label="Delete Users"
        >
          <FaRegTrashCan />
          <p className="sr-only">Delete</p>
        </button>
        <button
          onClick={handleRoleToggle}
          className="btn btn-outline btn-primary"
          type="button"
          aria-label=" Update User Role"
        >
          Update User Role
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <button
          className="btn btn-outline btn-primary"
          type="button"
          onClick={handleBlock}
          aria-label="Block Users"
        >
          <FaLock />
          Block
        </button>
        <button
          onClick={handleUnblock}
          className="btn btn-outline btn-primary"
          type="button"
          aria-label="Unblock Users"
        >
          <FaLockOpen />
          <p className="sr-only">Unblock</p>
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <select
          name="Filter users"
          className="select select-bordered  w-full"
          onChange={(e) => filterUserData(e.target.value)}
        >
          <option disabled selected>
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
    </section>
  );
};

export default UserTableActions;
