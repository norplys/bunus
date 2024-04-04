import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useOrderDetail } from "@/helper/hooks/useOrderDetail";

export default function OrderDetailModal({
  isOpen,
  setIsOpen,
  refId,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refId: any;
}) {
  const { data, isLoading } = useOrderDetail(refId.current);
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
          <Dialog.Panel className="bg-white p-5 rounded-xl grid justify-items-center gap-5 z-30 min-w-[315px] px-1 md:px-5">
            {isLoading ? (
              <Image
                src="/loadingAnimation.gif"
                alt="loading"
                width={200}
                height={200}
              />
            ) : (
              <>
                <div className="bg-primary-orange text-white p-2 rounded-md w-full text-center">
                  <p className="font-bold text-lg">Pembeli</p>
                </div>
                <div className="w-full">
                  <p className="font-semibold text-lg">
                    Nama : {data.user.name}
                  </p>
                  <p className="font-semibold text-lg">
                    Email : {data.user.email}
                  </p>
                </div>
                <div className="bg-primary-orange text-white p-2 rounded-md w-full text-center">
                  <p className="font-bold text-lg">Barang</p>
                </div>
                <div>
                  <table className="w-full bg-orange-50">
                    <tr className="text-center">
                      <th className="p-5">Quantity</th>
                      <th className="p-5">Menu</th>
                      <th className="p-5">Total</th>
                    </tr>
                    {data.items.map((product: any) => (
                      <tr
                        key={product.menu.id}
                        className="text-center border-t-2 border-t-orange-200"
                      >
                        <td className="p-5">{product.quantity}x</td>
                        <td className="p-5">{product.menu.name}</td>
                        <td className="p-5">{product.total}</td>
                      </tr>
                    ))}
                    <tr className="text-center border-t-2 border-t-orange-200">
                      <td></td>
                      <td className="col-span-2 p-5 font-bold">Total Harga</td>
                      <td className="font-bold">{data.total}</td>
                    </tr>
                  </table>
                </div>
                <div className="flex gap-5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-green-500 text-white font-bold p-2 rounded-md"
                  >
                    Selesai
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
