import formatCurrency from "@/lib/currencyFormatter";
import { useState } from "react";
import axios from "axios";
import { VscLoading } from "react-icons/vsc";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
type Order = {
  id: string;
  user: {
    name: string;
    email: string;
  };
  total: number;
  table: number | null;
  type: string;
};

export default function OrderRow({
  order,
  index,
  refId,
  setIsOpen,
  now,
}: {
  order: Order;
  index: number;
  refId: any;
  setIsOpen: (value: boolean) => void;
  now: boolean;
}) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
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
    <tr
      key={order.id}
      className="border-b-2 border-orange-100 text-center font-semibold bg-orange-50"
    >
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{order.table}</td>
      <td className="p-2">{order.user.name}</td>
      <td className="p-2">{order.type}</td>
      <td className="p-2">{formatCurrency(order.total)}</td>
      <td className="p-2 flex gap-5 justify-center">
        {order.type !== "SELF_PICKUP" && (
          <button
            className={`bg-primary-orange text-white font-bold p-2 rounded-md ${now ? "" : "hidden"}`}
            onClick={() => setDone(order.id)}
          >
            {loading ? <VscLoading className="animate-spin w-14" /> : "Bayar"}
          </button>
        )}
        <button
          onClick={() => {
            setIsOpen(true), (refId.current = order.id);
          }}
          className="bg-primary-red text-white font-bold p-2 rounded-md"
        >
          Lihat
        </button>
        <button
          className={`bg-green-500 text-white font-bold p-2 rounded-md ${now ? "" : "hidden"}`}
          onClick={() => setDone(order.id)}
        >
          {loading ? <VscLoading className="animate-spin w-14" /> : "Selesai"}
        </button>
      </td>
    </tr>
  );
}
