type Validation = {
  required: string;
  validate?: (value: string) => boolean | string;
};

type Props = {
  label: string;
  type: string;
  register: any;
  error: any;
  getValues?: any;
  placeholder: string;
};

export default function LoginInput({
  label,
  type,
  register,
  error,
  getValues,
  placeholder,
}: Props) {
  let validates: Validation = {
    required: "Mohon Isi Kolom Ini",
  };
  if (label === "Ulangi Password") {
    validates.validate = (value: string) => {
      return value === getValues("Password") || "Password Tidak Sama";
    };
  }
  return (
    <div className="grid">
      <label htmlFor={label} className="text-xl font-bold">
        {label}
      </label>
      <input
        {...register(label, { ...validates })}
        type={type}
        placeholder={placeholder}
        className={`border-2 rounded-md p-2 focus:outline-none ${
          error[label] && "border-red-500"
        }`}
      />
      {error[label]?.message && (
        <p className="text-red-500">{error[label]?.message}</p>
      )}
    </div>
  );
}
