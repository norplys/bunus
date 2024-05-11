import formatCurrency from "@/helper/currencyFormatter";
import { useState } from "react";
import axios from "axios";
import { VscLoading } from "react-icons/vsc";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

export default function OrderMobile({
  data,
  setIsOpen,
  isLoading,
  refId,
  now,
}: {
  data: any;
  isLoading: boolean;
  setIsOpen: (value: boolean) => void;
  refId: any;
  now: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const setDone = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/orders/${id}`,
        {
          isDone: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      await toast.promise(res, {
        loading: "Loading...",
        success: "Order Selesai",
        error: "Gagal menyelesaikan order",
      });
      await queryClient.invalidateQueries(["orderAdmin", token]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col md:hidden">
      {isLoading
        ? "loading"
        : data.map((order: any, index: number) => (
            <div
              className={`justify-between items-center p-2 h-48 border-b-2 border-orange-600 grid grid-cols-3 grid-rows-2 ${index === 0 && "border-t-2"}`}
              onClick={() => {
                setIsOpen(true);
                refId.current = order.id;
              }}
            >
              <p className="rounded-full border text-center py-1 px-3 text-xl font-bold bg-primary-orange text-white w-fit">
                {index + 1}
              </p>
              <p className="col-start-2 col-span-2 text-end font-bold text-lg ">
                {order.type}
              </p>
              <p className="text-lg font-bold">MEJA : {order.table || "-"}</p>
              <p className="text-lg font-bold col-span-2 text-end">
                {formatCurrency(order.total)}
              </p>
            </div>
          ))}
    </div>
  );
}
