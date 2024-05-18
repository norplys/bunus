import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useOrderDetail } from "@/helper/hooks/useOrderDetail";
import { useState } from "react";
import LoadingImage from "@/components/LoadingImage";
import OrderItem from "./OrderItem";
import OrderPayment from "./OrderPayment";

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
          <Dialog.Panel className="bg-white rounded-lg grid justify-items-center z-30 min-w-[315px] max-h-[80%] overflow-y-auto pb-2">
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
