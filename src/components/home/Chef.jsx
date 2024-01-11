import Image from "next/image";
export default function Chef() {
  return (
    <section className="w-full flex justify-between">
      <div className=" bg-primary-orange bg-opacity-80 min-w-[45%] rounded-r-full px-5 pt-3 flex justify-center">
        <Image
          src={"/chef.svg"}
          width={500}
          height={500}
        ></Image>
      </div>
      <div className="w-[45%] flex flex-col justify-center gap-5">
        <h1 className="font-bold text-5xl">Tentang Kami</h1>
        <div className="text-justify pr-20">
        Berdiri sejak 2018 kami menghimpun lebih dari ribuan pelanggan dari
          berbagai daerah. Kami berkomitmen untuk tetap menyajikan rasa dan
          kualitas yang sama setiap harinya untuk mencapai kepuasan pelanggan.<br/>
            Menggunakan ayam kampung pilihan dan beras lokal pilihan kami
          menyajikan bubur yang tidak hanya mengenyangkan tetapi juga memiliki
          kualitas rasa yang tiada duanya. Untuk itu kami tunggu kehadirannya di
          Bubur Ayam Kampung Nusantara !
        </div>
      </div>
    </section>
  );
}
