import { clsx } from "clsx";
import Link from "next/link";
import { LazyImage } from "../ui/lazy-image";

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
        "flex shrink-0 items-center gap-5 md:text-2xl",
        clickable ? "pointer-events-auto" : "pointer-events-none",
        className,
      )}
      tabIndex={-1}
    >
      {icon && (
        <LazyImage
          className={clsx(
            "rounded-full",
            logoClassName,
            hideIconOnMobile && "hidden md:inline",
          )}
          src="/images/logo.svg"
          alt="Bubur Nusantara Logo"
          width={500}
          height={500}
        />
      )}
      {text && (
        <span
          className={clsx(
            "font-bold",
            placeholder && "md:text-6xl text-3xl",
            hideTextOnMobile && "hidden md:inline",
          )}
        >
          Bubur Nusantara
        </span>
      )}
    </Link>
  );
}
