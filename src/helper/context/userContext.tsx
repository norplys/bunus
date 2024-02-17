"use client";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

type User = {
  name: string;
  email: string;
  role: string;
  token: string;
};

type userContextProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const userContext = createContext<userContextProps | null>(null);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          "https://bunus-be-production.up.railway.app/v1/get-me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUser(response.data.data);
      }
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchUser();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
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
