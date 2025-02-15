"use client";
import { ReactNode } from "react";
import { useEffect, useState } from "react";
import Protector from "@/components/protector";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/context/user-context";
import OrderReceipt from "@/components/merchant/order-receipt";

export default function AdminWrapper({ children }: { children: ReactNode }) {
  const { push } = useRouter();
  const { useAuth } = useUser();
  const [loading, setLoading] = useState(true);
  const validateAdmin = async () => {
    try {
      await useAuth("merchant");
      setLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      push("/merchant/login");
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
      <OrderReceipt />
      {children}
    </section>
  );
}
