import { Modal } from "./modal";
import { useDetailMenu } from "@/lib/hooks/query/use-detail-menu";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loading } from "../ui/loading";
import { formatCurrency } from "@/lib/currency-formatter";
import clsx from "clsx";
import { LazyImage } from "../ui/lazy-image";
import { Input } from "../ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-hot-toast";
import { useMutationCartItem } from "@/lib/hooks/mutation/use-mutation-cart-item";
import { useCart } from "@/lib/hooks/query/use-cart";
import { Cart } from "@/lib/types/schema";

type MenuCardModalProps = {
  menuId: string | null;
  open: boolean;
  closeModal: () => void;
};

export function MenuCardModal({
  menuId,
  open,
  closeModal,
}: MenuCardModalProps) {
  if (!menuId) {
    open = false;
    return null;
  }
  const { data: cartData, isPending: isCartPending } = useCart();
  const cart = cartData?.data;

  const { data, isLoading } = useDetailMenu(menuId);
  const menu = data?.data;

  const imageUrl = menu?.image ?? "/images/menu/menu-placeholder.png";

  return (
    <Modal
      open={open}
      closeModal={closeModal}
      modalClassName="grid bg-background p-5 pt-10 gap-5 rounded-lg layout relative"
    >
      <ImCross
        className="absolute rounded-full text-3xl p-1 cursor-pointer top-1 right-1"
        onClick={closeModal}
      />

      {isLoading || isCartPending ? (
        <Loading />
      ) : (
        <>
          <ImageSection
            imageUrl={imageUrl}
            name={menu?.name ?? ""}
            price={menu?.price ?? 0}
            discountPrice={menu?.discountPrice}
            description={menu?.description ?? ""}
          />
          <OrderForm
            price={menu?.discountPrice ?? menu?.price ?? 0}
            menuId={menuId}
            closeModal={closeModal}
            cart={cart}
          />
        </>
      )}
    </Modal>
  );
}

type ImageSectionProps = {
  imageUrl: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
};

function ImageSection({
  imageUrl,
  name,
  price,
  discountPrice,
  description,
}: ImageSectionProps) {
  return (
    <div className="font-bold grid gap-3">
      <LazyImage
        src={imageUrl}
        alt={name}
        width={500}
        height={500}
        className="rounded-lg"
      />
      <h1 className="text-xl">{name}</h1>
      <p className="font-normal">{description || "Tidak ada deskripsi"}</p>
      <div className="flex gap-2 text-lg">
        {discountPrice && <p>{formatCurrency(discountPrice)}</p>}
        <p
          className={clsx(
            discountPrice ? "line-through text-md opacity-30" : "",
          )}
        >
          {formatCurrency(price)}
        </p>
      </div>
    </div>
  );
}

const cartItemPayload = z.object({
  quantity: z.number().int().positive(),
  note: z.string().optional(),
});

export type CartItemSchema = z.infer<typeof cartItemPayload>;

type OrderFormProps = {
  menuId: string;
  price: number;
  closeModal: () => void;
  cart?: Cart;
};

function OrderForm({ menuId, price, closeModal, cart }: OrderFormProps) {
  const cartItemData = cart?.cartItem.find((item) => item.menuId === menuId);

  const [quantity, setQuantity] = useState(cartItemData?.quantity ?? 0);

  const { register, handleSubmit } = useForm<CartItemSchema>({
    resolver: zodResolver(cartItemPayload),
    values: {
      quantity,
    },
  });

  const { updateCartItemMutation } = useMutationCartItem();

  const finalPrice = price * quantity;

  const handleQuantity = (value: number) => {
    setQuantity(value);
  };

  const onSubmit: SubmitHandler<CartItemSchema> = (
    data: CartItemSchema,
  ): void => {
    toast.dismiss();

    updateCartItemMutation.mutate(
      { data: { ...data, menuId } },
      {
        onSuccess: () => {
          toast.success("Berhasil menambahkan ke keranjang");
          closeModal();
        },
        onError: () => {
          toast.error("Gagal menambahkan ke keranjang");
        },
      },
    );
  };

  return (
    <form
      className="flex flex-col justify-between gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Note (Optional)"
        id="note"
        type="text"
        placeholder="Please dont use..."
        register={register("note")}
      />
      <div className="flex justify-between font-bold text-lg">
        <p>{formatCurrency(finalPrice)}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleQuantity(quantity > 0 ? quantity - 1 : 0)}
          >
            -
          </button>
          <input
            type="number"
            className="text-center max-w-14"
            value={quantity}
            onChange={(e) => handleQuantity(Number(e.target.value))}
          />
          <button type="button" onClick={() => handleQuantity(quantity + 1)}>
            +
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="bg-accent p-2 rounded-lg text-primary-foreground"
      >
        Add to cart
      </button>
    </form>
  );
}
