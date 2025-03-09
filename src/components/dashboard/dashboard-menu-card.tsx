import { LazyImage } from "../ui/lazy-image";
import { formatCurrency } from "@/lib/currency-formatter";
import type { Menu } from "@/lib/types/schema";

type DashboardMenuCardProps = {
  menu: Menu;
  handleOpenModal: (menuId: string) => void;
};

export function DashboardMenuCard({
  menu,
  handleOpenModal,
}: DashboardMenuCardProps) {
  const defaultImage = "/images/menu/menu-placeholder.png";

  const handleClick = () => {
    handleOpenModal(menu.id);
  };

  return (
    <li
      className="border border-border flex rounded-lg gap-5"
      onClick={handleClick}
    >
      <LazyImage
        src={menu.image ?? defaultImage}
        alt={menu.name}
        width={300}
        height={300}
        className="object-cover h-full"
      />
      <div className="py-4">
        <h1 className="text-lg font-semibold">{menu.name}</h1>
        <p>{formatCurrency(menu.price ?? 0)}</p>
      </div>
    </li>
  );
}
