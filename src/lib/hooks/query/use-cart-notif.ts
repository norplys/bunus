import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
// import type { Category } from "@/lib/types/schema" chane to schema;
import { ApplicationError, fetcher } from "@/lib/fetcher";

type CartNotifResponse = APIResponse<unknown>;

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
