import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { ApplicationError, fetcher } from "@/lib/fetcher";
import { useAuth } from "@/lib/context/auth-context";
import type { APIResponse } from "@/lib/types/api";
import type { OrderDetail } from "@/lib/types/schema";

type OrderDetailResponse = APIResponse<OrderDetail>;

export function useDetailOrder(
  id: string,
): UseQueryResult<OrderDetailResponse, ApplicationError> {
  const { token } = useAuth();

  const result = useQuery<OrderDetailResponse, ApplicationError>({
    queryKey: ["orderDetail", id],

    queryFn: (): Promise<OrderDetailResponse> =>
      fetcher(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    retry: (failureCount, error) => {
      const stopRetry = [400, 403, 401, 404].includes(error.statusCode);
      if (stopRetry) return false;

      return failureCount < 3;
    },

    enabled: !!id,
  });

  return result;
}
