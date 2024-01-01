import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface AuthData {
  isAuthenticated?: boolean;
  blocked?: boolean;
  id?: number;
  authorization?: string;
  role?: number;
}

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
  const [auth, setAuth] = useState<AuthData>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
