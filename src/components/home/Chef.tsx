import LeftSlide from "@/lib/animation-framer/LeftSlide";
import RightSlide from "@/lib/animation-framer/RightSlide";
import Image from "next/image";
export default function Chef() {
  return (
    <section className="w-full flex justify-between md:flex-row flex-col gap-5 md:gap-0">
      <LeftSlide
        design="bg-primary-orange bg-opacity-80 md:min-w-[45%] rounded-r-full px-5 pt-3 flex justify-center"
        delay={0}
      >
        <Image
          src={"/chef.svg"}
          width={500}
          height={500}
          alt="chef"
          priority={true}
          className="md:w-80 xl:w-96 w-52"
        ></Image>
      </LeftSlide>
      <RightSlide design="md:w-[45%] flex flex-col justify-center gap-5">
        <h1 className="font-bold xl:text-5xl md:text-4xl text-center text-xl md:text-start">
          Tentang Kami
        </h1>
        <div className="text-justify md:pr-20 md:text-sm xl:text-base px-5 md:px-0">
          Berdiri sejak 2018 kami menghimpun lebih dari ribuan pelanggan dari
          berbagai daerah. Kami berkomitmen untuk tetap menyajikan rasa dan
          kualitas yang sama setiap harinya untuk mencapai kepuasan pelanggan.
          <br />
          Menggunakan ayam kampung pilihan dan beras lokal pilihan kami
          menyajikan bubur yang tidak hanya mengenyangkan tetapi juga memiliki
          kualitas rasa yang tiada duanya. Untuk itu kami tunggu kehadirannya di
          Bubur Ayam Kampung Nusantara !
        </div>
      </RightSlide>
    </section>
  );
}
