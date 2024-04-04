"use client";
import { useOrderAdmin } from "@/helper/hooks/useOrderAdmin";
import OrderTable from "@/components/admin/dashboard/OrderTable";
import Image from "next/image";
import OrderDetailModal from "@/components/admin/dashboard/OrderDetailModal";
import { useState, useRef } from "react";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const id = useRef(null);
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const { data, isLoading } = useOrderAdmin(token!);
  return (
    <div className="flex-1 w-full pl-72">
      <OrderDetailModal setIsOpen={setIsOpen} isOpen={isOpen} refId={id} />
      <nav className="w-full bg-primary-orange p-2 flex justify-end items-center">
        <p className="text-white text-lg font-bold">Dashboard</p>
      </nav>
      <div className="flex gap-10 p-2 justify-center shadow-xl h-16 items-center">
        <p className="font-bold text-lg">Sedang Disiapkan</p>
        <p className="font-bold text-lg">Selesai</p>
      </div>
      <section className="flex justify-center items-center w-full">
        {isLoading ? (
          <Image
            width={200}
            height={200}
            alt="loading"
            src="/loadingAnimation.gif"
          />
        ) : (
          <OrderTable
            data={data}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            refId={id}
          />
        )}
      </section>
    </div>
  );
}
