import Link from "next/link";
import clsx from "clsx";

export function CategoryTab({
  name,
  id,
  selectedId,
}: {
  name: string;
  id: string;
  selectedId: string;
}) {
  const url = id === "ALL" ? "/menu" : `/menu?categoryId=${id}`;
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
