import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import { fetcher, type ApplicationError } from "@/lib/fetcher";
import { useAuth } from "@/lib/context/auth-context";
import type { APIResponse } from "@/lib/types/api";
import type { MutationResult } from "@/lib/types/query";
import type { Order } from "@/lib/types/schema";

type MutationOrderResponse = APIResponse<Order>;

export type MutationOrder = {
  queryClient: QueryClient;
  createOrderMutation: MutationResult<
    { data: Partial<Order> },
    MutationOrderResponse
  >;
};

export function useMutationOrder(): MutationOrder {
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const createOrderMutation = useMutation<
    MutationOrderResponse,
    ApplicationError,
    { data: Partial<Order> }
  >({
    mutationFn: ({ data }: { data: Partial<Order> }) =>
      fetcher("/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cart", token],
      }),
  });

  return {
    queryClient,
    createOrderMutation,
  };
}
