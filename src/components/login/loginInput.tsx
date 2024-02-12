export default function LoginInput({label, type, register, error} : {label: string, type: string, register: any, error : any}){
    return (
        <div className="grid">
            <label htmlFor={label} className="text-xl font-bold">{label}</label>
            <input {...register(label, {
                required: {value: true, message: `${label} is required`}
                })} type={type} className={`border-2 rounded-md p-2 focus:outline-none ${error[label] && 'border-red-500'}`} />
            {error[label]?.message && <p className="text-red-500">{error[label]?.message}</p>}
        </div>
    )
}
