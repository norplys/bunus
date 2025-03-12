import { ReactNode } from "react";
import { ServiceHeader } from "@/components/header/service-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ProtectedDashboardLayout } from "./protected-dashboard-layout";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedDashboardLayout>
      <ServiceHeader isAdmin />
      <DashboardSidebar />
      <main className="layout">{children}</main>
    </ProtectedDashboardLayout>
  );
}
