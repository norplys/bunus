"use client";
import { ReactNode, useState, useEffect } from "react";
import Protector from "@/components/protector";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/context/user-context";

export default function Layout({ children }: { children: ReactNode }) {
  const { useAuth } = useUser();
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);

  const validateUser = async () => {
    try {
      await useAuth(null);
      push("/");
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  if (loading) {
    return <Protector />;
  }
  return <section>{children}</section>;
}
