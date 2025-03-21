"use client";
import { clsx } from "clsx";
import { useCategories } from "@/lib/hooks/query/use-categories";
import { DashboardTab } from "../ui/dashboard-tab";
import { useSearchParams } from "next/navigation";

const allCategoryTab = {
  id: "ALL",
  name: "Semua",
};

type CategoryDashboardProps = {
  isAdmin?: boolean;
  isService?: boolean;
  className?: string;
};

export function CategoryDashboard({
  isAdmin,
  isService,
  className,
}: CategoryDashboardProps) {
  const { data } = useCategories();
  const categories = [allCategoryTab, ...(data?.data || [])];

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const selectedId = categoryId || "ALL";

  const rootUrl = isAdmin
    ? "/dashboard/menu"
    : isService
      ? "/service/merchant"
      : "/menu";

  return (
    <div
      className={clsx("min-h-14 z-30 py-4 overflow-x-auto sticky", className)}
    >
      <ul className="layout flex gap-5">
        {categories?.length ? (
          categories.map((category) => (
            <DashboardTab
              key={category.id}
              name={category.name}
              id={category.id}
              selectedId={selectedId}
              rootUrl={rootUrl}
              query={`categoryId=${category.id}`}
            />
          ))
        ) : (
          <p>Tidak ada kategori</p>
        )}
      </ul>
    </div>
  );
}
