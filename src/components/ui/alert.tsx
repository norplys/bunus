import { clsx } from "clsx";
import { MdCheckCircle, MdError, MdInfo } from "react-icons/md";

type AlertProps = {
  variant: "info" | "error" | "success";
  message: string | JSX.Element;
  className?: string;
};

export function Alert({
  variant,
  message,
  className,
}: AlertProps): JSX.Element {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <div className="shrink-0">
        {variant === "error" ? (
          <MdError className="text-lg text-alert-error" />
        ) : variant === "success" ? (
          <MdCheckCircle className="text-lg text-alert-success" />
        ) : (
          <MdInfo className="text-lg text-alert-info" />
        )}
      </div>
      <p className="text-sm text-primary/80">{message}</p>
    </div>
  );
}
