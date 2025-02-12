import { Carousel } from "../ui/carousel";
import { LazyImage } from "../ui/lazy-image";

const imagesSrc = [
  "/images/homepage/testimony/testimony-1.png",
  "/images/homepage/testimony/testimony-2.png",
  "/images/homepage/testimony/testimony-3.png",
  "/images/homepage/testimony/testimony-4.png",
  "/images/homepage/testimony/testimony-5.png",
  "/images/homepage/testimony/testimony-6.png",
];

const images = imagesSrc.map((src) => (
  <LazyImage
    src={src}
    alt="Testimony"
    className="bg-cover rounded-lg"
    width={1920}
    height={1080}
  />
));

export function Testimony() {
  return (
    <section className="layout flex gap-10 items-center mt-10">
      <div className="w-[50%]">
        <Carousel
          items={images}
          autoplay={true}
          loop={true}
          slidesPerView={1}
          spaceBetween={10}
          centeredSlides={true}
          slideClassName="my-auto"
        />
      </div>

      <h1 className="title leading-normal">
        Apa Pendapat <br />
        Mereka Tentang <br />
        Kami?
      </h1>
    </section>
  );
}
