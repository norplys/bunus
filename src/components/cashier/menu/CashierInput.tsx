export default function AdminInput({
  register,
  errors,
  label,
  name,
  type,
  placeholder,
}: {
  register: any;
  errors: any;
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border border-primary-orange rounded-md p-1"
        {...register(name, { required: true })}
      />
      {errors.name && (
        <span className="text-red-500">{errors.name?.message}</span>
      )}
    </div>
  );
}
