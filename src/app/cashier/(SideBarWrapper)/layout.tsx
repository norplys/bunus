"use client";
import { ReactNode } from "react";
import SideBarCashier from "@/components/cashier/SideBarCashier";
import { useEffect, useState } from "react";
import Protector from "@/components/Protector";
import { useRouter } from "next/navigation";
import { useUser } from "@/helper/context/userContext";

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
  return (
    <section className="min-h-screen">
      <SideBarCashier />
      {children}
    </section>
  );
}
