import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuthentication from "../hooks/useAuthentication";
import Spinner from "../components/common/Spinner";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../utils/constant";

interface PrivateRouteProps {
  children: ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const { auth } = useAuth();
  const { verifyAdminStatus, isLoading } = useAuthentication();

  useEffect(() => {
    verifyAdminStatus();
  }, []);

  if (isLoading) return <Spinner />;

  if (auth.role === 2) return children;

  return <Navigate state={{ from: location }} to={ROUTES.HOME} replace />;
};

export default PrivateRoute;
