import { FaHome } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { BiFoodMenu } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import Link from "next/link";

const rootUrl = "/dashboard";

const iconArray = [
  {
    icon: <FaHome />,
    link: rootUrl,
  },
  {
    icon: <BiFoodMenu />,
    link: rootUrl + "/menu",
  },
  {
    icon: <BiUser />,
    link: rootUrl + "/user",
  },
  {
    icon: <CiSettings />,
    link: rootUrl + "/setting",
  },
];

export function DashboardSidebar() {
  return (
    <div className="md:min-h-screen w-screen md:w-fit fixed bottom-0 md:top-20 p-2 border-t-2 md:border-t-0 md:border-r-2 border-foreground flex md:flex-col items-center gap-5 text-2xl justify-around md:justify-start z-40 bg-primary-foreground">
      {iconArray.map((item, index) => (
        <Link href={item.link} key={index}>
          {item.icon}
        </Link>
      ))}
    </div>
  );
}
