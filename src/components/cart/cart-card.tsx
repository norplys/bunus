import { CartItem } from "@/lib/types/schema";
import { LazyImage } from "../ui/lazy-image";
import { formatCurrency } from "@/lib/currency-formatter";
import { useEffect, useState } from "react";
import { useMutationCartItem } from "@/lib/hooks/mutation/use-mutation-cart-item";
import toast from "react-hot-toast";

export function CartCard({ cartItem }: { cartItem: CartItem }) {
  const { updateCartItemMutation } = useMutationCartItem();

  const imageUrl = cartItem.menu.image ?? "/images/menu/menu-placeholder.png";

  const menuPrice = cartItem.menu.discountPrice ?? cartItem.menu.price;

  const [quantity, setQuantity] = useState(cartItem.quantity);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleSubtract = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  useEffect(() => {
    if (quantity !== cartItem.quantity) {
      updateCartItemMutation.mutate(
        {
          data: {
            menuId: cartItem.menu.id,
            quantity,
          },
        },
        {
          onSuccess: () => {
            toast.success("Berhasil mengupdate keranjang");
          },
          onError: () => {
            toast.error("Gagal mengupdate keranjang");
          },
        },
      );
    }
  }, [quantity]);

  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-5 text-lg font-bold">
      <div className="flex items-center space-x-4">
        <LazyImage
          src={imageUrl}
          alt={cartItem.menu.name}
          width={100}
          height={100}
          className="w-full h-full rounded-lg"
        />
        <div>
          <h3>{cartItem.menu.name}</h3>
          <p className="text-sm font-normal">@{formatCurrency(menuPrice)}</p>
          <p>{formatCurrency(cartItem.total)}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={handleSubtract}>-</button>
        <span className="px-4">{quantity}</span>
        <button onClick={handleAdd}>+</button>
      </div>
    </div>
  );
}
