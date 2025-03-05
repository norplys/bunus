"use client";

import { z } from "zod";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { sleep } from "@/lib/helper";

const loginPayload = z.object({
  name: z.string(),
  phoneNumber: z.string().min(10).max(10),
  email: z.string().email(),
  password: z.string().min(5),
});

export type LoginSchema = z.infer<typeof loginPayload>;

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginPayload),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    toast.dismiss();

    const registerPromise = fetcher("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    await toast
      .promise(registerPromise, {
        loading: "Memuat...",
        success: "Berhasil Mendaftar, silahkan cek email anda",
        error: (error) => {
          if (error instanceof Error) {
            return error.message;
          }

          return "Terjadi kesalahan. Silahkan Coba Kembali";
        },
      })
      .then(async () => {
        await sleep(1000);
        router.push("/login");
      })
      .catch(() => null);
  };

  return (
    <div className="rounded-md border border-border bg-primary-foreground/50 backdrop-blur-xl p-8">
      <h1 className="text-foreground text-2xl font-extrabold">Daftar</h1>
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
          id="name"
          type="text"
          label="Nama"
          error={errors.name}
          register={register("name")}
          placeholder="John Doe"
          disabled={isSubmitting}
        />
        <Input
          id="phoneNumber"
          type="tel"
          label="Nomor Telepon"
          error={errors.phoneNumber}
          register={register("phoneNumber")}
          placeholder="12345678910"
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
          Daftar
        </Button>
        <div className="text-center mt-4">
          Sudah punya akun?{" "}
          <Link href={"/login"} className="text-accent font-bold">
            Login Disini
          </Link>
        </div>
      </form>
    </div>
  );
}
