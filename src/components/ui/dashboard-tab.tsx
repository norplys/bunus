import Link from "next/link";
import clsx from "clsx";

type CategoryTabProps = {
  name: string;
  id: string;
  selectedId: string;
  rootUrl: string;
  query: string;
  date?: string;
};

export function DashboardTab({
  name,
  id,
  selectedId,
  rootUrl,
  query,
}: CategoryTabProps) {
  const url = id === "ALL" ? rootUrl : `${rootUrl}?${query}`;
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
