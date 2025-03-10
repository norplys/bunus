"use client";

import { OrderInformation } from "@/components/public-checkout/order-information";
import { Payment } from "@/components/public-checkout/order-payment";

export default function CheckOut() {
  return (
    <main className="md:mt-32 mt-20 grid md:grid-cols-2 gap-5 layout min-h-screen">
      <OrderInformation />
      <Payment />
    </main>
  );
}
