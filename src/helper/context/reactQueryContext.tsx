"use client";
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import type { ReactNode } from "react";

export function ReactQueryContext({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
