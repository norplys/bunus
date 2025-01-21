"use client";
import { ReactNode } from "react";
import { useEffect, useState } from "react";
import Protector from "@/components/protector";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/context/user-context";

export default function CashierWrapper({ children }: { children: ReactNode }) {
  const { useAuth } = useUser();
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const validateAdmin = async () => {
    try {
      await useAuth("admin");
      setLoading(false);
    } catch (error) {
      push("/cashier/login");
    }
  };

  useEffect(() => {
    validateAdmin();
  }, []);

  if (loading) {
    return <Protector />;
  }
  return <section className="min-h-screen">{children}</section>;
}
