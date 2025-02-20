import Link from "next/link";
import clsx from "clsx";

type CategoryTabProps = {
  name: string;
  id: string;
  selectedId: string;
  isService?: boolean;
};

export function CategoryTab({
  name,
  id,
  selectedId,
  isService,
}: CategoryTabProps) {
  const rootUrl = isService ? "/service/menu" : "/menu";
  const url = id === "ALL" ? rootUrl : `${rootUrl}?categoryId=${id}`;
  const selected = selectedId === id;

  return (
    <Link
      className={clsx(
        "rounded-lg cursor-pointer duration-300",
        selected && "text-accent",
      )}
      href={url}
    >
      <h2 className="text-lg font-semibold">{name}</h2>
    </Link>
  );
}
