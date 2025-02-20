"use client";

import { useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { useSearchParams } from "next/navigation";
import { sleep } from "@/lib/helper";
import { isServiceUserRole } from "@/lib/types/enum";
import { Placeholder } from "../common/placeholder";

export function AuthLayout({ children }: { children: ReactNode }): ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pending, setPending] = useState(true);

  const { user, loading } = useAuth();

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      setPending(true);

      if (user) {
        let redirect = searchParams.get("redirect") ?? "/";

        const userRole = user.role;

        if (userRole === "ADMIN") {
          redirect = "/dashboard";
        }

        if (isServiceUserRole(userRole)) {
          const urlRole = userRole.toLowerCase();
          redirect = `/service/${urlRole}`;
        }

        router.replace(redirect);
      } else if (!loading) {
        await sleep(500);
        setPending(false);
      }
    };

    void checkLogin();
  }, [user, loading]);

  if (loading || pending) return <Placeholder />;

  return children;
}
