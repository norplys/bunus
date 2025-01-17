import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
// import type { Category } from "@/lib/types/schema" chane to schema;
import { ApplicationError, fetcher } from "@/lib/fetcher";

type OrderCashierResponse = APIResponse<unknown>;

export function useOrderCashier(
  token: string,
): UseQueryResult<OrderCashierResponse, ApplicationError> {
  const result = useQuery<OrderCashierResponse, ApplicationError>({
    queryKey: ["orderCashier", token],
    queryFn: (): Promise<OrderCashierResponse> =>
      fetcher(`/v1/orders/cashier`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  return result;
}
