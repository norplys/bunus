import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useOrderDetail } from "@/lib/hooks/query/use-order-detail";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import LoadingImage from "@/components/loading-image";
import OrderKitchenItem from "./order-kitchen-item";

export default function KitchenModal({
  isOpen,
  setIsOpen,
  refId,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refId: any;
}) {
  const { data, isLoading: isLoadingData } = useOrderDetail(refId.current);

  const orderDetail = data?.data;

  const [isLoading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const setDone = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/orders/${id}`,
        {
          isCooked: true,
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
      await queryClient.invalidateQueries(["orderKitchen", token]);
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
                  <p className="font-bold text-lg">
                    {orderDetail?.table || orderDetail?.user.name}
                  </p>
                </div>
                <div className="w-full font-semibold text-lg pl-2 py-5">
                  <p>Tipe : {orderDetail?.type}</p>
                </div>
                <div className="bg-primary-orange text-white p-2 rounded-md w-full text-center">
                  <p className="font-bold text-lg">Barang</p>
                </div>
                <OrderKitchenItem data={data} />
                <div className="flex gap-5 pt-5">
                  <button
                    onClick={() => setDone(orderDetail!.id)}
                    className={`bg-green-500 text-white font-bold p-2 rounded-md`}
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
