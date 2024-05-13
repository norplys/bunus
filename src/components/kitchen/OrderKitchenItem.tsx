export default function OrderKitchenItem({ data }: { data: any }) {
  return (
    <div className="flex flex-col gap-2 bg-orange-50 w-full">
      {data.items.map((item: any, index: number) => (
        <div className="grid grid-cols-6 gap-2 border-orange-600  border-b pb-5 px-1 py-5 text-lg font-bold min-h-20 items-center">
          <p className="col-span-2 pl-2">{item.quantity}x</p>
          <p className="col-span-4">{item.menu.name}</p>
        </div>
      ))}
    </div>
  );
}
