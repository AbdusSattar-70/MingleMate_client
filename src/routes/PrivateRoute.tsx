import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import useAuthentication from "../hooks/useAuthentication";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isAuthenticated, isActive, isAdmin] = useAuthentication();

  const location = useLocation();

  if (isAuthenticated && isActive && isAdmin) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/sign-in" replace />;
};

export default PrivateRoute;
