import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
import type { Menu } from "@/lib/types/schema";
import { ApplicationError, fetcher } from "@/lib/fetcher";

type MenuDataResponse = APIResponse<Menu[]>;

export function useMenu(
  categoryId: string | null,
): UseQueryResult<MenuDataResponse, ApplicationError> {
  const categoryQuery = categoryId ? `?categoryId=${categoryId}` : "";

  const result = useQuery<MenuDataResponse, ApplicationError>({
    queryKey: ["menu", categoryId],
    queryFn: (): Promise<MenuDataResponse> => fetcher(`/menus${categoryQuery}`),
  });

  return result;
}
