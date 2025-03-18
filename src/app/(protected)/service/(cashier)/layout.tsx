import { ServiceHeader } from "@/components/header/service-header";
import { ProtectedCashierLayout } from "./protected-cashier-layout";
import { CashierDashboard } from "@/components/cashier/cashier-dashboard";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedCashierLayout>
      <ServiceHeader />
      <CashierDashboard />
      <main className="layout">{children}</main>
    </ProtectedCashierLayout>
  );
}
