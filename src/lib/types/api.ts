export type APIResponse<T = unknown> = {
  message: string;
  data: T;
};
