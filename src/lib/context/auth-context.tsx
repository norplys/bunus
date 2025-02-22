"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ApplicationError } from "../fetcher";
import { useLocalStorage } from "../hooks/use-local-storage";
import { NEXT_PUBLIC_BACKEND_URL } from "../env";
import { UserWithToken } from "../types/schema";
import { APIResponse } from "../types/api";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: UserWithToken | null;
  token: string | null;
  loading: boolean;
  handleLogin: (email: string, password: string) => Promise<string | null>;
  handleLogout: () => void;
  handleUpdateUser: (newUser: UserWithToken) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<UserWithToken | null>(null);
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      setLoading(true);

      const localToken = localStorage.getItem("token");

      const existToken = localToken ?? token;

      if (!existToken) {
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/me`, {
          headers: { Authorization: `Bearer ${existToken}` },
          credentials: "include",
        });

        const data = (await response.json()) as APIResponse<UserWithToken>;

        if (!response.ok)
          throw new Error(data.message ?? "Failed to fetch user");

        setUser(data.data);
        setLoading(false);

        if (localToken) {
          setToken(existToken);
        }
      } catch (err) {
        if (err instanceof Error) console.error(err.message);

        setUser(null);
        setToken(null);
        setLoading(false);
      }
    };

    void fetchUser();
  }, [token, setToken]);

  const handleUpdateUser = (newUser: UserWithToken): void => {
    setUser(newUser);
  };

  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<string | null> => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as APIResponse<UserWithToken>;

      const invalidCredentials =
        response.status === 401 || response.status === 404;

      if (!response.ok) {
        if (invalidCredentials) {
          throw new ApplicationError(
            "Invalid email or password",
            response.status,
          );
        }

        throw new Error(data.message);
      }

      setUser(data.data);
      setToken(data.data.token);

      return null;
    } catch (err) {
      if (err instanceof ApplicationError) return err.message;

      return "Internal server error";
    }
  };

  const handleLogout = (): void => {
    router.replace("/");

    setUser(null);
    setToken(null);
  };

  const contextValue = {
    user,
    token,
    loading,
    handleLogin,
    handleLogout,
    handleUpdateUser,
  } as AuthContextType;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
