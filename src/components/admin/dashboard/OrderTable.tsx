type Order = {
  id: number;
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
          <tr
            key={order.id}
            className="border-b-2 border-orange-100 text-center font-semibold bg-orange-50"
          >
            <td className="p-2">{index + 1}</td>
            <td className="p-2">{order.id}</td>
            <td className="p-2">{order.user.name}</td>
            <td className="p-2">{order.user.email}</td>
            <td className="p-2">{order.total}</td>
            <td className="p-2 flex gap-5 justify-center">
              <button className="bg-green-500 text-white font-bold p-2 rounded-md">
                Selesai
              </button>
              <button
                onClick={() => {
                  setIsOpen(true), (refId.current = order.id);
                }}
                className="bg-primary-red text-white font-bold p-2 rounded-md"
              >
                Lihat
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
