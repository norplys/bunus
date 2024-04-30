"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

export default function MerchantWrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <section className="min-h-screen">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </section>
  );
}
