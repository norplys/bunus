"use client";

import { ReactNode } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { Placeholder } from "@/components/common/placeholder";
import Link from "next/link";

export function ProtectedDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Placeholder />;
  }

  const ALLOWED_USER_ROLES = ["ADMIN"];

  const forbidden = user && !ALLOWED_USER_ROLES.includes(user.role);

  if (forbidden) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-foreground text-5xl font-bold text-primary-foreground gap-3">
        <h1>403</h1>
        <p className="text-3xl">Anda tidak memiliki akses ke halaman ini</p>
        <Link href="/" className="text-xl bg-accent p-2 rounded-lg">
          Kembali ke halaman utama
        </Link>
      </div>
    );
  }

  return children;
}
