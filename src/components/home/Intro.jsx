import Image from 'next/image'
export default function Intro(){
    return (
        <div className="flex min-w-full items-center justify-center gap-52 py-8 ">
        <div className=" grid gap-2">
          <h1 className="font-bold text-6xl">Selamat Datang !</h1>
          <div className="mt-2 text-lg">
            Laper ?? Tapi bingung mau makan apa ? <br/>Bubur Nusantara jawabannya !
          </div>
          <button className='py-2 px-4 font-bold rounded-xl mt-2 w-fit bg-primary-red shadow-xl text-white text-xl'>Pesan Sekarang !</button>
        </div>
        <div className='overflow-hidden rounded-full border-primary-orange border-4 border-dashed shadow-2xl'>
        <Image src={"/logo.svg"} width={400} height={400} className='object-cover w-full animate-spin-slow'></Image>
        </div>
      </div>
    )
}