import { Modal } from "./modal";
import { useAuth } from "@/lib/context/auth-context";
import { useDetailMenu } from "@/lib/hooks/query/use-detail-menu";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loading } from "../ui/loading";
import { formatCurrency } from "@/lib/currency-formatter";
import clsx from "clsx";
import { LazyImage } from "../ui/lazy-image";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ImCross } from "react-icons/im";

type MenuCardModalProps = {
  id: string;
  open: boolean;
  closeModal: () => void;
};

export function MenuCardModal({ id, open, closeModal }: MenuCardModalProps) {
  const { data, isLoading } = useDetailMenu(id);
  const menu = data?.data;
  const imageUrl = menu?.image ?? "/images/menu/menu-placeholder.png";

  if (!id) open = false;

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

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ImageSection
            imageUrl={imageUrl}
            name={menu!.name}
            price={menu!.price}
            discountPrice={menu?.discountPrice}
            description={menu!.description}
          />
          <OrderForm price={menu?.discountPrice ?? menu?.price ?? 0} />
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

const orderPayloadSchema = z.object({
  quantity: z.number().int().positive(),
  note: z.string().optional(),
});

export type OrderPayload = z.infer<typeof orderPayloadSchema>;

type OrderFormProps = {
  price: number;
};

function OrderForm({ price }: OrderFormProps) {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(orderPayloadSchema),
  });
  const { token } = useAuth();
  const [quantity, setQuantity] = useState(0);
  const finalPrice = price * quantity;

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleSubtract = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const onSubmit = (data: any) => {
    console.log(data);
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
      <div className="flex justify-between font-bold">
        <p>{formatCurrency(finalPrice)}</p>
        <div className="flex gap-2">
          <button onClick={handleSubtract}>-</button>
          <input
            {...register("quantity")}
            type="telephone"
            className="text-center max-w-14"
            value={quantity}
          />
          <button onClick={handleAdd}>+</button>
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
