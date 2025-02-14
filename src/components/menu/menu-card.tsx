import { Menu } from "@/lib/types/schema";
import { LazyImage } from "../ui/lazy-image";
import { formatCurrency } from "@/lib/currency-formatter";

export function MenuCard({ image, name, description, price }: Menu) {
  const imageUrl = image || "/images/menu/menu-placeholder.png";
  const trimmedDescription = description?.slice(0, 100);

  return (
    <div className="bg-white border border-border rounded-lg">
      <LazyImage
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-lg"
        width={300}
        height={200}
      />
      <div className="p-4 text-lg font-bold grid gap-2">
        <h3>{name}</h3>
        <p className="text-sm font-normal">
          {trimmedDescription ?? "Tidak ada deskripsi"}
        </p>
        <p>{formatCurrency(price)}</p>
        <button className="text-accent border-accent border rounded-md py-1 text-base">
          Add
        </button>
      </div>
    </div>
  );
}
