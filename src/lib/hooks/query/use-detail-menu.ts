import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
// import type { Category } from "@/lib/types/schema" chane to schema;
import { ApplicationError, fetcher } from "@/lib/fetcher";

type DetailMenuResponse = APIResponse<unknown>;

export function useDetailMenu(
  id: string,
): UseQueryResult<DetailMenuResponse, ApplicationError> {
  const result = useQuery<DetailMenuResponse, ApplicationError>({
    queryKey: ["detailMenu", id],
    queryFn: (): Promise<DetailMenuResponse> => fetcher(`/v1/menus/${id}`),
  });

  return result;
}
