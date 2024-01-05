import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuthentication from "../hooks/useAuthentication";

interface PrivateRouteProps {
  children: ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAdmin, isLoading } = useAuthentication();

  if (isLoading) return <p>loading</p>;
  if (isAdmin) return children;
  return <Navigate state={{ from: location }} to="/sign-in" replace />;
};

export default PrivateRoute;
