import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useOrderDetail } from "@/helper/hooks/useOrderDetail";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import LoadingImage from "@/components/LoadingImage";
import OrderDetailItem from "./OrderDetailItem";

export default function OrderDetailModal({
  now,
  isOpen,
  setIsOpen,
  refId,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refId: any;
  now: boolean;
}) {
  const { data, isLoading: isLoadingData } = useOrderDetail(refId.current);
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
      await queryClient.invalidateQueries(["orderAdmin", token]);
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const setPaid = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/orders/payment/${id}`,
        {
          status: "settlement",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      await toast.promise(res, {
        loading: "Loading...",
        success: "Pembayaran Berhasil",
        error: "Gagal bayar order",
      });
      await queryClient.invalidateQueries(["orderAdmin", token]);
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          static
          onClose={() => setIsOpen(false)}
          as={motion.div}
          className="fixed inset-1 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dialog.Panel className="bg-white rounded-lg grid justify-items-center z-30 min-w-[315px] max-h-[80%] overflow-y-auto pb-2">
            {isLoadingData ? (
              <LoadingImage />
            ) : (
              <>
                <div className="bg-primary-orange text-white p-2 w-full text-center">
                  <p className="font-bold text-lg">Detail</p>
                </div>
                <div className="w-full font-semibold text-lg pl-2 py-5">
                  <p>Meja : {data.table || "-"}</p>
                  <p>Nama : {data.user.name}</p>
                  <p>Email : {data.user.email}</p>
                </div>
                <div className="bg-primary-orange text-white p-2 rounded-md w-full text-center">
                  <p className="font-bold text-lg">Barang</p>
                </div>
                <OrderDetailItem data={data} />

                <div className="flex gap-5 pt-5">
                  {data.payment.status === "cashierPending" && (
                    <button
                      onClick={() => setPaid(data.id)}
                      className={`bg-orange-400 text-white font-bold p-2 rounded-md ${!now && "hidden"}`}
                    >
                      {isLoading ? (
                        <VscLoading className="animate-spin w-14" />
                      ) : (
                        "Bayar"
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => setDone(data.id)}
                    className={`bg-green-500 text-white font-bold p-2 rounded-md ${!now && "hidden"}`}
                  >
                    {isLoading ? (
                      <VscLoading className="animate-spin w-14" />
                    ) : (
                      "Selesai"
                    )}
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-primary-red text-white font-bold p-2 rounded-md"
                  >
                    Tutup
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
          <div
            className="fixed inset-0 bg-black/70 z-auto"
            aria-hidden="true"
          />
        </Dialog>
      )}
    </AnimatePresence>
  );
}
