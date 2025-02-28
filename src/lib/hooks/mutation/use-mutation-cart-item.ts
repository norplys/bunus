import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import { fetcher, type ApplicationError } from "@/lib/fetcher";
import { useAuth } from "@/lib/context/auth-context";
import type { APIResponse } from "@/lib/types/api";
import type { MutationResult } from "@/lib/types/query";
import type { CartItem } from "@/lib/types/schema";

type MutationCartItemResponse = APIResponse<CartItem>;

export type MutationCartItem = {
  queryClient: QueryClient;
  updateCartItemMutation: MutationResult<
    { data: Partial<CartItem> },
    MutationCartItemResponse
  >;
  deleteCartItemMutation: MutationResult<string, MutationCartItemResponse>;
};

export function useMutationCartItem(): MutationCartItem {
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const updateCartItemMutation = useMutation<
    MutationCartItemResponse,
    ApplicationError,
    { data: Partial<CartItem> }
  >({
    mutationFn: ({ data }: { data: Partial<CartItem> }) =>
      fetcher("/cart-items", {
        method: "PUT",
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

  const deleteCartItemMutation = useMutation<
    MutationCartItemResponse,
    ApplicationError,
    string
  >({
    mutationFn: (id) =>
      fetcher(`/cart-items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cart", token],
      }),
  });

  return {
    queryClient,
    updateCartItemMutation,
    deleteCartItemMutation,
  };
}
