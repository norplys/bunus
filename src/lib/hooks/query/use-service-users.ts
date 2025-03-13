import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useAuth } from "@/lib/context/auth-context";
import { type ApplicationError, fetcher } from "@/lib/fetcher";
import type { User } from "@/lib/types/schema";
import type { APIResponse } from "@/lib/types/api";

type ServiceUserResponse = APIResponse<User[]>;

export function useServiceUsers(): UseQueryResult<
  ServiceUserResponse,
  ApplicationError
> {
  const { token } = useAuth();

  const result = useQuery<ServiceUserResponse, ApplicationError>({
    queryKey: ["serviceUsers", token],
    queryFn: (): Promise<ServiceUserResponse> =>
      fetcher("/users/service", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    retry: (failureCount, error) => {
      return ![403, 404].includes(error.statusCode) && failureCount < 3;
    },
  });

  return result;
}
