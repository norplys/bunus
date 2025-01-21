import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
import { ApplicationError, fetcher } from "@/lib/fetcher";

type CategoriesCountResponse = APIResponse<number>;

export function useCategoryCount(): UseQueryResult<
  CategoriesCountResponse,
  ApplicationError
> {
  const result = useQuery<CategoriesCountResponse, ApplicationError>({
    queryKey: ["categoriesCount"],
    queryFn: (): Promise<CategoriesCountResponse> =>
      fetcher(`/v1/categories/count`),
  });

  return result;
}
