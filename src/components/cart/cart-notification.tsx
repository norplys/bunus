import { AnimatePresence, motion } from "framer-motion";
import { PiHandbagBold } from "react-icons/pi";
import { useCart } from "@/lib/hooks/query/use-cart";
import { formatCurrency } from "@/lib/currency-formatter";
import Link from "next/link";

export function CartNotification() {
  const { data, isPending } = useCart();
  const cart = data?.data;

  return (
    <AnimatePresence initial={false}>
      {!isPending && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="sticky bottom-10 z-50"
        >
          <Link
            className="flex justify-between max-w-xl mx-auto sticky p-4 bg-foreground rounded-lg bottom-10 mb-10 text-primary-foreground border font-bold"
            href={"/cart"}
          >
            <div className="flex justify-center items-center gap-2">
              <PiHandbagBold className="text-xl" />
              <p>{cart?._count?.cartItem}</p>
            </div>
            <p>{formatCurrency(cart?.total || 0)}</p>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
