import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, ApplicationError } from "@/lib/fetcher";
import { useAuth } from "@/lib/context/auth-context";
import type { APIResponse } from "@/lib/types/api";
import type { MutationResult } from "@/lib/types/query";
import { Menu } from "@/lib/types/schema";

type MutationMenuResponse = APIResponse<Menu>;

type CreateMenuSchema = Pick<
  Menu,
  | "name"
  | "description"
  | "image"
  | "price"
  | "discountPrice"
  | "available"
  | "categoryId"
>;

export type MutationMenu = {
  createMenuMutation: MutationResult<
    { data: CreateMenuSchema },
    MutationMenuResponse
  >;
  updateMenuMutation: MutationResult<
    { data: Partial<Menu>; menuId: string },
    MutationMenuResponse
  >;
  deleteMenuMutation: MutationResult<string, MutationMenuResponse>;
};

export function useMutationMenu(): MutationMenu {
  const { token } = useAuth();

  const queryClient = useQueryClient();

  const createMenuMutation = useMutation<
    MutationMenuResponse,
    ApplicationError,
    { data: CreateMenuSchema }
  >({
    mutationFn: ({ data }) =>
      fetcher("/menus", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menu"],
      });
      queryClient.invalidateQueries({
        queryKey: ["detailMenu"],
      });
    },
  });

  const updateMenuMutation = useMutation<
    MutationMenuResponse,
    ApplicationError,
    { data: Partial<Menu>; menuId: string }
  >({
    mutationFn: ({ data, menuId }) =>
      fetcher(`/menus/${menuId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menu"],
      });
      queryClient.invalidateQueries({
        queryKey: ["detailMenu"],
      });
    },
  });

  const deleteMenuMutation = useMutation<
    MutationMenuResponse,
    ApplicationError,
    string
  >({
    mutationFn: (id) =>
      fetcher(`/menus/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["menu"],
      });
    },
  });

  return {
    createMenuMutation,
    updateMenuMutation,
    deleteMenuMutation,
  };
}
