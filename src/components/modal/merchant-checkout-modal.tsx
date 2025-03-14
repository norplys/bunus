import { Button } from "../ui/button";
import { Modal } from "./modal";
import { useEffect, useState } from "react";
import { FaPlateWheat } from "react-icons/fa6";
import { RiTakeawayLine } from "react-icons/ri";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useCart } from "../../lib/hooks/query/use-cart";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutationOrder } from "@/lib/hooks/mutation/use-mutation-order";
import { OrderType } from "@/lib/types/schema";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type MerchantCheckoutModalProps = {
  open: boolean;
  closeModal: () => void;
};

export function MerchantCheckoutModal({
  open,
  closeModal,
}: MerchantCheckoutModalProps) {
  const [orderType, setOrderType] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setOrderType(null);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      closeModal={closeModal}
      className="grid place-items-center"
    >
      <section className="bg-primary-foreground text-2xl font-bold p-10 rounded-lg">
        {orderType ? (
          <QueueInput orderType={orderType} />
        ) : (
          <OrderTypeButton setOrderType={setOrderType} />
        )}
      </section>
    </Modal>
  );
}

type OrderTypeButtonProps = {
  setOrderType: (value: string) => void;
};

function OrderTypeButton({ setOrderType }: OrderTypeButtonProps) {
  return (
    <div className="grid gap-5 text-primary-foreground">
      <Button
        className="flex items-center justify-center gap-2 py-4 px-8 bg-accent"
        onClick={() => setOrderType("TAKE_AWAY")}
      >
        <RiTakeawayLine /> Take Away
      </Button>
      <Button
        className="flex items-center justify-center gap-2 py-4 px-8 bg-accent"
        onClick={() => setOrderType("DINE_IN")}
      >
        <FaPlateWheat />
        Dine In
      </Button>
    </div>
  );
}

type QueueInputProps = {
  orderType: string;
};

const checkoutPayload = z.object({
  queue: z.number().positive(),
});

type CheckOutSchema = z.infer<typeof checkoutPayload>;

function QueueInput({ orderType }: QueueInputProps) {
  const { createOrderMutation } = useMutationOrder();
  const router = useRouter();

  useEffect(() => {
    const input = document.getElementById("queue");
    if (input) {
      input.focus();
    }
  }, []);

  const { data } = useCart();
  const cart = data?.data;

  const { register, handleSubmit } = useForm<CheckOutSchema>({
    resolver: zodResolver(checkoutPayload),
  });

  const handleCheckout = (data: CheckOutSchema) => {
    toast.dismiss();

    createOrderMutation.mutate(
      {
        data: {
          queue: data.queue,
          type: orderType as OrderType,
          cartId: cart?.id,
        },
      },
      {
        onSuccess: () => {
          toast.success("Berhasil memesan");
          router.replace("/service/merchant");
        },
        onError: () => {
          toast.error("Gagal memesan");
        },
      },
    );
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(handleCheckout)}>
      <Input
        label="Nomor Antrian"
        type="number"
        register={register("queue", {
          valueAsNumber: true,
        })}
        id="queue"
      />
      <Button
        className="w-full bg-accent p-2 text-xl text-primary-foreground"
        type="submit"
      >
        Pesan
      </Button>
    </form>
  );
}
