import { IconType } from "react-icons"

type ContactButtonProps = {
    icon: JSX.Element,
    text: string,
    link: string
}

export default function ContactButton({icon : Icon, text, link} : ContactButtonProps){
    return (
        <button className="flex bg-gray-200 px-2 py-1 rounded-xl items-center gap-2 shadow-lg hover:-translate-y-1 duration-300">
            <div>{Icon}</div>
            <div>{text}</div>
        </button>
    )
}