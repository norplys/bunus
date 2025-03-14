import { LazyImage } from "../ui/lazy-image";
import { formatCurrency } from "@/lib/currency-formatter";
import type { Menu } from "@/lib/types/schema";
import clsx from "clsx";

type DashboardMenuCardProps = {
  menu: Menu;
  handleOpenMenuModal: (menuId: string | null, isEditMode: boolean) => void;
};

export function DashboardMenuCard({
  menu,
  handleOpenMenuModal,
}: DashboardMenuCardProps) {
  const defaultImage = "/images/menu/menu-placeholder.png";

  const editMenu = () => {
    handleOpenMenuModal(menu.id, true);
  };

  return (
    <li
      className="border border-border flex rounded-lg gap-5 cursor-pointer overflow-hidden"
      onClick={editMenu}
    >
      <LazyImage
        src={menu.image ?? defaultImage}
        alt={menu.name}
        width={300}
        height={300}
        className="object-cover h-40 w-60"
      />
      <div className="py-4">
        <h1 className="text-lg font-semibold">{menu.name}</h1>
        <p
          className={clsx(menu?.discountPrice && "line-through text-gray-500")}
        >
          {formatCurrency(menu.price ?? 0)}
        </p>
        {menu?.discountPrice && (
          <p>{formatCurrency(menu.discountPrice ?? 0)}</p>
        )}
      </div>
    </li>
  );
}
