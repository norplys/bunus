import { ReactNode } from "react";
import { ServiceHeader } from "@/components/header/service-header";
import { DashboardSidebar } from "@/components/dashboard.tsx/dashboard-sidebar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ServiceHeader isAdmin />
      <DashboardSidebar />
      <main>{children}</main>
    </>
  );
}
