import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { UserProfile } from "@mansi-manhas/user-profile-ui";
import { mockUser } from "../data/mockUser";

interface AuthContextValue {
  isAuthenticated: boolean;
  user: UserProfile;
  login: (email: string) => Promise<void>;
  logout: () => void;
  updateUser: (patch: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "demo-dashboard:authenticated";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === "true",
  );
  const [user, setUser] = useState<UserProfile>(mockUser);

  const login = useCallback(async (email: string) => {
    // Demo only: no real backend, just simulate a network round-trip.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser((prev) => ({ ...prev, email }));
    sessionStorage.setItem(STORAGE_KEY, "true");
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((patch: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...patch }));
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, user, login, logout, updateUser }),
    [isAuthenticated, user, login, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
