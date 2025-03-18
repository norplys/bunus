import Link from "next/link";
import { LazyImage } from "../ui/lazy-image";

const locationLink =
  "https://www.google.com/search?q=bubur+nusantara&sca_esv=0fc7dd398656b67a&sxsrf=AHTn8zpdJZMJycWUea0b9cYq6A6Q3MK5Vw%3A1739369371023&source=hp&ei=mqusZ7D4Or7M1e8Pso2X0QQ&iflsig=ACkRmUkAAAAAZ6y5q4COODjWejH_8c0QVnmuf67ClLoH&oq=bubur+n&gs_lp=Egdnd3Mtd2l6IgdidWJ1ciBuKgIIADIMECMYgAQYExgnGIoFMgQQIxgnMgQQIxgnMggQABiABBjLATIIEAAYgAQYywEyCBAAGIAEGMsBMggQABiABBjLATIIEAAYgAQYywEyCBAAGIAEGMsBMggQABiABBjLAUjxD1AAWLYFcAB4AJABAJgBTaAB2wOqAQE3uAEDyAEA-AEBmAIHoALwA8ICBxAAGIAEGBOYAwCSBwE3oAfvOw&sclient=gws-wiz&lqi=Cg9idWJ1ciBudXNhbnRhcmFItYTwp7m4gIAIWh0QABABGAAYASIPYnVidXIgbnVzYW50YXJhMgJpZJIBE3BvcnJpZGdlX3Jlc3RhdXJhbnSqATgQATIfEAEiGzVRAbXU47KQJs14GpopVF9JoofNvnbaYn2i0zITEAIiD2J1YnVyIG51c2FudGFyYQ#rlimm=265530363051273847";

export function OurLocation(): JSX.Element {
  return (
    <section className="layout grid mt-14 justify-items-center items-center">
      <h2 className="title mb-10 w-full md:w-fit">
        Kami Ada Disini, Ayo Kemari !
      </h2>
      <Link
        href={locationLink}
        className="text-primary-foreground bg-accent md:text-xl md:px-6 md:py-2 text-sm py-1 px-2 rounded-md font-semibold hover:scale-105 duration-300"
      >
        Lihat Lokasi
      </Link>
      <LazyImage
        src="/images/homepage/location.png"
        alt="Our Location"
        className="w-full"
        width={1000}
        height={1000}
      />
    </section>
  );
}
