import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { VscLoading } from "react-icons/vsc";
import OrderDetailItem from "./OrderDetailItem";
import { getSockets } from "@/helper/socket";

export default function OrderItem({
  data,
  setIsOpen,
  now,
  setIsPayment,
}: {
  data: any;
  setIsOpen: (value: boolean) => void;
  now: boolean;
  setIsPayment: (value: boolean) => void;
}) {
  const socket = getSockets();
  const handleReceipt = (data: any) => {
    socket.emit("orderReceipt", data);
  };
  const handleConnect = async () => {
    console.log("connect");
    navigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
      })
      .then((device) => {
        console.log(device);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [isLoading, setLoading] = useState(false);
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
      await queryClient.invalidateQueries(["orderCashier"]);
      await queryClient.invalidateQueries(["orderFinish"]);
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-primary-orange text-white p-2 w-full text-center">
        <p className="font-bold text-lg">{data.table || data.user.name}</p>
      </div>
      <div className="w-full font-bold text-lg pl-2 py-5">
        <p>Tipe : {data.type}</p>
      </div>
      <div className="bg-primary-orange text-white p-2 rounded-md w-full text-center">
        <p className="font-bold text-lg">Barang</p>
      </div>
      <OrderDetailItem data={data} />

      <div className="flex gap-5 pt-5 flex-wrap justify-center">
        {data.payment.status === "cashierPending" && (
          <button
            onClick={() => setIsPayment(true)}
            className={`bg-orange-400 text-white font-bold p-2 rounded-md ${!now && "hidden"}`}
          >
            {isLoading ? <VscLoading className="animate-spin w-14" /> : "Bayar"}
          </button>
        )}
        <button
          className="bg-primary-cyan px-2 py-1 rounded-lg text-white font-bold"
          onClick={() => handleReceipt(data)}
        >
          Tampilkan
        </button>

        <button
          onClick={() => setDone(data.id)}
          className={`bg-green-500 text-white font-bold p-2 rounded-md ${(!now || data.payment.status !== "settlement") && "hidden"}`}
        >
          {isLoading ? <VscLoading className="animate-spin w-14" /> : "Selesai"}
        </button>

        <button
          onClick={() => setIsOpen(false)}
          className="bg-primary-red text-white font-bold p-2 rounded-md"
        >
          Tutup
        </button>
        <button
          className="bg-green-600 px-2 py-1 rounded-lg text-white font-bold"
          onClick={() => handleReceipt(data)}
        >
          Print
        </button>
        <button
          className="bg-green-600 px-2 py-1 rounded-lg text-white font-bold"
          onClick={() => handleConnect()}
        >
          Connect
        </button>
      </div>
    </>
  );
}
