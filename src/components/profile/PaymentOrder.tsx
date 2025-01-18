import formatCurrency from "@/lib/currencyFormatter";
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
const checkStatus = (status: string | null) => {
  switch (status) {
    case "settlement":
      return <p className="font-bold text-green-600">Pembayaran Berhasil</p>;
    case "pending":
      return <p className="font-bold text-yellow-600">Menunggu Pembayaran</p>;
    case "expire":
      return <p className="font-bold text-red-600">Pembayaran Kadaluarsa</p>;
    default:
      return <p className="font-bold text-red-600">Pembayaran Gagal</p>;
  }
};

export default function PaymentOrder({ order }: { order: Order }) {
  return (
    <Link
      href={
        order.payment.snap_redirect_url ? order.payment.snap_redirect_url : "/"
      }
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
        Status: {checkStatus(order.payment?.status)}
      </div>
    </Link>
  );
}
