import { useForm, SubmitHandler } from "react-hook-form";
import LoginInput from "@/components/login/loginInput";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useUser } from "@/helper/context/userContext";
import LoadingImage from "@/components/LoadingImage";

const inputArray = [
  { label: "Email", type: "email", placeholder: "contoh@gmail.com" },
  { label: "Password", type: "password", placeholder: "Password" },
];

export default function LoginAdmin() {
  const { setUser } = useUser();
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
        "https://bunus-be-production.up.railway.app/v1/login/admin",
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
      push(`/dashboard?token=${res2.data.data.token}`);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          toast.error("Email Atau Password Salah !", {
            position: "bottom-left",
          });
          return;
        }
        if (err.response?.status === 404) {
          toast.error(
            "Email tidak ditemukan, Silahkan daftar terlebih dahulu !",
            {
              position: "bottom-left",
            },
          );
          return;
        }
        if (err.response?.status === 401) {
          toast.error("Email belum terverifikasi silahkan periksa email anda", {
            position: "bottom-left",
          });
          return;
        }
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
        className="bg-gradient-to-r from-primary-cyan via-purple-500 to-primary-orange text-white font-bold rounded-md p-2 bg-800% bg-50% hover:bg-100% duration-700 shadow-xl flex justify-center items-center"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? <LoadingImage /> : "Masuk"}
      </button>
    </form>
  );
}
