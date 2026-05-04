import React, {
  type ReactNode,
  createContext,
  useState,
  useContext,
} from "react";

interface User {
  name: string;
  role: "customer" | "manager" | "guest";
}

interface AuthContextType {
  user: User | null;
  upgradeToManager: () => void;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string) => setUser({ name, role: "customer" });
  const logout = () => setUser(null);

  const upgradeToManager = () => {
    if (user) {
      setUser({ ...user, role: "manager" });
    }
  };

  return (
    <AuthContext.Provider value={{ user, upgradeToManager, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
