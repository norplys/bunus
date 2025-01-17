import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
// import type { Category } from "@/lib/types/schema" chane to schema;
import { ApplicationError, fetcher } from "@/lib/fetcher";

type OrderDetailResponse = APIResponse<unknown>;

export function useOrderDetail(
  id: string,
): UseQueryResult<OrderDetailResponse, ApplicationError> {
  const result = useQuery<OrderDetailResponse, ApplicationError>({
    queryKey: ["orderDetail", id],
    queryFn: (): Promise<OrderDetailResponse> => fetcher(`/v1/orders/${id}`),
  });

  return result;
}
