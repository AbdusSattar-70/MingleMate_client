import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuthentication from "../hooks/useAuthentication";
import Spinner from "../components/common/Spinner";

interface PrivateRouteProps {
  children: ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAdmin, isLoading } = useAuthentication();

  if (isLoading) return <Spinner />;

  if (isAdmin == undefined || isAdmin == null) {
    return <Navigate state={{ from: location }} to="/sign-in" replace />;
  }

  if (isAdmin) return children;
};

export default PrivateRoute;
