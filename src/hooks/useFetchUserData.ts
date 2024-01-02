import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";
import { API_ENDPOINT } from "../utils/constant";
import { setErrorToast } from "../utils/apiResponse";
import { Users } from "../utils/types";

const useGetUserData = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get(API_ENDPOINT.USERS);
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
