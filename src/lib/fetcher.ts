import { NEXT_PUBLIC_BACKEND_URL } from "./env";
import type { APIResponse } from "./types/api";

export class ApplicationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * A fetcher function that adds the owner bearer token to the request.
 */
export async function fetcher<T>(
  input: string,
  init?: RequestInit,
): Promise<APIResponse<T>> {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${input}`, init);

    const data = (await res.json()) as APIResponse<T>;

    if (!res.ok) throw new ApplicationError(data.message, res.status);

    return data;
  } catch (err) {
    if (err instanceof ApplicationError) throw err;
    if (err instanceof Error) throw new ApplicationError(err.message, 500);

    throw new ApplicationError("An unknown error occurred", 500);
  }
}
