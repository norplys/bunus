import { Menu } from "@/lib/types/schema";
import { LazyImage } from "../ui/lazy-image";
import { formatCurrency } from "@/lib/currency-formatter";
import { clsx } from "clsx";

type MenuCardProps = Menu & {
  changeId: (id: string) => void;
};

export function MenuCard({
  id,
  image,
  name,
  description,
  price,
  available,
  discountPrice,
  changeId,
}: MenuCardProps) {
  const imageUrl = image || "/images/menu/menu-placeholder.png";
  const trimmedDescription = description?.slice(0, 100);

  const handleChangeId = () => {
    changeId(id);
  };

  return (
    <div className="bg-white border border-border rounded-lg relative">
      {!available && (
        <div className="absolute w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-bold rounded-lg">
          Tidak Tersedia
        </div>
      )}
      <LazyImage
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-t-lg"
        width={300}
        height={200}
      />
      <div className="p-4 text-lg font-bold grid gap-2">
        <h3>{name}</h3>
        <p className="text-sm font-light">
          {trimmedDescription ?? "Tidak ada deskripsi"}
        </p>
        <div className="flex gap-2">
          <p className={clsx(discountPrice ? "opacity-30 line-through" : "")}>
            {formatCurrency(price)}
          </p>
          {discountPrice && <p>{formatCurrency(discountPrice)}</p>}
        </div>
        <button
          className="text-accent border-accent border rounded-md py-1 text-base"
          disabled={!available}
          onClick={handleChangeId}
        >
          Tambah
        </button>
      </div>
    </div>
  );
}
