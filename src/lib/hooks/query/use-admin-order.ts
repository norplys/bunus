import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
import type { Analytics } from "@/lib/types/schema";
import { ApplicationError, fetcher } from "@/lib/fetcher";

type AdminOrderResponse = APIResponse<Analytics>;

export function useAdminOrder(
  token: string | null,
  date: string,
): UseQueryResult<AdminOrderResponse, ApplicationError> {
  const result = useQuery<AdminOrderResponse, ApplicationError>({
    queryKey: ["adminOrder", token, date],
    queryFn: (): Promise<AdminOrderResponse> =>
      fetcher(`/v1/orders/admin?date=${date}`),
  });

  return result;
}
