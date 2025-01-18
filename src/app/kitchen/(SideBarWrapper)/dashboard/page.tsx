"use client";
import { useOrderKitchen } from "@/lib/hooks/query/use-order-kitchen";
import KitchenModal from "@/components/kitchen/KitchenModal";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { useQueryClient } from "react-query";
import OrderKitchen from "@/components/kitchen/OrderKitchen";
import { useUser } from "@/lib/context/user-context";

const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/`);
export default function Kitchen() {
  const { token } = useUser();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const id = useRef(null);
  useEffect(() => {
    socket.on("payment", () => {
      queryClient.invalidateQueries(["orderKitchen"]);
    });
  }, [socket]);
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
        isLoading={isLoading}
      />
    </div>
  );
}
