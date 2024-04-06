"use client";
import { ReactNode } from "react";
import SideBarAdmin from "@/components/admin/SideBarAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import Protector from "@/components/Protector";
import { useRouter } from "next/navigation";

export default function AdminWrapper({ children }: { children: ReactNode }) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const validateAdmin = async (token: string | null) => {
    try {
      await axios.get(
        "https://bunus-be-production.up.railway.app/v1/validate/admin",
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
      push("/admin/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    validateAdmin(token);
  }, []);

  if (loading) {
    return <Protector />;
  }
  return (
    <section className="min-h-screen">
      <SideBarAdmin />
      {children}
    </section>
  );
}
