"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();
export default function MerchantWrapper({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </section>
  );
}
