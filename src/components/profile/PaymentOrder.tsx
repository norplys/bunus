import formatCurrency from "@/helper/currencyFormatter";
import Link from "next/link";
type Order = {
  id: string;
  createdAt: string;
  total: number;
  payment: {
    status: string;
    snap_redirect_url: string;
  };
};

export default function PaymentOrder({ order }: { order: Order }) {
  return (
    <Link
      href={order.payment.snap_redirect_url}
      key={order.id}
      className="flex flex-col justify-between  border-t-2 border-primary-orange py-5"
    >
      <div>
        <p className="text-sm pb-2">Order ID: {order.id}</p>
        <p className="text-sm">
          Tanggal: {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div>
        <p className="text-lg font-bold">
          Total: {formatCurrency(order.total)}
        </p>
        <p className="font-bold">
          Status: {order.payment?.status || "pending"}
        </p>
      </div>
    </Link>
  );
}
