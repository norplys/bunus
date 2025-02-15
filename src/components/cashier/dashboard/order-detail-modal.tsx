import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useOrderDetail } from "@/lib/hooks/query/use-order-detail";
import { useState } from "react";
import LoadingImage from "@/components/loading-image";
import OrderItem from "./order-item";
import OrderPayment from "./order-payment";

export default function OrderDetailModal({
  now,
  isOpen,
  setIsOpen,
  refId,
  characteristic,
  deviceHandle,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refId: any;
  now: boolean;
  characteristic: any;
  deviceHandle: any;
}) {
  const { data, isLoading: isLoadingData } = useOrderDetail(refId.current);
  const [isPayment, setIsPayment] = useState(false);
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          static
          onClose={() => {
            setIsOpen(false), setIsPayment(false);
          }}
          as={motion.div}
          className="fixed inset-1 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dialog.Panel
            className={`${!isLoadingData && "bg-white"} rounded-lg grid justify-items-center z-30 min-w-[315px] max-h-[80%] overflow-y-auto pb-2`}
          >
            {isLoadingData ? (
              <LoadingImage />
            ) : isPayment ? (
              <OrderPayment
                isPayment={isPayment}
                setIsOpen={setIsOpen}
                setIsPayment={setIsPayment}
                refId={refId}
                data={data}
              />
            ) : (
              <OrderItem
                data={data}
                setIsOpen={setIsOpen}
                now={now}
                setIsPayment={setIsPayment}
                characteristic={characteristic}
                deviceHandle={deviceHandle}
              />
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
