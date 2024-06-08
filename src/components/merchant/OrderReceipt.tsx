import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getSockets } from "@/helper/socket";

export default function OrderReceipt() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const socket = getSockets();
  useEffect(() => {
    let timeOut = setTimeout(() => {
      setIsOpen(false);
    }, 5000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [data]);
  socket.on("orderReceipt", (data) => {
    setData(data);
    setIsOpen(true);
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          static
          onClose={() => setIsOpen(false)}
          as={motion.div}
          className="fixed inset-1 flex justify-center items-center -z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dialog.Panel
            className={`rounded-xl flex flex-col items-center z-30 min-w-[315px] gap-2 p-5 px-2 overflow-y-scroll bg-white`}
          >
            <h1 className="font-bold text-2xl border-b-2 border-primary-orange h-min pb-2">
              Order Receipt
            </h1>
            <h2 className="text-center">
              Foto Layar Ini Jika Anda <br />
              Membutuhkan Bukti Pembayaran
            </h2>
            <div className="grid bg-primary-orange p-5 rounded-md gap-2 text-white font-bold text-lg">
              {data?.items.map((item: any, index: number) => {
                return (
                  <div className="grid grid-cols-6 gap-5 border-b-orange-200 border-b-2 pb-2 justify-items-center">
                    <div>{item.quantity}x</div>
                    <div className="col-span-4">{item.menu.name}</div>
                    <div>{item.total}</div>
                  </div>
                );
              })}
              <div className="text-center">total : {data?.total}</div>
            </div>
          </Dialog.Panel>
          <div
            className="fixed inset-0 bg-black/100 z-auto"
            aria-hidden="true"
          />
        </Dialog>
      )}
    </AnimatePresence>
  );
}
