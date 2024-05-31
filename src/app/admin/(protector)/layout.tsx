"use client";
import { ReactNode } from "react";
import { useEffect, useState } from "react";
import Protector from "@/components/Protector";
import { useRouter } from "next/navigation";
import { useUser } from "@/helper/context/userContext";
import SideBarAdmin from "@/components/admin/SideBarAdmin";

export default function SideBarWrapper({ children }: { children: ReactNode }) {
  const { useAuth } = useUser();
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const validateAdmin = async (token: string | null) => {
    try {
      await useAuth("admin");
      setLoading(false);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      push("/admin/login");
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
    <>
      <SideBarAdmin />
      <section className="min-h-screen md:pl-72">{children}</section>
    </>
  );
}
