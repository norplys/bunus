import { VscLoading } from "react-icons/vsc";
import LoginInput from "@/components/login/loginInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
const inputArray = [
  { label: "Password", type: "password", placeholder: "Password" },
  {
    label: "Ulangi Password",
    type: "password",
    placeholder: "Ulangi Password",
  },
];

export default function ResetForm() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit: SubmitHandler<Record<string, string>> = async (data) => {
    try {
      const res = axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/reset-password/${token}`,
        {
          password: data.Password,
        },
      );
      await toast.promise(
        res,
        {
          loading: "Mohon Tunggu...",
          success: "Berhasil Merubah Password !",
          error: "Gagal Merubah Password !, Mohon Coba Lagi !",
        },
        {
          position: "bottom-left",
        },
      );
      push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.error("Token Tidak Valid !", {
            position: "bottom-left",
          });
          push("/forgot-password");
          return;
        }
      }
    }
  };

  return (
    <form action="" className="flex flex-col gap-5 max-w-96">
      <p>Masukkan Password Baru</p>
      {inputArray.map((input, index) => (
        <LoginInput
          key={index}
          label={input.label}
          type={input.type}
          getValues={getValues}
          register={register}
          placeholder={input.placeholder}
          error={errors}
        />
      ))}
      <button
        className="bg-gradient-to-l from-primary-orange via-purple-500 to-primary-red text-white font-bold rounded-md p-2 duration-700 xl:w-96 shadow-2xl bg-800% bg-50% hover:bg-100% flex justify-center"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <VscLoading className="animate-spin text-2xl font-extrabold" />
        ) : (
          "Ubah Password"
        )}
      </button>
    </form>
  );
}
