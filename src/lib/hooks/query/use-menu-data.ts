import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
// import type { Category } from "@/lib/types/schema" chane to schema;
import { ApplicationError, fetcher } from "@/lib/fetcher";

type MenuDataResponse = APIResponse<unknown>;

export function useMenuData(
  id: string,
): UseQueryResult<MenuDataResponse, ApplicationError> {
  const result = useQuery<MenuDataResponse, ApplicationError>({
    queryKey: ["menuData", id],
    queryFn: (): Promise<MenuDataResponse> => fetcher(`/v1/menus?id=${id}`),
  });

  return result;
}
