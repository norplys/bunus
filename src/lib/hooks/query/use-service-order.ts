import { useSearchParams } from "next/navigation";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useAuth } from "@/lib/context/auth-context";
import { type ApplicationError, fetcher } from "@/lib/fetcher";
import type { Order } from "@/lib/types/schema";
import type { APIResponse } from "@/lib/types/api";

type OrderCashierResponse = APIResponse<Order[]>;

export function useServiceOrder(): UseQueryResult<
  OrderCashierResponse,
  ApplicationError
> {
  const searchParams = useSearchParams();

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const date = searchParams.get("date") || todayString;

  const defaultStatus =
    "UNPAID,UNPAID_DELIVERING,UNPAID_COOKING,COOKING,DELIVERING";
  const orderStatus = searchParams.get("order_status") || defaultStatus;

  const { token } = useAuth();

  const result = useQuery<OrderCashierResponse, ApplicationError>({
    queryKey: ["order", token, orderStatus, date],
    queryFn: (): Promise<OrderCashierResponse> =>
      fetcher(`/orders?date=${date}&orderStatus=${orderStatus}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    retry: (failureCount, error) => {
      return ![403, 404].includes(error.statusCode) && failureCount < 3;
    },
  });

  return result;
}
