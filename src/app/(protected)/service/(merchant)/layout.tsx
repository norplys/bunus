import type { ReactNode } from "react";
import { ProtectedMerchantLayout } from "./protected-merchant-layout";

export default function Layout({ children }: { children: ReactNode }) {
  return <ProtectedMerchantLayout>{children}</ProtectedMerchantLayout>;
}
