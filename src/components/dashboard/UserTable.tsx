import { useState, useEffect } from "react";
import UserTableActions from "./UserTableActions";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useGetUserData from "../../hooks/useFetchUserData";
import {
  API_ENDPOINT,
  DASHBOARD_TABLE_CONST,
  FILTERS,
} from "../../utils/constant";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";

const UserTable = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { users, getUsers } = useGetUserData();
  useEffect(() => {
    getUsers();
  }, []);

  const filterUserData = (value: string) => {
    const filterOptions = FILTERS[value];
    if (filterOptions) {
      getUsers(filterOptions);
    }
  };

  const toggleSelectAll = (prevSelectAll: boolean) => {
    setSelectedUsers(prevSelectAll ? [] : users.map((user) => user.email));
    return !prevSelectAll;
  };

  const toggleSelectsingle = (userEmail: string) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userEmail)) {
        return prevSelectedUsers.filter((email) => email !== userEmail);
      } else {
        return [...prevSelectedUsers, userEmail];
      }
    });
    return false;
  };

  const handleCheckboxChange = (userEmail: string) => {
    setSelectAll((prevSelectAll) => {
      if (userEmail === DASHBOARD_TABLE_CONST.ALL_USER) {
        return toggleSelectAll(prevSelectAll);
      } else {
        return toggleSelectsingle(userEmail);
      }
    });
  };

  const handleBlock = async () => {
    try {
      if (selectedUsers.length === 0) {
        toast.error(DASHBOARD_TABLE_CONST.BLOCK.SELECT_USER);
        return;
      }

      const confirmResult = window.confirm(DASHBOARD_TABLE_CONST.BLOCK.CONFIRM);
      if (confirmResult) {
        await axiosPrivate.patch(API_ENDPOINT.ADMIN.BLOCK_URL, {
          user_emails: selectedUsers,
        });
        getUsers();
        setSelectedUsers([]);
        toast.success(DASHBOARD_TABLE_CONST.BLOCK.SUCCESS);
      }
    } catch (error) {
      toast.error(DASHBOARD_TABLE_CONST.BLOCK.ERROR);
    }
  };

  const handleUnblock = async () => {
    try {
      if (selectedUsers.length === 0) {
        toast.error(DASHBOARD_TABLE_CONST.UNBLOCK.SELECT_USER);
        return;
      }

      await axiosPrivate.patch(API_ENDPOINT.ADMIN.UNBLOCK_URL, {
        user_emails: selectedUsers,
      });
      getUsers();
      setSelectedUsers([]);
      toast.success(DASHBOARD_TABLE_CONST.UNBLOCK.SUCCESS);
    } catch (error) {
      toast.error(DASHBOARD_TABLE_CONST.UNBLOCK.ERROR);
    }
  };

  const handleRoleToggle = async () => {
    try {
      if (selectedUsers.length === 0) {
        toast.error(DASHBOARD_TABLE_CONST.ROLE.SELECT_USER);
        return;
      }

      await axiosPrivate.patch(API_ENDPOINT.ADMIN.ROLE_TOGGLE_URL, {
        user_emails: selectedUsers,
      });
      getUsers();
      setSelectedUsers([]);
      toast.success(DASHBOARD_TABLE_CONST.ROLE.SUCCESS);
    } catch (error) {
      toast.error(DASHBOARD_TABLE_CONST.ROLE.ERROR);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedUsers.length === 0) {
        toast.error(DASHBOARD_TABLE_CONST.DELETE.SELECT_USER);
        return;
      }

      const confirmResult = window.confirm(
        DASHBOARD_TABLE_CONST.DELETE.CONFIRM
      );
      if (confirmResult) {
        await axiosPrivate.delete(API_ENDPOINT.ADMIN.DELETE_URL, {
          data: { user_emails: selectedUsers },
        });

        getUsers();
        setSelectedUsers([]);
        toast.success(DASHBOARD_TABLE_CONST.DELETE.SUCCESS);
      }
    } catch (error) {
      toast.error(DASHBOARD_TABLE_CONST.DELETE.ERROR);
    }
  };

  return (
    <section className="space-y-4">
      {users?.length ? (
        <section className="space-y-4 font-sans antialiased">
          <div>
            <UserTableActions
              filterUserData={filterUserData}
              handleRoleToggle={handleRoleToggle}
              handleBlock={handleBlock}
              handleUnblock={handleUnblock}
              handleDelete={handleDelete}
            />
            {selectedUsers.length > 0 && (
              <p className="text-center text-xl uppercase text-blue-500">
                Selected: {selectedUsers.length}
              </p>
            )}
          </div>
          <div className="relative max-h-screen overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-blue-100 rtl:text-right dark:text-blue-100">
              <UserTableHeader
                selectAll={selectAll}
                handleCheckboxChange={handleCheckboxChange}
              />
              <tbody>
                {users.map((user) => (
                  <UserTableRow
                    key={user.email}
                    user={user}
                    selectedUsers={selectedUsers}
                    selectAll={selectAll}
                    handleCheckboxChange={() =>
                      handleCheckboxChange(user.email)
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <p>No users to display</p>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
      />
    </section>
  );
};

export default UserTable;
