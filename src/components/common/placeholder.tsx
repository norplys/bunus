import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  text?: boolean;
  className?: string;
  clickable?: boolean;
  placeholder?: boolean;
  logoClassName?: string;
  hideTextOnMobile?: boolean;
  hideIconOnMobile?: boolean;
  icon?: boolean;
};

export function Logo({
  href,
  text,
  clickable,
  className,
  placeholder,
  logoClassName,
  hideTextOnMobile,
  hideIconOnMobile,
  icon,
}: LogoProps): JSX.Element {
  logoClassName ??= placeholder ? "h-12 w-12" : "h-8 w-8";

  return (
    <Link
      href={href ?? "/"}
      className={clsx(
        "flex shrink-0 items-center gap-4 text-2xl text-primary",
        clickable ? "pointer-events-auto" : "pointer-events-none",
        className,
      )}
      tabIndex={-1}
    >
      {icon && (
        <Image
          className={clsx(
            logoClassName,
            hideIconOnMobile && "hidden md:inline",
          )}
          src="./images/logo.svg"
          alt="Bubur Nusantara Logo"
          width={100}
          height={100}
        />
      )}
      {text && (
        <span
          className={clsx(
            "font-bold",
            placeholder && "text-6xl",
            hideTextOnMobile && "hidden md:inline",
          )}
        >
          Bubur Nusantara
        </span>
      )}
    </Link>
  );
}
