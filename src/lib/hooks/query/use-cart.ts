import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { ApplicationError, fetcher } from "@/lib/fetcher";
import { useAuth } from "@/lib/context/auth-context";
import type { APIResponse } from "@/lib/types/api";
import type { Cart } from "@/lib/types/schema";

type CartResponse = APIResponse<Cart>;

export function useCart(): UseQueryResult<CartResponse, ApplicationError> {
  const { token } = useAuth();

  const result = useQuery<CartResponse, ApplicationError>({
    queryKey: ["cart", token],
    queryFn: (): Promise<CartResponse> =>
      fetcher(`/carts/active`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    retry: (failureCount, error) => {
      const stopRetry = [400, 403, 401].includes(error.statusCode) || !token;
      if (stopRetry) return false;

      return failureCount < 3;
    },
  });

  return result;
}
