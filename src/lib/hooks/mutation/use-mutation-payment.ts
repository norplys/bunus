import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import { fetcher, type ApplicationError } from "@/lib/fetcher";
import { useAuth } from "@/lib/context/auth-context";
import type { APIResponse } from "@/lib/types/api";
import type { MutationResult } from "@/lib/types/query";
import type { Payment } from "@/lib/types/schema";

type MutationPaymentResponse = APIResponse<Payment>;

export type MutationPayment = {
  queryClient: QueryClient;
  updatePaymentMutation: MutationResult<
    { data: Partial<Payment>; id: string },
    MutationPaymentResponse
  >;
};

export function useMutationPayment(): MutationPayment {
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const updatePaymentMutation = useMutation<
    MutationPaymentResponse,
    ApplicationError,
    { data: Partial<Payment>; id: string }
  >({
    mutationFn: ({ data, id }: { data: Partial<Payment>; id: string }) =>
      fetcher(`/payments/${id}`, {
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

  return {
    queryClient,
    updatePaymentMutation,
  };
}
