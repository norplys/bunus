import Image from "next/image";
export default function Login() {
    return (
      <section className="flex min-h-screen items-center justify-center">
            <form className="flex-1 grid w-fit">
                <h1 className="text-3xl font-bold">Selamat Datang !</h1>
                <label htmlFor="">Email</label>
                <input type="email" className="border-2 rounded-md p-2 w-72" />
                <label htmlFor="">Password</label>
                <input type="password" className="border-2 rounded-md p-2 w-72" />
                <button className="bg-primary-cyan text-white font-bold rounded-md p-2 w-72">Login</button>
                <button className="bg-primary-red text-white font-bold rounded-md p-2 w-72">Register</button>
            </form>
            <div className="flex items-center justify-center gap-2 flex-1 bg-orange-400 min-h-screen">
                <Image src="./logo.svg" alt="logo" width={350} height={350} className="object-cover duration-300 rounded-full " />
                <h1 className="text-5xl font-bold text-white">BUBUR NUSANTARA</h1>
                
            </div>
      </section>
    );
}