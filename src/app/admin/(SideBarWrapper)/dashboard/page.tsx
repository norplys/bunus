"use client";
import { useOrderAdmin } from "@/helper/hooks/useOrderAdmin";
import OrderTable from "@/components/admin/dashboard/OrderTable";
import Image from "next/image";
import OrderDetailModal from "@/components/admin/dashboard/OrderDetailModal";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { useQueryClient } from "react-query";

const socket = io("https://bunus-be-production.up.railway.app/");
export default function Dashboard() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const id = useRef(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    socket.on("order", () => {
      queryClient.invalidateQueries(["orderAdmin", token]);
    });
  }, [socket]);
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const { data, isLoading } = useOrderAdmin(token!);
  return (
    <div className="flex-1 w-full pl-72">
      <OrderDetailModal setIsOpen={setIsOpen} isOpen={isOpen} refId={id} />
      <h1 className="w-full bg-primary-orange p-2 flex justify-end items-center">
        <p className="text-white text-lg font-bold">Dashboard</p>
      </h1>
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
