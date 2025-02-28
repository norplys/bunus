import { Carousel } from "../ui/carousel";
import { LazyImage } from "../ui/lazy-image";

const imageList = [
  "/images/merchant/banner-1.png",
  "/images/merchant/banner-2.png",
];

export function MerchantBanner() {
  const imageChildren = imageList.map((image, index) => (
    <LazyImage
      key={index}
      src={image}
      alt={`Merchant Banner ${index + 1}`}
      width={1000}
      height={1000}
      className="mx-auto w-full bg-cover max-h-72"
    />
  ));

  return (
    <Carousel
      items={imageChildren}
      centeredSlides={true}
      autoplay
      className="shadow-md rounded-t-lg layout"
    />
  );
}
