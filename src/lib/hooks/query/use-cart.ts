import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { ApplicationError, fetcher } from "@/lib/fetcher";
import { useAuth } from "@/lib/context/auth-context";
import type { APIResponse } from "@/lib/types/api";
import type { Cart } from "@/lib/types/schema";

type CartResponse = APIResponse<Cart> | null;

export function useCart(): UseQueryResult<CartResponse, ApplicationError> {
  const { token } = useAuth();

  const result = useQuery<CartResponse, ApplicationError>({
    queryKey: ["cart", token],

    queryFn: async (): Promise<CartResponse> => {
      try {
        return await fetcher(`/carts/active`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        if ((error as ApplicationError).statusCode === 404) {
          return null;
        }
        throw error;
      }
    },

    retry: (failureCount, error) => {
      return ![403, 404].includes(error.statusCode) && failureCount < 3;
    },
    enabled: !!token,
  });

  return result;
}
