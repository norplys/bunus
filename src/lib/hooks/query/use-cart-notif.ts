import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { APIResponse } from "@/lib/types/api";
import { ApplicationError, fetcher } from "@/lib/fetcher";

type CartNotifResponse = APIResponse<number>;

export function useCartNotif(
  token: string | null,
): UseQueryResult<CartNotifResponse, ApplicationError> {
  const result = useQuery<CartNotifResponse, ApplicationError>({
    queryKey: ["cartNotif", token],
    queryFn: (): Promise<CartNotifResponse> =>
      fetcher(`/v1/cart-notif`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  return result;
}
