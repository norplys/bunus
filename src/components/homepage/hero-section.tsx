import { Carousel } from "../ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { MdDeliveryDining } from "react-icons/md";
import { PiBowlFoodFill } from "react-icons/pi";
import { FaBox } from "react-icons/fa";
import { LazyImage } from "../ui/lazy-image";

export function HeroSection(): JSX.Element {
  const bannerImages = [
    <Image
      src="/images/homepage/home-banner-1.png"
      alt="Hero Image 1"
      width={1920}
      height={1080}
      className="bg-cover"
    />,
    <Image
      src="/images/homepage/home-banner-2.png"
      alt="Hero Image 2"
      width={1920}
      height={1080}
      className="bg-cover"
    />,
  ];

  return (
    <>
      <Carousel
        items={bannerImages}
        autoplay={true}
        className="max-h-[80vh]"
        loop={true}
        slidesPerView={1}
        spaceBetween={10}
      />
      <div className="layout z-10 -my-14 relative grid">
        <HeroLink />
        <SignUpButton />
      </div>
    </>
  );
}

function SignUpButton(): JSX.Element {
  return (
    <div className="relative flex px-6 py-12 items-center justify-end text-xl my-24 rounded-md bg-accent/10 overflow-hidden">
      <LazyImage
        src="/images/homepage/menu.png"
        alt="Hero Section 1"
        className="absolute -bottom-20 -left-20"
        width={300}
        height={300}
      />
      Daftar sekarang dan dapatkan poin untuk ditukarkan dengan produk kami
      <Link
        className="bg-accent px-4 py-2 rounded-md text-primary ml-5"
        href="/register"
      >
        Daftar Sekarang
      </Link>
    </div>
  );
}

function HeroLink(): JSX.Element {
  const links = [
    {
      name: "Delivery",
      href: "/delivery",
      icon: <MdDeliveryDining className="text-6xl" />,
    },
    {
      name: "Takeaway",
      href: "/take-away",
      icon: <FaBox className="text-4xl" />,
    },
    {
      name: "Dine In",
      href: "/dine-in",
      icon: <PiBowlFoodFill className="text-5xl" />,
    },
  ];

  return (
    <div className="flex text-primary gap-4">
      {links.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex items-center backdrop-blur-3xl bg-primary-foreground/50 p-6 text-2xl w-full rounded-xl gap-4 font-semibold"
        >
          {item.icon}
          <p className="btn btn-primary">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}
