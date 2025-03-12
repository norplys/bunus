"use client";

import { ServiceHeader } from "@/components/header/service-header";
import { useModal } from "@/lib/hooks/use-modal";
import { MerchantCheckoutModal } from "@/components/modal/merchant-checkout-modal";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/hooks/query/use-cart";
import type { ReactNode } from "react";
import { formatCurrency } from "@/lib/currency-formatter";
import { Cart } from "@/lib/types/schema";

export function MerchantCheckoutLayout({ children }: { children: ReactNode }) {
  const { openModal, closeModal, open } = useModal();
  const { data: cartData } = useCart();
  const cart = cartData?.data;

  return (
    <>
      <ServiceHeader />
      <MerchantCheckoutModal open={open} closeModal={closeModal} />
      <main className="layout mt-24">{children}</main>
      <MerchantCheckoutButton openModal={openModal} cart={cart} />
    </>
  );
}

type MerchantCheckoutButtonProps = {
  openModal: () => void;
  cart?: Cart;
};

function MerchantCheckoutButton({
  openModal,
  cart,
}: MerchantCheckoutButtonProps) {
  return (
    <section
      onClick={openModal}
      className="fixed bottom-0 justify-center w-full font-bold"
    >
      <div className="layout border-2 rounded-t-lg p-4">
        <div className="flex justify-between mb-5 text-lg">
          <p>{cart?._count.cartItem} Items</p>
          <p>Total: {formatCurrency(cart?.total ?? 0)}</p>
        </div>
        <Button
          className="w-full bg-accent p-2 text-xl text-primary-foreground"
          onClick={openModal}
        >
          Lanjutkan
        </Button>
      </div>
    </section>
  );
}
