import type { ApplicationError } from "../fetcher";
import type { UseMutationResult } from "@tanstack/react-query";

export type APIResponse<T = unknown> = {
  message: string;
  data: T;
};

export type MutationResult<T = unknown, V = unknown> = UseMutationResult<
  V,
  ApplicationError,
  T,
  unknown
>;
