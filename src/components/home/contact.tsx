import ContactButton from "./contact-button";
import { FaLocationDot, FaInstagram } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import RightSlide from "@/lib/animation-framer/right-slide";
import ContactForm from "@/components/home/contact-form";

const data = [
  {
    icon: <FaLocationDot />,
    text: "Lokasi",
    link: "https://goo.gl/maps/9m8ZV9Y9yY2MqzQv9",
  },
  {
    icon: <MdOutlineAlternateEmail />,
    text: "Email",
    link: "mailto",
  },
  {
    icon: <FaWhatsapp />,
    text: "Whatsapp",
    link: "https://wa.me/6281234567890",
  },
  {
    icon: <FaInstagram />,
    text: "Instagram",
    link: "https://instagram.com",
  },
];
export default function Contact() {
  return (
    <section className="grid justify-center items-center bg-slate-100 py-16 gap-5">
      <h1 className="font-bold xl:text-5xl justify-self-center md:text-4xl text-2xl">
        Hubungi Kami
      </h1>
      <p className="max-w-3xl md:text-center md:text-sm xl:text-base px-5 md:px-0 text-justify">
        Halo pelanggan tersayang bubur ayam kampung nusantara ! ada kritik,
        keluhan, saran, atau pertanyaan ? hubungi kami melalui form dibawah ini
      </p>
      <div className="flex justify-between mt-5 md:p-2 flex-col md:flex-row p-1">
        <ContactForm />
        <RightSlide design="flex gap-5 md:gap-0 md:block px-2 pt-2 md:pt-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9896283388084!2d106.7146518768642!3d-6.132095060125373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d4011a5293f%3A0x3af5a7556c06e77!2sBubur%20Ayam%20Kampung%20Nusantara!5e0!3m2!1sid!2sid!4v1704983161177!5m2!1sid!2sid"
            width="600"
            height="450"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="xl:w-72 xl:h-72 shadow-lg hover:shadow-none hover:scale-95 duration-300 md:w-60 md:h-60 w-40 h-40"
          ></iframe>
          <div className="md:mt-5 flex flex-wrap gap-5 max-w-72">
            {data.map((item, index) => (
              <ContactButton
                key={index}
                icon={item.icon}
                text={item.text}
                link={item.link}
              />
            ))}
          </div>
        </RightSlide>
      </div>
    </section>
  );
}
