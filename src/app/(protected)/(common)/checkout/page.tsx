"use client";

import { OrderInformation } from "@/components/public-checkout/order-information";
import { Payment } from "@/components/public-checkout/order-payment";

export default function CheckOut() {
  return (
    <main className="grid md:grid-cols-2 gap-5 layout min-h-screen mt-5">
      <OrderInformation />
      <Payment />
    </main>
  );
}
