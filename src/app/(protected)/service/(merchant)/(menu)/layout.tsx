import type { ReactNode } from "react";
import { MerchantMenuLayout } from "./merchant-menu-layout";

export default function Layout({ children }: { children: ReactNode }) {
  return <MerchantMenuLayout>{children}</MerchantMenuLayout>;
}
