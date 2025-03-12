import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApplicationError, fetcher } from "@/lib/fetcher";
import { useAuth } from "@/lib/context/auth-context";
import type { APIResponse } from "@/lib/types/api";
import type { Category } from "@/lib/types/schema";
import type { MutationResult } from "@/lib/types/query";

type MutationCategoryResponse = APIResponse<Category>;

type createCategorySchema = Pick<Category, "name">;

export type MutationCategory = {
  createCategoryMutation: MutationResult<
    { data: createCategorySchema },
    MutationCategoryResponse
  >;
  updateCategoryMutation: MutationResult<
    { data: Partial<Category>; categoryId: string },
    MutationCategoryResponse
  >;
  deleteCategoryMutation: MutationResult<string, MutationCategoryResponse>;
};

export function useMutationCategory(): MutationCategory {
  const { token } = useAuth();

  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation<
    MutationCategoryResponse,
    ApplicationError,
    { data: createCategorySchema }
  >({
    mutationFn: ({ data }) =>
      fetcher("/categories", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const updateCategoryMutation = useMutation<
    MutationCategoryResponse,
    ApplicationError,
    { data: Partial<Category>; categoryId: string }
  >({
    mutationFn: ({ data, categoryId }) =>
      fetcher(`/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const deleteCategoryMutation = useMutation<
    MutationCategoryResponse,
    ApplicationError,
    string
  >({
    mutationFn: (categoryId) =>
      fetcher(`/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  return {
    createCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
  };
}
