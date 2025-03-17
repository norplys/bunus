import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import { fetcher, type ApplicationError } from "@/lib/fetcher";
import { useAuth } from "@/lib/context/auth-context";
import type { APIResponse } from "@/lib/types/api";
import type { User } from "@/lib/types/schema";
import type { MutationResult } from "@/lib/types/query";

type MutationUserResponse = APIResponse<User>;

export type CreateServiceUserSchema = Pick<
  User,
  "email" | "name" | "password" | "role"
>;

export type MutationUser = {
  queryClient: QueryClient;
  createServiceUserMutation: MutationResult<
    { data: CreateServiceUserSchema },
    MutationUserResponse
  >;
  updateServiceUserMutation: MutationResult<
    { data: Partial<User>; id: string },
    MutationUserResponse
  >;
  deleteServiceUserMutation: MutationResult<string, MutationUserResponse>;
};

export function useMutationUser(): MutationUser {
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const createServiceUserMutation = useMutation<
    MutationUserResponse,
    ApplicationError,
    { data: CreateServiceUserSchema }
  >({
    mutationFn: ({ data }: { data: CreateServiceUserSchema }) =>
      fetcher("/users/service", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["serviceUsers"],
      });
    },
  });

  const updateServiceUserMutation = useMutation<
    MutationUserResponse,
    ApplicationError,
    { data: Partial<User>; id: string }
  >({
    mutationFn: ({ data, id }: { data: Partial<User>; id: string }) =>
      fetcher(`/users/service/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["serviceUsers"],
      });
    },
  });

  const deleteServiceUserMutation = useMutation<
    MutationUserResponse,
    ApplicationError,
    string
  >({
    mutationFn: (id: string) =>
      fetcher(`/users/service/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["serviceUsers"],
      });
    },
  });

  return {
    queryClient,
    updateServiceUserMutation,
    createServiceUserMutation,
    deleteServiceUserMutation,
  };
}
