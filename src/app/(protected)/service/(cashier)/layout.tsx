import { MerchantHeader } from "@/components/header/merchant-header";
import { ProtectedCashierLayout } from "./protected-cashier-layout";
import { CashierDashboard } from "@/components/cashier/cashier-dashboard";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedCashierLayout>
      <MerchantHeader />
      <CashierDashboard />
      <main className="layout mt-20">{children}</main>
    </ProtectedCashierLayout>
  );
}
