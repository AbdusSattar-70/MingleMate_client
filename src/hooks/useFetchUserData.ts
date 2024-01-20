import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { API_ENDPOINT } from "../utils/constant";
import isSuccessRes, { setErrorToast } from "../utils/apiResponse";
import { Users } from "../utils/types";
interface GetUsersParams {
  role?: number;
  blocked?: boolean;
}

const useGetUserData = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const getUsers = async ({ role, blocked }: GetUsersParams = {}) => {
    try {
      const params: GetUsersParams = {};

      if (role !== undefined) params.role = role;
      if (blocked !== undefined) params.blocked = blocked;
      setLoading(true);
      const response = await axiosPrivate.get(API_ENDPOINT.ADMIN.USERS, {
        params: params,
      });

      if (isSuccessRes(response)) {
        setUsers(response.data);
        setLoading(false);
      }
    } catch (err) {
      setErrorToast(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { users, getUsers, loading };
};

export default useGetUserData;
