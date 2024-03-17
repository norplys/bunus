import MenuCard from "./MenuCard";
const array = [
  {
    name: "Bubur Ayam Kampung",
    desc: "Bubur dengan daging ayam pilihan ditambah cakwe, dibalur dengan minyak wijen impor yang spesial dibuat di Malaysia menghasilkan bubur yang bukan hanya mengenyangkan, tetapi juga bermakna di hati",
    image:
      "https://res.cloudinary.com/dpg0tbbot/image/upload/v1704978248/bunus/rcqltvzeguzxmldbamko.webp",
  },
  {
    name: "Bubur Polos",
    desc: "Bubur polos yang sangat lezat, disajikan bersama daun bawang dan bawang goreng yang tentunya akan membuat anda ketagihan",
    image:
      "https://res.cloudinary.com/dpg0tbbot/image/upload/v1704978277/bunus/nsyd68vrqfqombcteb1t.webp",
  },
  {
    name: "Telur Asin",
    desc: "Telur asin yang sangat lezat, disajikan dengan bubur ayam kampung yang kaya cita rasa. Sangat cocok untuk sarapan atau makan malam",
    image:
      "https://res.cloudinary.com/dpg0tbbot/image/upload/v1704978287/bunus/z59fmlwb1fhm41e0q4js.webp",
  },
];
export default function FavouriteMenu() {
  return (
    <section className="grid  gap-5 min-w-screen">
      <h1 className="xl:text-5xl font-bold  text-primary-red  rounded-2xl py-2 w-fit px-5 justify-self-center md:text-4xl">
        Menu Favorit
      </h1>
      <div className="max-w-3xl text-center justify-self-center md:text-sm xl:text-base">
        Ini adalah menu favorit yang sangat disukai oleh pelanggan kami.
        Perpaduan bubur kami dengan telur asin pilihan menghasilkan rasa yang
        dipercaya oleh banyak pelanggan kami
      </div>
      <div className="grid grid-cols-3 justify-items-center max-w-[1320px] justify-self-center gap-5 md:px-2">
        {array.map((each, i) => (
          <MenuCard key={i} menu={each} />
        ))}
      </div>
    </section>
  );
}
