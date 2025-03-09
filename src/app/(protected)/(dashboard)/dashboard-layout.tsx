import { ReactNode } from "react";
import { ServiceHeader } from "@/components/header/service-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ServiceHeader isAdmin />
      <DashboardSidebar />
      <main className="layout">{children}</main>
    </>
  );
}
