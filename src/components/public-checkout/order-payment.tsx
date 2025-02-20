import { useCart } from "@/lib/hooks/query/use-cart";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/currency-formatter";
import clsx from "clsx";

export function Payment() {
  const { data } = useCart();
  const cart = data?.data;

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
      <Button className="bg-accent text-primary-foreground py-1 text-lg">
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
