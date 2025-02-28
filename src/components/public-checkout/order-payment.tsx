import { useCart } from "@/lib/hooks/query/use-cart";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/currency-formatter";
import { useMutationOrder } from "@/lib/hooks/mutation/use-mutation-order";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { OrderType } from "@/lib/types/schema";
import toast from "react-hot-toast";

export function Payment() {
  const { data } = useCart();
  const cart = data?.data;

  const router = useRouter();

  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as OrderType) || "DINE_IN";
  const queue = Number(searchParams.get("queue")) || null;

  const { createPublicOrderMutation } = useMutationOrder();

  const handlePayment = () => {
    createPublicOrderMutation.mutate(
      { data: { cartId: cart?.id, type, queue } },
      {
        onSuccess: (data) => {
          toast.success("Order berhasil dibuat");
          router.push(data.data.snapRedirectUrl);
        },
        onError: (error) => {
          toast.error("Gagal membuat order");
          console.error(error);
        },
      },
    );
  };

  return (
    <section className="flex flex-col gap-5">
      <h1 className="title text-lg">Ringkasan Pembayaran</h1>
      <div className="border rounded-lg p-5 grid gap-3">
        <PaymentCard label="Subtotal" value={cart?.total ?? 0} />
        <PaymentCard label="Tax" value={0} />
        <PaymentCard
          label="Total"
          value={cart?.total ?? 0}
          className="font-bold"
        />
      </div>
      <Button
        className="bg-accent text-primary-foreground py-1 text-lg"
        onClick={handlePayment}
      >
        Bayar
      </Button>
    </section>
  );
}

type PaymentCardProps = {
  label: string;
  value: number;
  className?: string;
};

function PaymentCard({ label, value, className }: PaymentCardProps) {
  return (
    <section className={clsx("flex justify-between", className)}>
      <h2>{label}</h2>
      <p>{formatCurrency(value)}</p>
    </section>
  );
}
