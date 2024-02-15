import Chef from "@/components/home/Chef";
import Intro from "../../components/home/Intro";
import FavouriteMenu from "../../components/home/FavouriteMenu";
import Contact from "../../components/home/Contact";
import { useSearchParams } from "next/navigation";
export default function Home() {
  return (
    <section className="grid gap-14">
        <Intro />
        <Chef />
        <FavouriteMenu />
        <Contact />
    </section>
  );
}
