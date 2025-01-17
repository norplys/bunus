import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
// import type { Category } from "@/lib/types/schema" chane to schema;
import { ApplicationError, fetcher } from "@/lib/fetcher";

type OrderDataResponse = APIResponse<unknown>;

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
