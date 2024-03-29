"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

const queryClient = new QueryClient();
export default function NavbarWrapper({ children }: { children: ReactNode }) {
  return (
    <section>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <div className="pt-20">{children}</div>
        <Footer />
      </QueryClientProvider>
    </section>
  );
}
