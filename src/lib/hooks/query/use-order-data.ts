import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { APIResponse } from "@/lib/types/api";
import { Order } from "@/lib/types/schema";
import { ApplicationError, fetcher } from "@/lib/fetcher";

type OrderDataResponse = APIResponse<Order[]>;

export function useOrderData(
  token: string,
): UseQueryResult<OrderDataResponse, ApplicationError> {
  const result = useQuery<OrderDataResponse, ApplicationError>({
    queryKey: ["orderData", token],
    queryFn: (): Promise<OrderDataResponse> =>
      fetcher(`/v1/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  return result;
}
