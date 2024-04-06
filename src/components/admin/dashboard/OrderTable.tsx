import formatCurrency from "@/helper/currencyFormatter";
import OrderRow from "./OrderRow";

type Order = {
  id: string;
  user: {
    name: string;
    email: string;
  };
  total: number;
};

const thArray = ["No", "Order Id", "Nama", "Email", "Total", "Action"];

export default function OrderTable({
  data,
  isOpen,
  setIsOpen,
  refId,
}: {
  data: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refId: any;
}) {
  return (
    <table className="w-full">
      <thead className="bg-primary-cyan text-white">
        <tr className="text-center">
          <th className="p-2">No</th>
          <th className="p-2">Order Id</th>
          <th className="p-2">Nama</th>
          <th className="p-2">Email</th>
          <th className="p-2">Total</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((order: Order, index: number) => (
          <OrderRow
            key={order.id}
            order={order}
            index={index}
            refId={refId}
            setIsOpen={setIsOpen}
          />
        ))}
      </tbody>
    </table>
  );
}
