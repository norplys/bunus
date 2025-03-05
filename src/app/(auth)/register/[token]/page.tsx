"use client";

import { Placeholder } from "@/components/common/placeholder";
import { fetcher } from "@/lib/fetcher";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const { token } = useParams();

  const router = useRouter();

  const validateToken = async () => {
    const response = fetcher(`/auth/validate-email/${token}`);

    await toast
      .promise(response, {
        loading: "Memuat...",
        success: "Email berhasil diverifikasi",
        error: "Token tidak valid",
      })
      .then(() => {
        router.push("/login");
      })
      .catch(() => {
        router.push("/");
      });
  };

  useEffect(() => {
    validateToken();
  }, []);

  return <Placeholder />;
}
