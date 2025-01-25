import OrderRow from "./order-row";
import TableLoading from "./table-loading";

type Order = {
  id: string;
  user: {
    name: string;
    email: string;
  };
  total: number;
  table: number | null;
  type: string;
};

const thArray = ["No", "No Meja", "Nama", "Tipe Pesanan", "Total", "Aksi"];

export default function OrderTable({
  data,
  setIsOpen,
  isLoading,
  refId,
  now,
}: {
  data: any;
  isLoading: boolean;
  setIsOpen: (value: boolean) => void;
  refId: any;
  now: boolean;
}) {
  console.log(data);

  return (
    <table className="w-full hidden lg:table">
      <thead className="bg-primary-cyan text-white">
        <tr className="text-center">
          {thArray.map((th) => (
            <th key={th} className="p-2">
              {th}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <TableLoading />
        ) : (
          data?.map((order: Order, index: number) => (
            <OrderRow
              key={order.id}
              order={order}
              index={index}
              refId={refId}
              setIsOpen={setIsOpen}
              now={now}
            />
          ))
        )}
      </tbody>
    </table>
  );
}
