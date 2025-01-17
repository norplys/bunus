import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
// import type { Category } from "@/lib/types/schema" chane to schema;
import { ApplicationError, fetcher } from "@/lib/fetcher";

type OrderKitchenResponse = APIResponse<unknown>;

export function useOrderKitchen(
  token: string,
): UseQueryResult<OrderKitchenResponse, ApplicationError> {
  const result = useQuery<OrderKitchenResponse, ApplicationError>({
    queryKey: ["orderKitchen", token],
    queryFn: (): Promise<OrderKitchenResponse> =>
      fetcher(`/v1/orders/kitchen`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  return result;
}
