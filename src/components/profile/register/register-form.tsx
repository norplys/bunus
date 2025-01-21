import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import LoginInput from "@/components/login/login-input";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { VscLoading } from "react-icons/vsc";

const inputArray = [
  { label: "Email", type: "email", placeholder: "contoh@gmail.com" },
  { label: "Name", type: "text", placeholder: "Nama Lengkap" },
  { label: "Telephone", type: "tel", placeholder: "081234567890" },
  { label: "Password", type: "password", placeholder: "Password" },
  {
    label: "Ulangi Password",
    type: "password",
    placeholder: "Ulangi Password",
  },
];

export default function RegisterForm() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit: SubmitHandler<Record<string, any>> = async (data) => {
    try {
      const postData = {
        name: data.Name,
        email: data.Email,
        password: data.Password,
        phone: data.Telephone,
      };
      const res = axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_LINK}/v1/register`,
        postData,
      );
      await toast.promise(
        res,
        {
          loading: "Mohon Tunggu...",
          success: "Berhasil Mendaftar !, Silahkan Verifikasi Email Anda !",
          error: "Gagal Mendaftar !, Mohon Coba Lagi !",
        },
        {
          position: "bottom-left",
        },
      );
      push("/login");
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          toast.error("Email Sudah Terdaftar !", {
            position: "bottom-left",
          });
          return;
        }
      }
    }
  };
  return (
    <form
      className="grid justify-center gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="xl:text-5xl text-4xl font-extrabold border-b-2 border-b-primary-orange pb-2">
        Selamat Datang !
      </h1>
      {inputArray.map((input, index) => (
        <LoginInput
          key={index}
          label={input.label}
          type={input.type}
          register={register}
          error={errors}
          getValues={getValues}
          placeholder={input.placeholder}
        />
      ))}
      <button
        className="bg-gradient-to-r from-primary-red via-purple-500 bg-800% bg-50% hover:bg-100% duration-700 to-primary-orange text-white font-bold rounded-md p-2 "
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <VscLoading className="animate-spin text-2xl font-extrabold" />
        ) : (
          "Daftar"
        )}
      </button>
    </form>
  );
}
