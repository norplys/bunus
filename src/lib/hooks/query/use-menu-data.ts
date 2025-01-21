import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
import type { Menu } from "@/lib/types/schema";
import { ApplicationError, fetcher } from "@/lib/fetcher";

type MenuDataResponse = APIResponse<Menu[]>;

export function useMenuData(
  id: string,
): UseQueryResult<MenuDataResponse, ApplicationError> {
  const result = useQuery<MenuDataResponse, ApplicationError>({
    queryKey: ["menuData", id],
    queryFn: (): Promise<MenuDataResponse> => fetcher(`/v1/menus?id=${id}`),
  });

  return result;
}
