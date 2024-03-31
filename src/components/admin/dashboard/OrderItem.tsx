import OrderList from "./OrderList";
const Array = [
  {
    key: "Order Id",
    value: "Tesid",
  },
  {
    key: "Nama",
    value: "Admin",
  },
  {
    key: "Total",
    value: "Rp.30000",
  },
];

export default function OrderItem({ index }: { index: number }) {
  return (
    <div className=" h-48 rounded-xl grid grid-cols-6 grid-rows-4 items-center w-96 p-5 gap-3 shadow-xl border border-primary-red">
      {Array.map((item, index) => (
        <OrderList key={index} objectKey={item.key} value={item.value} />
      ))}
      <p className="col-span-3 text-white font-bold text-xl rounded-full bg-primary-red py-1 text-center w-9">
        {index}
      </p>
      <button className="col-span-3 text-white font-bold rounded-xl bg-primary-orange py-1">
        Selesai
      </button>
    </div>
  );
}
