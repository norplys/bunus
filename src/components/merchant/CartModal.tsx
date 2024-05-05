import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { useCartData } from "@/helper/hooks/useCartData";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import CartItem from "../cart/CartItem";
import { useRouter } from "next/navigation";
import { useUser } from "@/helper/context/userContext";
import { useSearchParams } from "next/navigation";
import playAudio from "@/helper/audio/playAudio";

export default function CreateCategoryModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const params = useSearchParams();
  const table = params.get("table");
  const type = params.get("type");
  const { token } = useUser();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useCartData(token);
  const handleCheckout = async (total: number) => {
    try {
      setLoading(true);
      const items = data?.items.map((item: any) => {
        return {
          menuId: item.menu.id,
          quantity: item.quantity,
          total: item.total,
        };
      });
      if (!items.length) {
        setLoading(false);
        return;
      }
      const res = axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/orders`,
        {
          total,
          items,
          merchant: "PUSAT",
          table: table ? Number(table) : null,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      await toast.promise(
        res,
        {
          loading: "Mohon Tunggu...",
          success: "Berhasil Checkout !",
          error: "Gagal Checkout, Mohon Coba Kembali !",
        },
        {
          position: "bottom-left",
        },
      );
      setLoading(false);
      push("/merchant/success");
      playAudio("/audio/sound3.mp3");
    } catch (err) {
      console.log(err);
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
          className="fixed inset-1 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dialog.Panel className="bg-white rounded-xl grid justify-items-center gap-5 z-30 min-w-[315px] px-1 overflow-y-scroll h-[80%]">
            <div className="bg-blue-50 py-9">
              <div className="flex gap-5 justify-center items-start px-3 mx-auto xl:w-[80%] flex-col lg:flex-row">
                <div className="flex-1 grid gap-2 w-full ">
                  <div className="lg:text-xl text-lg font-bold bg-white rounded-t-xl  p-5 flex justify-between">
                    {isLoading ? (
                      <h1>Loading...</h1>
                    ) : (
                      <p>Total item ({data?.items.length})</p>
                    )}
                    <button className="text-primary-red text-base">
                      <FaTrash />
                    </button>
                  </div>
                  {/* Item */}
                  <div className="bg-white rounded-b-xl  p-5 grid gap-5">
                    {isLoading ? (
                      <h1>Loading...</h1>
                    ) : (
                      data?.items.map((item: any, i: any) => {
                        return <CartItem key={i} item={item} />;
                      })
                    )}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-xl lg:w-96 p-5 grid gap-5 w-full">
                  <h1 className="md:text-xl font-bold text-primary-orange">
                    Ringkasan Belanja
                  </h1>
                  <p className="md:text-lg flex justify-between border-b pb-2">
                    Total{" "}
                    <p className="font-bold text-sm md:text-base">
                      Rp. {isLoading ? <h1>Loading...</h1> : data?.total}
                    </p>
                  </p>
                  <button
                    className="bg-gradient-to-r from-primary-cyan via-purple-500 to-primary-orange text-white font-bold rounded-md md:p-2 bg-800% bg-50% hover:bg-100% duration-700 shadow-xl py-1"
                    onClick={() => handleCheckout(data?.total)}
                    disabled={loading}
                  >
                    Buat Pesanan
                  </button>
                </div>
              </div>
            </div>
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
