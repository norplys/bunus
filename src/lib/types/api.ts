export type APIResponse<T = unknown> = {
  meta: {
    totalData: number;
  };
  message: string;
  data: T;
};
