import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/sign-in" replace />;
};

export default PrivateRoute;
