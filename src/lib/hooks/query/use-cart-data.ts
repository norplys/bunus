import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
// import type { Category } from "@/lib/types/schema" chane to schema;
import { ApplicationError, fetcher } from "@/lib/fetcher";

type CartResponse = APIResponse<unknown>;

export function useCartData(
  token: string | null,
): UseQueryResult<CartResponse, ApplicationError> {
  const result = useQuery<CartResponse, ApplicationError>({
    queryKey: ["cart", token],
    queryFn: (): Promise<CartResponse> =>
      fetcher(`/v1/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  return result;
}
