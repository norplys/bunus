import { Carousel } from "../ui/carousel";

const items = [
  "Bubur Ayam Kampung",
  "Ayam Goreng Rempah",
  "Topping",
  "Minuman",
];

export function SmoothTextCarousel(): JSX.Element {
  return (
    <section className="md:grid hidden items-center justify-center text-6xl text-foreground/30 font-extrabold mt-10 gap-10">
      {items.map((item, index) => {
        const arrayOfText = new Array(10).fill(
          <div className="w-fit py-10">{item}</div>,
        );

        return (
          <Carousel
            speed={5000}
            key={index}
            items={arrayOfText}
            slidesPerView={"auto"}
            spaceBetween={30}
            className="flex justify-center border-2  border-border hover:text-accent hover:border-accent border-dashed"
            autoplay={{
              delay: 0,
              reverseDirection: index % 2 === 0,
            }}
            freeMode={true}
            loop={true}
          />
        );
      })}
    </section>
  );
}
