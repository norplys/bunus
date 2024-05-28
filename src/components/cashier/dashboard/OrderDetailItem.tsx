import formatCurrency from "@/helper/currencyFormatter";

export default function OrderDetailItem({ data }: { data: any }) {
  return (
    <div className="flex flex-col gap-2 bg-orange-50">
      {data.items.map((item: any, index: number) => (
        <div className="grid grid-cols-6 gap-2 border-orange-600  border-b pb-5 px-2 py-5 text-lg font-bold min-h-20 items-center">
          <p>{item.quantity}x</p>
          <p className="col-span-3">{item.menu.name}</p>
          <p className="col-start-5 col-span-2">{formatCurrency(item.total)}</p>
        </div>
      ))}
      <div>
        <p className="text-lg font-bold text-center py-5">
          Total : {formatCurrency(data.total)}
        </p>
      </div>
    </div>
  );
}
