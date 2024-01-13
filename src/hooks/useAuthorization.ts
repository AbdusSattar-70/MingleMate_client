import { useAuth } from "../hooks/useAuth";
import useAuthentication from "./useAuthentication";

interface AuthorizationHook {
  canManageAll: () => boolean;
}

const useAuthorization = (): AuthorizationHook => {
  const { auth } = useAuth();
  const { isAdmin } = useAuthentication();

  const canManageAll = (): boolean => {
    return !!auth.authToken || isAdmin;
  };

  return { canManageAll };
};

export default useAuthorization;
