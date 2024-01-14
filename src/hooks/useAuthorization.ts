import { useAuth } from "../hooks/useAuth";
import useAuthentication from "./useAuthentication";

interface AuthorizationHook {
  canManageAll: (authorId: string) => boolean;
}

const useAuthorization = (): AuthorizationHook => {
  const { auth } = useAuth();
  const { isAdmin } = useAuthentication();

  const canManageAll = (authorId: string): boolean => {
    const isAuthor = authorId === auth.id;
    if (isAdmin) return true;
    if (isAuthor) return true;
    return false;
  };

  return { canManageAll };
};

export default useAuthorization;
