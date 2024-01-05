import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { AuthData } from "../utils/types";

interface AuthContextValue {
  auth: AuthData;
  setAuth: Dispatch<SetStateAction<AuthData>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData>(() => {
    const storedAuth = sessionStorage.getItem("mm");
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  useEffect(() => {
    sessionStorage.setItem("mm", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
