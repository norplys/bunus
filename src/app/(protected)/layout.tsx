import React, { ReactNode } from "react";
import { ProtectedLayout } from "@/components/layout/protected-layout";

export default function Layout({ children }: { children: ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
