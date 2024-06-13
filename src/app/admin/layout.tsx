"use client";
import { ReactNode } from "react";

export default function AdminWrapper({ children }: { children: ReactNode }) {
  return <section className="min-h-screen">{children}</section>;
}
