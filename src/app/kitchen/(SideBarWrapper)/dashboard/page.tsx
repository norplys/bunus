"use client";
import { useOrderKitchen } from "@/helper/hooks/useOrderKitchen";
import { useOrderFinish } from "@/helper/hooks/useOrderFinish";
import KitchenModal from "@/components/kitchen/KitchenModal";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { useQueryClient } from "react-query";
import OrderKitchen from "@/components/kitchen/OrderKitchen";

const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/`);
export default function Kitchen() {
  const queryClient = useQueryClient();
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const id = useRef(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    socket.on("payment", () => {
      queryClient.invalidateQueries(["orderKitchen", token]);
    });
  }, [socket]);
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const { data: finishData, isLoading: finishLoading } = useOrderFinish(
    date.toISOString().split("T")[0],
  );
  const { data, isLoading } = useOrderKitchen(token!);
  return (
    <div className="flex-1 w-full md:pl-72">
      <KitchenModal setIsOpen={setIsOpen} isOpen={isOpen} refId={id} />
      <h1 className="w-full bg-primary-orange p-2 flex justify-end items-center">
        <p className="text-white text-lg font-bold">Kitchen</p>
      </h1>
      <div className="flex gap-10 p-2 justify-center shadow-xl h-16 items-center">
        <h1 className={`font-bold text-lg`}>Sedang Disiapkan</h1>
      </div>
      <OrderKitchen
        data={data}
        setIsOpen={setIsOpen}
        refId={id}
        isLoading={isLoading || finishLoading}
      />
    </div>
  );
}
