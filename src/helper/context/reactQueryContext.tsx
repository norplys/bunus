"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import type { ReactNode } from "react";

export default function ReactQueryContext({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
