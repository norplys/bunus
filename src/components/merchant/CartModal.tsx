import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartData } from "@/helper/hooks/useCartData";
import { useState } from "react";
import { useUser } from "@/helper/context/userContext";
import CartModalItem from "./CartModalItem";
import ModalType from "./ModalType";
import MerchantForm from "./MerchantForm";

export default function CreateCategoryModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const { token } = useUser();
  const { data, isLoading } = useCartData(token);
  const [now, setNow] = useState<string>("cart");
  const [orderType, setOrderType] = useState<string>("DINE_IN");

  const handleClose = () => {
    setIsOpen(false);
    setNow("cart");
    setOrderType("DINE_IN");
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          static
          onClose={handleClose}
          as={motion.div}
          className="fixed inset-1 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Dialog.Panel
            className={`rounded-xl grid justify-items-center gap-5 z-30 min-w-[315px] overflow-y-scroll h-[80%] ${isLoading ? "" : "bg-white"}`}
          >
            {now === "cart" ? (
              <CartModalItem
                data={data}
                isLoading={isLoading}
                setNow={setNow}
              />
            ) : now === "type" ? (
              <ModalType setNow={setNow} setOrderType={setOrderType} />
            ) : now === "table" ? (
              <MerchantForm type={orderType} data={data} />
            ) : (
              ""
            )}
          </Dialog.Panel>
          <div
            className="fixed inset-0 bg-black/90 z-auto"
            aria-hidden="true"
          />
        </Dialog>
      )}
    </AnimatePresence>
  );
}
