import React from "react";
import { FaRegTrashCan, FaLockOpen, FaLock, FaGears } from "react-icons/fa6";
import { GrUpdate, GrCheckboxSelected, GrUserAdmin } from "react-icons/gr";
import { LiaSortAmountDownSolid } from "react-icons/lia";
import SortUsersData from "./SortUsersData";
import { Users } from "../../utils/types";
import { UpcaseFirstChar } from "../../utils/UpcaseFirstChar";
import { useAuth } from "../../hooks/useAuth";
import SmallSpinner from "../common/SmallSpinner";
import { Tooltip } from "../common/ToolTip";
import UsersCSVBtn from "./UsersCSV";

interface UserTableActionProps {
  filterUserData: (value: string) => void;
  handleAsignAdmin: () => void;
  handleRemoveAdminRole: () => void;
  handleBlock: () => void;
  handleUnblock: () => void;
  handleDelete: () => void;
  selectedUsers: string[];
  users: Users[];
  loading: boolean;
}

const UserTableActions: React.FC<UserTableActionProps> = ({
  filterUserData,
  handleAsignAdmin,
  handleRemoveAdminRole,
  handleBlock,
  handleUnblock,
  handleDelete,
  selectedUsers,
  users,
  loading,
}) => {
  const { auth } = useAuth();
  const blockedUsers = users?.filter((user) => user.blocked === true);
  const adminUsers = users?.filter(
    (user) => user.role === 2 && user.blocked === false
  );

  const userStats = (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:bg-boxdark">
      <div className="space-y-2 text-sm">
        {selectedUsers.length > 0 && (
          <p className="flex items-center gap-1 text-meta-1">
            <GrCheckboxSelected />
            Selected: <span>{selectedUsers?.length}</span>
          </p>
        )}
        <p className="flex items-center gap-1">
          <GrUserAdmin />
          Admin: <span>{adminUsers.length}</span>
        </p>
        <p className="flex items-center gap-1">
          <FaLock />
          Blocked: <span>{blockedUsers.length}</span>
        </p>
        <p className="flex items-center gap-1">
          <LiaSortAmountDownSolid />
          Total Users: <span>{users?.length}</span>
        </p>
      </div>
      {loading && <SmallSpinner />}
    </div>
  );

  return (
    <>
      <div className="mx-auto mb-2 w-full rounded border border-stroke bg-gray py-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
        <div className="space-y-1 px-8 text-lg font-semibold dark:text-neutral-200">
          <h1 className="text-3xl">
            Welcome{" "}
            <span className="text-meta-5">
              {UpcaseFirstChar(auth.user_name)}!
            </span>{" "}
            Dive into the Power of Administration.
          </h1>
          <p className="text-sm text-meta-4 dark:text-whiter">
            Manage and elevate your community with {users?.length} outstanding
            users awaiting your creative touch!
          </p>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 bg-gray p-3 dark:bg-meta-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {userStats}
        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:bg-boxdark">
          <h4 className="mb-2 flex items-center justify-start gap-1 text-xl">
            <span>
              <FaGears />
            </span>
            Table Actions
          </h4>

          <div className="flex flex-wrap items-center justify-start gap-3  text-sm">
            <Tooltip html={<p>Destructive! Delete User/Users</p>}>
              <button
                onClick={handleDelete}
                className="btn btn-primary btn-sm"
                type="button"
                aria-label="Delete Users"
              >
                <FaRegTrashCan />
                <p className="sr-only">Delete</p>
              </button>
            </Tooltip>
            <Tooltip html={<p>Destructive! Block User/Users</p>}>
              <button
                className="btn btn-primary btn-sm"
                type="button"
                onClick={handleBlock}
                aria-label="Block Users"
              >
                <FaLock />
              </button>
            </Tooltip>
            <Tooltip html={<p>Unblock User/Users</p>}>
              <button
                onClick={handleUnblock}
                className="btn btn-primary btn-sm"
                type="button"
                aria-label="Unblock Users"
              >
                <FaLockOpen />
                <p className="sr-only">Unblock</p>
              </button>
            </Tooltip>
            <Tooltip html={<p>Authorized as an Admin to User/Users</p>}>
              <button
                onClick={handleAsignAdmin}
                className="btn btn-primary btn-sm"
                type="button"
                aria-label="Authorized as an Admin"
              >
                <GrUpdate /> Admin
              </button>
            </Tooltip>

            <Tooltip html={<p>Remove Admin Role from User/Users</p>}>
              <button
                onClick={handleRemoveAdminRole}
                className="btn btn-primary btn-sm"
                type="button"
                aria-label="Revoke Admin Role"
              >
                <GrUpdate /> Regular
              </button>
            </Tooltip>
            <Tooltip html={<p>Export User/Users Data as CSV format</p>}>
              <UsersCSVBtn users={users} />
            </Tooltip>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <SortUsersData filterUserData={filterUserData} />
          </div>
        </div>
      </section>
    </>
  );
};

export default UserTableActions;
