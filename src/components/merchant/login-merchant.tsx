import { useForm, SubmitHandler } from "react-hook-form";
import LoginInput from "@/components/login/login-input";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import LoadingImage from "@/components/loading-image";
import { NEXT_PUBLIC_BACKEND_URL } from "@/lib/env";

const inputArray = [
  { label: "Email", type: "email", placeholder: "contoh@gmail.com" },
  { label: "Password", type: "password", placeholder: "Password" },
];

export default function LoginMerchant() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { push } = useRouter();
  const onSubmit: SubmitHandler<Record<string, any>> = async (data) => {
    try {
      const postData = {
        email: data.Email,
        password: data.Password,
      };
      const res = axios.post(
        `${NEXT_PUBLIC_BACKEND_URL}/v1/login/merchant`,
        postData,
      );
      const res2 = await toast.promise(
        res,
        {
          loading: "Mohon Tunggu...",
          success: "Berhasil Masuk !",
          error: "Gagal Masuk !",
        },
        {
          position: "bottom-left",
        },
      );
      localStorage.setItem("token", res2.data.data.token);
      push(`/merchant/menu`);
    } catch (err) {
      if (err instanceof AxiosError) {
        switch (err.response?.status) {
          case 400:
            toast.error("Email Atau Password Salah !", {
              position: "bottom-left",
            });
            break;
          case 404:
            toast.error(
              "Email tidak ditemukan, Silahkan daftar terlebih dahulu !",
              {
                position: "bottom-left",
              },
            );
            break;
          case 401:
            toast.error(
              "Email belum terverifikasi silahkan periksa email anda",
              {
                position: "bottom-left",
              },
            );
            break;
          case 403:
            toast.error("Anda tidak memiliki akses", {
              position: "bottom-left",
            });
            break;
          default:
            toast.error("Terjadi Kesalahan, mohon coba kembali !", {
              position: "bottom-left",
            });
            break;
        }
        return;
      }
      toast.error("Terjadi Kesalahan, mohon coba kembali !", {
        position: "bottom-left",
      });
    }
  };
  return (
    <form
      className="grid gap-5 w-full max-w-96"
      onSubmit={handleSubmit(onSubmit)}
    >
      {inputArray.map((input, index) => (
        <LoginInput
          key={index}
          label={input.label}
          type={input.type}
          register={register}
          error={errors}
          placeholder={input.placeholder}
        />
      ))}
      <button
        className="bg-gradient-to-r from-primary-cyan via-purple-500 to-primary-orange text-white 
        font-bold rounded-md p-2 bg-800% bg-50% hover:bg-100% duration-700 shadow-xl flex justify-center items-center"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? <LoadingImage /> : "Masuk"}
      </button>
    </form>
  );
}
