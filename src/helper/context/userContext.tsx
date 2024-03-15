"use client";
import { createContext, useState, useContext } from "react";

type User = {
  name: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
};

type userContextProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const userContext = createContext<userContextProps | null>(null);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
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
