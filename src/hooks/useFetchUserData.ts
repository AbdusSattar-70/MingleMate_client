import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";
import { API_ENDPOINT } from "../utils/constant";
import { setErrorToast } from "../utils/apiResponse";
import { Users } from "../utils/types";
interface GetUsersParams {
  role?: number;
  blocked?: boolean;
}

const useGetUserData = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const getUsers = async ({ role, blocked }: GetUsersParams = {}) => {
    try {
      const params: GetUsersParams = {};

      if (role !== undefined) params.role = role;
      if (blocked !== undefined) params.blocked = blocked;

      const response = await axiosPrivate.get(API_ENDPOINT.ADMIN.USERS, {
        params: params,
      });
      setUsers(response.data);
    } catch (err) {
      setErrorToast(err);
      navigate("/sign-in", { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { users, getUsers };
};

export default useGetUserData;
