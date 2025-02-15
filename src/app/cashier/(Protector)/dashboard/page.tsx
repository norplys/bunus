"use client";
import { useOrderCashier } from "@/lib/hooks/query/use-order-cashier";
import { useOrderFinish } from "@/lib/hooks/query/use-order-finish";
import OrderTable from "@/components/cashier/dashboard/order-table";
import OrderDetailModal from "@/components/cashier/dashboard/order-detail-modal";
import { useState, useRef, useEffect, use } from "react";
import { getSockets } from "@/lib/socket";
import { useQueryClient } from "react-query";
import OrderMobile from "@/components/cashier/dashboard/order-mobile";
import { useUser } from "@/lib/context/user-context";
import { FaPrint } from "react-icons/fa";
import { handleConnect } from "@/lib/printer";

export default function CashierDahboard() {
  const queryClient = useQueryClient();

  const [now, setNow] = useState(true);

  const [date, setDate] = useState(new Date());

  const [isOpen, setIsOpen] = useState(false);

  const id = useRef(null);

  const deviceCharacteristic = useRef<any>();

  const [deviceHandle, setDeviceHandle] = useState(null);

  const { token } = useUser();

  const socket = getSockets();

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("order", () => {
      queryClient.invalidateQueries(["orderCashier"]);
    });
  }, [socket]);

  const { data: finishData, isLoading: finishLoading } = useOrderFinish(
    date.toISOString().split("T")[0],
  );

  const { data, isLoading } = useOrderCashier(token!);

  const finishOrderData = finishData?.data;

  const cashierOrderData = data?.data;

  return (
    <div className="flex-1 w-full">
      <OrderDetailModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        refId={id}
        now={now}
        characteristic={deviceCharacteristic}
        deviceHandle={deviceHandle}
      />
      <h1 className="w-full bg-primary-orange p-2 flex justify-end items-center">
        <p className="text-white text-lg font-bold">Order</p>
      </h1>
      <div className="flex gap-10 p-2 justify-center shadow-xl h-16 items-center">
        <button
          className={`font-bold text-lg ${now && "border-b-2 border-black"}`}
          onClick={() => setNow(true)}
        >
          Sedang Disiapkan
        </button>
        <button
          className={`font-bold text-lg ${!now && "border-b-2 border-black"}`}
          onClick={() => setNow(false)}
        >
          Selesai
        </button>
      </div>
      {!now && (
        <div className="flex justify-center items-center gap-5 p-2">
          <p className="text-lg font-bold">Tanggal :</p>
          <input
            type="date"
            className="onFocus:outline-none border-b-2 border-primary-orange p-1 w-40 text-lg font-bold bg-transparent"
            value={date.toISOString().split("T")[0]}
            onChange={(e) =>
              setDate(new Date(e.target.value ? e.target.value : new Date()))
            }
          />
        </div>
      )}
      <OrderTable
        now={now}
        data={now ? cashierOrderData : finishOrderData}
        setIsOpen={setIsOpen}
        refId={id}
        isLoading={isLoading || finishLoading}
      />
      <OrderMobile
        data={now ? cashierOrderData : finishOrderData}
        setIsOpen={setIsOpen}
        refId={id}
        isLoading={isLoading || finishLoading}
      />
      <button
        className={`absolute right-1 bottom-1 ${deviceHandle ? "bg-green-600" : "bg-primary-red"} rounded-full p-3 text-white hover:scale-90 duration-300`}
        onClick={() =>
          handleConnect(deviceHandle, setDeviceHandle, deviceCharacteristic)
        }
      >
        <FaPrint className="text-3xl" />
      </button>
    </div>
  );
}
