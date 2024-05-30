"use client";
import Link from "next/link";
import SideKitchen from "@/components/kitchen/SideKitchen";
import LoginKitchen from "@/components/kitchen/LoginKitchen";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/helper/context/userContext";
import Protector from "@/components/Protector";

export default function KitchenLogin() {
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const { useAuth } = useUser();
  const validateJWT = async () => {
    try {
      await useAuth("kitchen");
      push("/kitchen/dashboard");
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    validateJWT();
  }, []);
  if (loading) {
    return <Protector />;
  }
  return (
    <section className="flex h-screen items-center justify-center md:flex-col xl:flex-row overflow-hidden">
      <div className="flex-1  bg-white flex justify-center items-center flex-col gap-5 xl:min-h-screen md:p-5 p-2">
        <h1 className="xl:text-5xl text-4xl font-extrabold border-b-2 border-b-primary-orange pb-2">
          Selamat Datang !
        </h1>
        <LoginKitchen />
        <p>
          Bukan Kitchen ?{" "}
          <Link
            href={"/login"}
            className="font-bold  hover:text-blue-500 duration-300"
          >
            Klik Disini
          </Link>
        </p>
      </div>
      <SideKitchen />
    </section>
  );
}
