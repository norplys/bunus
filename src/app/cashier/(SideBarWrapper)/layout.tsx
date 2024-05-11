"use client";
import { ReactNode } from "react";
import SideBarCashier from "@/components/cashier/SideBarCashier";
import { useEffect, useState } from "react";
import axios from "axios";
import Protector from "@/components/Protector";
import { useRouter } from "next/navigation";

export default function CashierWrapper({ children }: { children: ReactNode }) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const validateAdmin = async (token: string | null) => {
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/validate/admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      push("/cashier/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    validateAdmin(token);
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
