import { useState, useEffect } from "react";
import UserTableActions from "./UserTableActions";
import { toast } from "react-toastify";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useGetUserData from "../../hooks/useFetchUserData";
import {
  API_ENDPOINT,
  DASHBOARD_TABLE_CONST,
  FILTER_USERS,
  INITIAL_AUTH_STATE,
  ROUTES,
} from "../../utils/constant";
import useAuthentication from "../../hooks/useAuthentication";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { users, getUsers, loading } = useGetUserData();
  const { isActive, isAdmin, checkAuth } = useAuthentication();

  useEffect(() => {
    getUsers();
  }, []);

  const verifyAdmin = async () => {
    await checkAuth();
    console.log("isAdmin", isAdmin, "isActive", isActive);
    if (!isAdmin || !isActive) {
      setAuth(INITIAL_AUTH_STATE);
      navigate(ROUTES.HOME);
    }
  };

  const filterUserData = async (value: string) => {
    const filterOptions = FILTER_USERS[value];
    if (filterOptions) {
      await getUsers(filterOptions);
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
        await getUsers();
        await verifyAdmin();
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
      await getUsers();
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
      await getUsers();
      await verifyAdmin();
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

        await getUsers();
        await verifyAdmin();
        setSelectedUsers([]);
        toast.success(DASHBOARD_TABLE_CONST.DELETE.SUCCESS);
      }
    } catch (error) {
      toast.error(DASHBOARD_TABLE_CONST.DELETE.ERROR);
    }
  };

  return (
    <section className=" bg-white  dark:border-strokedark dark:bg-boxdark">
      <div className="space-y-4 font-sans antialiased">
        <div>
          <UserTableActions
            filterUserData={filterUserData}
            handleRoleToggle={handleRoleToggle}
            handleBlock={handleBlock}
            handleUnblock={handleUnblock}
            handleDelete={handleDelete}
            selectedUsers={selectedUsers}
            users={users}
            loading={loading}
          />
        </div>
        <div className="relative max-h-screen overflow-x-auto shadow-md sm:rounded-lg">
          <table className=" w-full text-left text-sm rtl:text-right">
            <UserTableHeader
              selectAll={selectAll}
              handleCheckboxChange={handleCheckboxChange}
            />

            <tbody>
              {users?.length > 0 ? (
                users?.map((user) => (
                  <UserTableRow
                    key={user.email}
                    user={user}
                    selectedUsers={selectedUsers}
                    selectAll={selectAll}
                    handleCheckboxChange={() =>
                      handleCheckboxChange(user.email)
                    }
                  />
                ))
              ) : (
                <tr>
                  <td>No User to Display</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UserTable;
