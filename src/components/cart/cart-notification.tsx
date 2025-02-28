"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PiHandbagBold } from "react-icons/pi";
import { useCart } from "@/lib/hooks/query/use-cart";
import { useAuth } from "@/lib/context/auth-context";
import { formatCurrency } from "@/lib/currency-formatter";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type CartNotificationProps = {
  isService?: boolean;
};

export function CartNotification({ isService }: CartNotificationProps) {
  const { data, isPending } = useCart();
  const cart = data?.data;

  const searchParams = useSearchParams();
  const queue = searchParams.get("queue");

  const url = isService
    ? "/service/checkout"
    : queue
      ? `/checkout?queue=${queue}`
      : "/checkout";

  const { token } = useAuth();

  const isCartEmpty = cart?._count?.cartItem === 0 || !cart;

  const showCartNotification = !isCartEmpty && !isPending && token;

  return (
    <AnimatePresence initial={false}>
      {showCartNotification && (
        <motion.div
          initial={{ y: 400, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky bottom-10 z-50"
        >
          <Link
            className="flex justify-between max-w-xl mx-auto sticky p-4 bg-accent rounded-lg bottom-10 mb-10 text-primary-foreground font-bold text-lg"
            href={url}
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
