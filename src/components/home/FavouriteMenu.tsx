import MenuCard from "./MenuCard";
const array = [1, 2, 3];
export default function FavouriteMenu() {
  return (
    <section className="grid justify-center items-center gap-5 w-full">
      <h1 className="text-5xl font-bold  text-primary-red  rounded-2xl py-2 w-fit px-5 justify-self-center ">
        Menu Favorit
      </h1>
      <div className="max-w-3xl text-center justify-self-center">
        Ini adalah menu favorit yang sangat disukai oleh pelanggan kami.
        Perpaduan bubur kami dengan telur asin pilihan menghasilkan rasa yang
        dipercaya oleh banyak pelanggan kami
      </div>
      <div className="grid grid-cols-3 gap-8 w-full">
        {array.map((each, i) => (
          <MenuCard key={i} />
        ))}
      </div>
    </section>
  );
}
