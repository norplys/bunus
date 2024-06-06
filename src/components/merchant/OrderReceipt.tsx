import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartData } from "@/helper/hooks/useCartData";
import { useUser } from "@/helper/context/userContext";
import { useSearchParams } from "next/navigation";

export default function CreateCategoryModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const params = useSearchParams();
  const { token } = useUser();
  const { data, isLoading } = useCartData(token);

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
            className={`rounded-xl grid justify-items-center gap-5 z-30 min-w-[315px] px-1 overflow-y-scroll h-[80%] ${isLoading ? "" : "bg-white"}`}
          ></Dialog.Panel>
          <div
            className="fixed inset-0 bg-black/70 z-auto"
            aria-hidden="true"
          />
        </Dialog>
      )}
    </AnimatePresence>
  );
}
