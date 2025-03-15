import { ReactNode } from "react";
import { ServiceHeader } from "@/components/header/service-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ProtectedDashboardLayout } from "./protected-dashboard-layout";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedDashboardLayout>
      <ServiceHeader isAdmin />
      <DashboardSidebar />
      <main className="mx-auto max-w-7xl px-4 md:pl-12 xl:pl-0">
        {children}
      </main>
    </ProtectedDashboardLayout>
  );
}
