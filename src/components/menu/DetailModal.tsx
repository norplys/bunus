import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDetailMenu } from "@/helper/hooks/useDetailMenu";
import { useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function DetailModal({
  isOpen,
  setIsOpen,
  id,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  id: any;
}) {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const [count, setCount] = useState(0);
  const { data, isLoading } = useDetailMenu(id.current);
  useEffect(() => {
    setCount(0);
  }, [isOpen]);
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return push("/login?redirect=cart");
      }
      const res = axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/cart-item`,
        {
          menuId: id.current,
          quantity: count,
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
          success: "Berhasil Menambahkan Ke Keranjang !",
          error: "Gagal Menambahkan Ke Keranjang !",
        },
        {
          position: "bottom-left",
        },
      );
      setIsOpen(false);
      await queryClient.invalidateQueries(["cartNotif", token]);
      await queryClient.invalidateQueries(["cart", token]);
    } catch (err) {
      console.log(err);
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
          <Dialog.Panel className="bg-white p-5 rounded-xl grid justify-items-center gap-5 z-30 min-w-[70%]">
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <>
                <Dialog.Title>
                  <div className="text-xl font-bold">{data?.name}</div>
                </Dialog.Title>
                <div className="flex gap-5 flex-col md:flex-row">
                  <div className="overflow-hidden h-60 rounded-2xl shadow-2xl">
                    <Image
                      src={data?.image}
                      alt="menu1"
                      width={300}
                      height={300}
                      className="object-cover hover:scale-110 duration-300 h-60"
                    />
                  </div>
                  <Dialog.Description className="overflow-y-auto text-justify text-sm w-72 border border-primary-orange md:h-full rounded-lg p-2 bg-orange-50 shadow-xl">
                    {data?.description}
                  </Dialog.Description>
                </div>
                <div className="w-full grid grid-rows-1 grid-cols-2">
                  <div className="md:text-xl font-semibold flex text-xl mx-auto">
                    Rp. {data?.price}
                    <p className="text-xs flex items-end">/pcs</p>
                  </div>
                  <p className="font-semibold md:text-xl text-xl mx-auto">
                    Total : Rp. {count * data?.price}
                  </p>
                </div>
                <div className="flex gap-5 justify-beetween items-center">
                  <button
                    className="text-4xl px-3 border-black rounded-full border-2"
                    onClick={() =>
                      count > 0 ? setCount(count - 1) : setCount(count)
                    }
                  >
                    -
                  </button>
                  <div className="flex items-center p-1 font-bold text-3xl">
                    {count}
                  </div>
                  <button
                    className="text-4xl px-2 border-2 border-black rounded-full"
                    onClick={() => setCount(count + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="py-1 md:px-3 font-bold rounded-xl mb-4 text-white md:text-lg shadow-lg bg-gradient-to-r from-primary-red via-purple-500 to-primary-orange bg-800% bg-50% hover:bg-100% duration-700 text-base px-2 text-xl"
                  onClick={handleAddToCart}
                  disabled={count ? false : true}
                >
                  OK
                </button>
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
