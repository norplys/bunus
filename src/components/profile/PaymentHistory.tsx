import { useOrderData } from "@/helper/hooks/useOrderData";
import PaymentOrder from "./PaymentOrder";
import PaymentLoading from "./PaymentLoading";

const LoadingArray = new Array(6).fill(0);
export default function PaymentHistory() {
  const token = localStorage.getItem("token");
  const { data, isLoading } = useOrderData(token!);
  console.log(data);
  return (
    <div className="col-span-2  w-full h-full border-l-2 border-primary-orange px-10 border-dashed overflow-y-auto flex flex-col gap-6 ">
      {isLoading
        ? LoadingArray.map((_, index) => {
            return <PaymentLoading key={index} />;
          })
        : data.map((order: any) => {
            return <PaymentOrder order={order} />;
          })}
    </div>
  );
}
