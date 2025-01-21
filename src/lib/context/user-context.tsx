"use client";
import { createContext, useState, useContext } from "react";
import axios from "axios";
import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/env";

type User = {
  name: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
};

type userContextProps = {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  useAuth: (type: string | null) => Promise<void>;
  setToken: (token: string | null) => void;
};

const userContext = createContext<userContextProps | null>(null);

export function UserProvider({ children }: any) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const useAuth = async (type: string | null) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          `${NEXT_PUBLIC_BACKEND_URL}/v1/${type ? `validate/${type}` : "get-me"}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setToken(token);
        localStorage.setItem("token", token);
        setUser(response.data.data);
      } else {
        throw new Error("Token not found");
      }
    } catch (error) {
      setToken(null);
      localStorage.removeItem("token");
      setUser(null);
      throw error;
    }
  };

  return (
    <userContext.Provider value={{ user, setUser, useAuth, token, setToken }}>
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
