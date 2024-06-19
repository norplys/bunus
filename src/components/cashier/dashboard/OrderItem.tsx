import { useState } from "react";
import formatCurrency from "@/helper/currencyFormatter";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { VscLoading } from "react-icons/vsc";
import OrderDetailItem from "./OrderDetailItem";
import { getSockets } from "@/helper/socket";
import { handlePrint } from "@/helper/printer";

export default function OrderItem({
  data,
  setIsOpen,
  now,
  setIsPayment,
  characteristic,
}: {
  data: any;
  setIsOpen: (value: boolean) => void;
  now: boolean;
  setIsPayment: (value: boolean) => void;
  characteristic: any;
}) {
  const socket = getSockets();
  const handleReceipt = (data: any) => {
    socket.emit("orderReceipt", data);
  };
  function formatItemLine(item: any) {
    const quantity =
      item.quantity.toString() +
      "x".padEnd(12 - item.quantity.toString().length);
    const price =
      "@" +
      item.menu.price.toString().padEnd(19 - item.total.toString().length);
    return `${item.menu.name}\n${quantity}${price}${item.total.toString()}\n`;
  }
  const ESC = "\x1b"; // Escape character
  const INIT = ESC + "@"; // Initialize printer
  const ALIGN_LEFT = ESC + "a" + "\x00"; // Align left
  const ALIGN_CENTER = ESC + "a" + "\x01"; // Align center
  const ALIGN_RIGHT = ESC + "a" + "\x02"; // Align right
  const BOLD_ON = ESC + "E" + "\x01"; // Bold on
  const BOLD_OFF = ESC + "E" + "\x00"; // Bold off

  // Create the receipt data
  // let receiptData = INIT; // Initialize printer settings
  // receiptData += ALIGN_CENTER; // Center align the following text
  // receiptData += BOLD_ON + "Bubur Nusantara\n" + BOLD_OFF; // Print store name in bold
  // receiptData += "Pujasera Citra Garden 5\n";
  // receiptData += "Kamal, Kalideres, Jakarta Barat\n";
  // receiptData += "085692807048\n";
  // receiptData += ALIGN_LEFT; // Left align the following text
  // receiptData += "--------------------------------\n";
  // data.items.map((item: any) => {
  //   receiptData += formatItemLine(item);
  // });
  // receiptData += "--------------------------------\n";
  // receiptData += `${"Total:".padEnd(29 - data.total.toString().length)}${"Rp." + data.total.toString()}\n`;
  // receiptData += "\n\n\n\n\n\n\n\n\n\n";

  const DATA = `
  BUBUR NUSANTARA   
 I Pujasera Citra Garden 5


TOTAL: IDR 20.000


`;

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
          onClick={() => handlePrint(DATA, characteristic)}
        >
          Print
        </button>
      </div>
    </>
  );
}
