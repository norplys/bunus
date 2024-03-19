"use client";
import { ReactNode, useState, useEffect } from "react";
import Protector from "@/components/Protector";
import { useRouter } from "next/navigation";
import { useUser } from "@/helper/context/userContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { setToken } = useUser();
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const validateToken = async (token: string | null) => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      setToken(token);
      setLoading(false);
    } catch (error) {
      setToken(null);
      push("/login?redirect=cart");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    validateToken(token);
  }, []);
  if (loading) {
    return <Protector />;
  }
  return <section>{children}</section>;
}
