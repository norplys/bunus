import { Lazy } from "swiper/modules";
import { LazyImage } from "../ui/lazy-image";
import Link from "next/link";

export function Contact(): JSX.Element {
  return (
    <section className="min-h-screen bg-[url(/images/background/contact.png)] bg-cover mt-10 flex justify-center items-center">
      <div className="bg-primary relative w-[80%] h-96 rounded-xl border border-border">
        <div className="flex justify-center flex-col w-[50%] h-full gap-2 pl-40">
          <h1 className="title">Ada Pertanyaan ?</h1>
          <p>Jangan ragu untuk menghubungi kami melalui tombol di bawah ini.</p>
          <div className="flex gap-5 text-lg items-center font-bold text-primary my-3">
            <Link
              href="https://wa.me/6285692807048?text=Halo%20Bubur%20Nusantara"
              className="bg-green-500 py-2 px-4 rounded-md"
            >
              Whatsapp Kami
            </Link>
            <span className="text-primary-foreground">Atau</span>
            <Link href="/contact" className="bg-accent py-2 px-4 rounded-md">
              Email Kami
            </Link>
          </div>
          <p>Kami akan segera menjawab anda !</p>
        </div>
        <LazyImage
          src="/images/homepage/phone.png"
          alt="Contact"
          width={600}
          height={600}
          className="absolute -top-36 right-2"
        />
      </div>
    </section>
  );
}
