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

    retry: (failureCount, error) => {
      const stopRetry = [400, 403, 401, 404].includes(error.statusCode);
      if (stopRetry) return false;

      return failureCount < 3;
    },

    enabled: !!id,
  });

  return result;
}
