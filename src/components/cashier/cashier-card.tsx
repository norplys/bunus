import { Order } from "@/lib/types/schema";
import { CiWheat } from "react-icons/ci";
import { MdDeliveryDining } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { formatCurrency } from "@/lib/currency-formatter";

type CashierCardProps = {
  order: Order;
  changeId: (id: string) => void;
};

const orderIcon = {
  DINE_IN: <CiWheat />,
  DELIVERY: <MdDeliveryDining />,
  TAKE_AWAY: <FaBox />,
};

export function CashierCard({ order, changeId }: CashierCardProps) {
  const orderProfile = order.queue || order.user.name;
  const orderType = order.type;
  const parsedStatus = order.status.split("_");

  const handleColor =
    parsedStatus[0] === "UNPAID"
      ? "text-red-500"
      : parsedStatus[0] === "COMPLETED"
        ? "text-green-500"
        : "text-yellow-500";

  return (
    <div
      className="flex justify-between md:text-lg font-semibold border-b-4 py-4"
      onClick={() => changeId(order.id)}
    >
      <div>
        <p className="flex items-center gap-2 mb-2">
          {orderIcon[orderType]} - {orderType.split("_").join(" ")}
        </p>
        <h1>{orderProfile}</h1>
      </div>
      <div className="grid justify-items-end items-end">
        <p className={handleColor}>{parsedStatus.join(" ")}</p>
        <p>{formatCurrency(order.total)}</p>
      </div>
    </div>
  );
}
