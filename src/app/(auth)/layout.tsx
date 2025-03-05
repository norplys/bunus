import { Logo } from "@/components/common/logo";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Alert } from "@/components/ui/alert";
import { NEXT_PUBLIC_URL } from "@/lib/env";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthLayout>
      <main className="flex justify-center items-center min-h-screen bg-[url(/images/background/white-marmer.png)]">
        <div className="grid justify-center items-center mx-auto max-w-xl gap-5">
          <Logo text={true} icon={true} logoClassName="w-24" />
          {children}
          <Alert
            variant="info"
            message={`Periksa URL untuk memastikan Anda masuk ke ${NEXT_PUBLIC_URL}. Serangan phishing sering kali menggunakan situs web palsu untuk mengakses informasi anda.`}
            className="rounded-md border border-border p-4 bg-primary-foreground/50 backdrop-blur-xl"
          />
        </div>
      </main>
    </AuthLayout>
  );
}
