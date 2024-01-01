import { useState, useEffect } from "react";
import UserTableActions from "./UserTableActions";
import UserTable from "./UserTable";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAuth } from "../../../hooks/useAuth";
import useGetUserData from "../../../hooks/useFetchUserData";

const Users = () => {
  const ALL_USER_ID = "all";
  const USER_BLOCK_URL = "/admin/block";
  const USER_UNBLOCK_URL = "/admin/active";
  const USER_DELETE_URL = "/admin/delete";
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const { users, getUsers } = useGetUserData();

  useEffect(() => {
    getUsers();
  }, []);

  const handleCheckboxChange = (userId) => {
    setSelectAll((prevSelectAll) => {
      if (userId === ALL_USER_ID) {
        setSelectedUsers(prevSelectAll ? [] : users.map((user) => user._id));
        return !prevSelectAll;
      } else {
        setSelectedUsers((prevSelectedUsers) => {
          if (prevSelectedUsers.includes(userId)) {
            return prevSelectedUsers.filter((id) => id !== userId);
          } else {
            return [...prevSelectedUsers, userId];
          }
        });
        return false;
      }
    });
  };

  const verifyAdminStatus = () => {
    const admin = selectedUsers.includes(auth.id);
    if (admin) {
      setAuth({});
    }
  };

  const handleBlock = async () => {
    try {
      if (selectedUsers.length === 0) {
        toast.error("Please select at least one user to block.");
        return;
      }

      const confirmResult = window.confirm(
        "Are you sure you want to block selected users?"
      );
      if (confirmResult) {
        await axiosPrivate.patch(USER_BLOCK_URL, { userIds: selectedUsers });
        getUsers();
        verifyAdminStatus();
        setSelectedUsers([]);
        toast.success("Users blocked successfully.");
      }
    } catch (error) {
      toast.error("Error blocking users. Please try again.");
    }
  };

  const handleUnblock = async () => {
    try {
      if (selectedUsers.length === 0) {
        toast.error("Please select at least one user to unblock.");
        return;
      }

      await axiosPrivate.patch(USER_UNBLOCK_URL, { userIds: selectedUsers });
      getUsers();
      setSelectedUsers([]);
      toast.success("Users unblocked successfully.");
    } catch (error) {
      toast.error("Error unblocking users. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedUsers.length === 0) {
        toast.error("Please select at least one user to delete.");
        return;
      }

      const confirmResult = window.confirm(
        "Are you sure you want to delete selected users?"
      );
      if (confirmResult) {
        await axiosPrivate.delete(USER_DELETE_URL, {
          data: { userIds: selectedUsers },
        });

        getUsers();
        verifyAdminStatus();
        setSelectedUsers([]);
        toast.success("Users deleted successfully.");
      }
    } catch (error) {
      toast.error("Error deleting users. Please try again.");
    }
  };

  return (
    <section className="space-y-4">
      {users?.length ? (
        <section className="space-y-4 font-sans antialiased">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <UserTableActions
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
            <UserTable
              users={users}
              selectedUsers={selectedUsers}
              handleCheckboxChange={handleCheckboxChange}
              selectAll={selectAll}
              ALL_USER_ID={ALL_USER_ID}
            />
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

export default Users;
