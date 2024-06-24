import { useOrderData } from "@/helper/hooks/useOrderData";
import PaymentOrder from "./PaymentOrder";
import PaymentLoading from "./PaymentLoading";
import { useUser } from "@/helper/context/userContext";

const LoadingArray = new Array(6).fill(0);
export default function PaymentHistory() {
  const { token } = useUser();
  const { data, isLoading } = useOrderData(token!);
  return (
    <div className="col-span-2 max-h-[408px]  w-full md:border-l-2 md:border-primary-orange md:px-10 md:border-dashed overflow-y-scroll flex flex-col gap-6 px-3">
      {isLoading
        ? LoadingArray.map((_, index) => {
            return <PaymentLoading key={index} />;
          })
        : data
            .map((order: any, index: number) => {
              return <PaymentOrder order={order} key={index} />;
            })
            .reverse()}
    </div>
  );
}
