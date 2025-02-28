import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import { fetcher, type ApplicationError } from "@/lib/fetcher";
import { useAuth } from "@/lib/context/auth-context";
import type { APIResponse } from "@/lib/types/api";
import type { MutationResult } from "@/lib/types/query";
import type { Order, Payment } from "@/lib/types/schema";

type MutationOrderResponse = APIResponse<Order>;
type MutationPaymentResponse = APIResponse<Payment>;

export type MutationOrder = {
  queryClient: QueryClient;
  createOrderMutation: MutationResult<
    { data: Partial<Order> },
    MutationOrderResponse
  >;
  updateOrderMutation: MutationResult<
    { data: Partial<Order>; id: string },
    MutationOrderResponse
  >;
  createPublicOrderMutation: MutationResult<
    { data: Partial<Order> },
    MutationPaymentResponse
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

  const updateOrderMutation = useMutation<
    MutationOrderResponse,
    ApplicationError,
    { data: Partial<Order>; id: string }
  >({
    mutationFn: ({ data, id }: { data: Partial<Order>; id: string }) =>
      fetcher(`/orders/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orderDetail"],
      });
    },
  });

  const createPublicOrderMutation = useMutation<
    MutationPaymentResponse,
    ApplicationError,
    { data: Partial<Order> }
  >({
    mutationFn: ({ data }: { data: Partial<Order> }) =>
      fetcher("/orders/public", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      }),
  });

  return {
    queryClient,
    createOrderMutation,
    updateOrderMutation,
    createPublicOrderMutation,
  };
}
