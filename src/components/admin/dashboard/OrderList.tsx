export default function OrderList({
  objectKey,
  value,
}: {
  objectKey: string;
  value: string;
}) {
  return (
    <>
      <p className="font-bold text-lg col-span-2">{objectKey}</p>
      <p className="font-bold text-lg">:</p>
      <p className="font-bold text-lg col-span-3">{value}</p>
    </>
  );
}
