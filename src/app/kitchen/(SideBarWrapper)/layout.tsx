"use client";
import { ReactNode } from "react";
import { useEffect, useState } from "react";
import Protector from "@/components/Protector";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/context/user-context";

export default function CashierWrapper({ children }: { children: ReactNode }) {
  const { useAuth } = useUser();
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const validateAdmin = async (token: string | null) => {
    try {
      await useAuth("kitchen");
      setLoading(false);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      push("/kitchen/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    validateAdmin(token);
  }, []);

  if (loading) {
    return <Protector />;
  }
  return <section className="min-h-screen">{children}</section>;
}
