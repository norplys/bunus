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
      className="bg-cover w-full"
    />,
    <Image
      src="/images/homepage/home-banner-2.png"
      alt="Hero Image 2"
      width={1920}
      height={1080}
      className="bg-cover w-full"
    />,
  ];

  return (
    <>
      <Carousel
        items={bannerImages}
        autoplay={true}
        className="max-h-[80vh] w-full"
        loop={true}
        slidesPerView={1}
        spaceBetween={10}
      />
      <div className="layout z-10 md:-my-14 relative grid">
        <MobileHeroLink />
        <HeroLink />
        <SignUpButton />
      </div>
    </>
  );
}

function SignUpButton(): JSX.Element {
  return (
    <div className="relative hidden md:flex px-6 py-12 items-center justify-end text-xl my-24 rounded-md bg-accent/10 overflow-hidden">
      <LazyImage
        src="/images/homepage/menu.png"
        alt="Hero Section 1"
        className="absolute -bottom-20 -left-20"
        width={300}
        height={300}
      />
      Daftar sekarang dan dapatkan poin untuk ditukarkan dengan produk kami
      <Link
        className="bg-accent px-4 py-2 rounded-md ml-10 text-primary-foreground font-bold hidden md:block"
        href="/register"
      >
        Daftar Sekarang
      </Link>
    </div>
  );
}

const links = [
  {
    name: "Delivery",
    href: "/menu",
    icon: <MdDeliveryDining className="md:text-6xl text-3xl" />,
  },
  {
    name: "Takeaway",
    href: "/menu",
    icon: <FaBox className="md:text-4xl text-lg mt-1" />,
  },
  {
    name: "Dine In",
    href: "/menu",
    icon: <PiBowlFoodFill className="md:text-5xl text-2xl" />,
  },
];

function HeroLink(): JSX.Element {
  return (
    <div className="md:flex gap-4 text-primary-foreground hidden">
      {links.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex items-center backdrop-blur-3xl bg-primary/50 p-6 text-2xl w-full rounded-xl gap-4 font-semibold"
        >
          {item.icon}
          <p className="btn btn-primary">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}

export function MobileHeroLink(): JSX.Element {
  return (
    <div className="md:hidden flex justify-between gap-4 border-b border-border py-2">
      {links.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex flex-col justify-between items-center w-full h-full"
        >
          {item.icon}
          <p className="btn btn-primary font-semibold">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}
