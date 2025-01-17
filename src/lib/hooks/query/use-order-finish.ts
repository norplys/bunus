import { useQuery, type UseQueryResult } from "react-query";
import type { APIResponse } from "@/lib/types/api";
// import type { Category } from "@/lib/types/schema" chane to schema;
import { ApplicationError, fetcher } from "@/lib/fetcher";

type OrderFinishResponse = APIResponse<unknown>;

export function useOrderFinish(
  date: string,
): UseQueryResult<OrderFinishResponse, ApplicationError> {
  const result = useQuery<OrderFinishResponse, ApplicationError>({
    queryKey: ["orderFinish", date],
    queryFn: (): Promise<OrderFinishResponse> =>
      fetcher(`/v1/orders/success?date=${date}`),
  });

  return result;
}
