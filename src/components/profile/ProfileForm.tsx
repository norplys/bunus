import LoginInput from "../login/loginInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from "@/helper/context/userContext";

const inputArray = [
  { label: "Nama", type: "text", placeholder: "Nama" },
  { label: "Telepon", type: "text", placeholder: "Telepon" },
  { label: "Email", type: "email", placeholder: "email@gmail.com" },
  { label: "Password", type: "password", placeholder: "Password" },
];
export default function ProfileForm() {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      Nama: user?.name || "",
      Telepon: user?.phone || "",
      Email: user?.email || "",
      Password: "",
    },
  });
  return (
    <form
      action=""
      className="grid gap-5 col-span-2 w-full border-l-2 border-primary-orange pl-10 border-dashed"
    >
      {inputArray.map((input, index) => (
        <LoginInput
          key={index}
          label={input.label}
          type={input.type}
          placeholder={input.placeholder}
          register={register}
          error={errors}
        />
      ))}
      <button
        className="bg-gradient-to-r from-primary-cyan via-purple-500 to-primary-orange text-white font-bold rounded-md p-2 bg-800% bg-50% hover:bg-100% duration-700 shadow-xl"
        type="submit"
        disabled={isSubmitting}
      >
        Update
      </button>
    </form>
  );
}
