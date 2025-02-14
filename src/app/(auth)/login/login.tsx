"use client";

import { z } from "zod";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { SiGoogle } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/context/auth-context";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

const loginPayload = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export type LoginSchema = z.infer<typeof loginPayload>;

export function Login({ admin }: { admin: boolean }) {
  const { handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginPayload),
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    toast.dismiss();

    const { email, password } = data;

    const loginPromise = handleLogin(email, password).then((errorMessage) => {
      if (errorMessage) throw new Error(errorMessage);

      return null;
    });

    await toast
      .promise(loginPromise, {
        loading: "Memuat...",
        success: "Berhasil Masuk, mengalihkan...",
        error: (error) => {
          if (error instanceof Error) {
            return error.message;
          }

          return "Terjadi kesalahan. Silahkan Coba Kembali";
        },
      })
      .catch(() => null);
  };

  return (
    <div className="rounded-md border border-border bg-primary-foreground/50 backdrop-blur-xl p-8">
      <h1 className="text-foreground text-2xl font-extrabold">Masuk</h1>
      <form className="grid gap-5 mt-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          type="email"
          label="Email"
          error={errors.email}
          register={register("email")}
          placeholder="example@gmail.com"
          disabled={isSubmitting}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          error={errors.password}
          register={register("password")}
          placeholder="12345678"
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          className="w-full bg-foreground py-3 font-bold text-primary-foreground"
        >
          Login
        </Button>
        <Button
          className="w-full bg-primary-foreground py-3 font-bold text-forebg-foreground flex items-center justify-center gap-2 border border-foreground"
          onClick={() => toast("Coming soon!")}
        >
          <SiGoogle className="text-xl" />
          Login with Google
        </Button>
      </form>
      {!admin && (
        <div className="text-center mt-4">
          Belum punya akun?{" "}
          <Link href={"/register"} className="text-accent font-bold">
            Daftar Disini
          </Link>
        </div>
      )}
    </div>
  );
}
