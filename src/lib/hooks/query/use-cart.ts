import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
import type { Cart } from "@/lib/types/schema";
import { ApplicationError, fetcher } from "@/lib/fetcher";

type CartResponse = APIResponse<Cart>;

export function useCart(
  token: string | null,
): UseQueryResult<CartResponse, ApplicationError> {
  const result = useQuery<CartResponse, ApplicationError>({
    queryKey: ["cart", token],
    queryFn: (): Promise<CartResponse> =>
      fetcher(`/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  return result;
}
