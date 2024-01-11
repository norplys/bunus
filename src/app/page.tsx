import Image from "next/image";
import Chef from "../components/home/Chef"
import Intro from "../components/home/Intro";
import FavouriteMenu from "../components/home/FavouriteMenu";
export default function Home() {
  return (
    <section className="grid gap-14">
        <Intro />
        <Chef />
        <FavouriteMenu />
    </section>
  );
}
