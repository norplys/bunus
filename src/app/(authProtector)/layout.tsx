"use client";
import { ReactNode, useState, useEffect } from "react";
import Protector from "@/components/Protector";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@/helper/context/userContext";
import { set } from "react-hook-form";

export default function Layout({ children }: { children: ReactNode }) {
  const { setUser } = useUser();
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const validateToken = async (token: string | null) => {
    try {
      if (token) {
        const res = await axios.get(
          "https://bunus-be-production.up.railway.app/v1/get-me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUser(res.data);
        setLoading(false);
        push("/");
      }
      setLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
      setLoading(false);
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
