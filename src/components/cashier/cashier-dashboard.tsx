"use client";
import { DashboardTab } from "../ui/dashboard-tab";
import { useSearchParams } from "next/navigation";

const cashierTabArray = [
  {
    id: "ALL",
    name: "Aktif",
  },
  {
    id: "COMPLETED",
    name: "Selesai",
  },
  {
    id: "CANCELLED",
    name: "Dibatalkan",
  },
];

export function CashierDashboard() {
  const searchParams = useSearchParams();
  const rootUrl = "/service/cashier";

  const orderStatus = searchParams.get("order_status");
  const selectedId = orderStatus || "ALL";

  return (
    <div className="min-h-14 sticky z-30 py-4 text-primary top-20 border-b border-2 bg-primary-foreground/50 backdrop-blur-lg">
      <ul className="layout flex overflow-x-auto gap-5">
        {cashierTabArray.map((tab) => (
          <DashboardTab
            key={tab.id}
            name={tab.name}
            id={tab.id}
            selectedId={selectedId}
            rootUrl={rootUrl}
            query={`order_status=${tab.id}`}
          />
        ))}
      </ul>
    </div>
  );
}
