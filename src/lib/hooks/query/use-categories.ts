import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
import type { Category } from "@/lib/types/schema";
import { ApplicationError, fetcher } from "@/lib/fetcher";

type CategoriesResponse = APIResponse<Category[]>;

export function useCategories(): UseQueryResult<
  CategoriesResponse,
  ApplicationError
> {
  const result = useQuery<CategoriesResponse, ApplicationError>({
    queryKey: ["categories"],
    queryFn: (): Promise<CategoriesResponse> => fetcher("/v1/categories"),
  });

  return result;
}
