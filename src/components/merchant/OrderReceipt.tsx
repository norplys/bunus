import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getSockets } from "@/lib/socket";
import formatCurrency from "@/lib/currencyFormatter";
import Image from "next/image";

export default function OrderReceipt() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const socket = getSockets();
  useEffect(() => {
    let timeOut = setTimeout(() => {
      setIsOpen(false);
    }, 10000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [data]);
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
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
          className="fixed inset-1 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dialog.Panel
            className={`rounded-xl flex flex-col items-center z-40 min-w-[315px] gap-2 p-5 px-2 overflow-y-scroll bg-white`}
          >
            <h1 className="font-bold text-2xl border-b-2 border-primary-orange h-min pb-2">
              {formatCurrency(data?.total)}
            </h1>
            <h2 className="text-center font-bold">
              Silahkan scan QRIS Dibawah Ini
            </h2>
            <Image
              src="/qris.png"
              width={400}
              height={400}
              alt="qris.png"
              className="border-4 border-primary-orange rounded-md"
              priority={true}
            />
            <button
              className="bg-primary-red px-2 py-1 text-lg rounded-lg font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              Tutup
            </button>
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
