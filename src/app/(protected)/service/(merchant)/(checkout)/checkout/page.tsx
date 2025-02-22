"use client";
import { OrderSummary } from "@/components/public-checkout/order-information";

export default function MerchantCheckout() {
  return <OrderSummary isService={true} />;
}
