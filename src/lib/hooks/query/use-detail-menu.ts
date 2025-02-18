import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { APIResponse } from "@/lib/types/api";
import type { DetailMenu } from "@/lib/types/schema";
import { ApplicationError, fetcher } from "@/lib/fetcher";

type DetailMenuResponse = APIResponse<DetailMenu>;

export function useDetailMenu(
  id: string,
): UseQueryResult<DetailMenuResponse, ApplicationError> {
  const result = useQuery<DetailMenuResponse, ApplicationError>({
    queryKey: ["detailMenu", id],
    queryFn: (): Promise<DetailMenuResponse> => fetcher(`/menus/${id}`),
  });

  return result;
}
