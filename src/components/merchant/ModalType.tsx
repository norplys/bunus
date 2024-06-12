import { LiaUtensilsSolid } from "react-icons/lia";
import { RiTakeawayFill } from "react-icons/ri";
import playAudio from "@/helper/audio/playAudio";
export default function ModalType({
  setNow,
  setOrderType,
}: {
  setNow: (value: string) => void;
  setOrderType: (value: string) => void;
}) {
  const handleOrderType = (type: string) => {
    playAudio("/audio/sound2.mp3");
    setOrderType(type);
    setNow("table");
  };
  return (
    <div className="grid text-4xl font-bold w-full min-w-96">
      <button
        className="bg-primary-orange gap-2 flex justify-center items-center text-white"
        onClick={() => handleOrderType("DINE_IN")}
      >
        <LiaUtensilsSolid className="text-6xl font-extrabold" />
        <p>Makan Ditempat</p>
      </button>
      <button
        className="flex justify-center items-center gap-2"
        onClick={() => handleOrderType("TAKE_AWAY")}
      >
        <RiTakeawayFill className="text-5xl font-normal" />
        <p>Bawa Pulang</p>
      </button>
    </div>
  );
}
