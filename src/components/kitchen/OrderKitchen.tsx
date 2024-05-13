export default function OrderKitchen({
  data,
  setIsOpen,
  isLoading,
  refId,
}: {
  data: any;
  isLoading: boolean;
  setIsOpen: (value: boolean) => void;
  refId: any;
}) {
  return (
    <div className="flex flex-col md:hidden">
      {isLoading
        ? "loading"
        : data.map((order: any, index: number) => (
            <div
              className={`justify-between items-center p-2 h-32 border-b-2 bg-orange-50 border-primary-orange grid grid-cols-3 grid-rows-2 ${index === 0 && "border-t-2"}`}
              onClick={() => {
                setIsOpen(true);
                refId.current = order.id;
              }}
            >
              <p className="rounded-full border text-center py-1 px-3 text-xl font-bold bg-primary-orange text-white w-fit">
                {index + 1}
              </p>
              <p className="col-start-2 col-span-2 text-end font-bold text-lg ">
                {order.type}
              </p>
              <p className="text-lg font-bold">MEJA : {order.table || "-"}</p>
            </div>
          ))}
    </div>
  );
}
