import Link from "next/link";
import clsx from "clsx";

export function CategoryTab({ name, id }: { name: string; id: string }) {
  const url = id === "ALL" ? "/menu" : `/menu?categoryId=${id}`;

  return (
    <Link className="rounded-lg cursor-pointer" href={url}>
      <h2 className="text-lg font-semibold">{name}</h2>
    </Link>
  );
}
