import { MerchantCheckoutLayout } from "./merchant-checkout-layout";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <MerchantCheckoutLayout>{children}</MerchantCheckoutLayout>;
}
