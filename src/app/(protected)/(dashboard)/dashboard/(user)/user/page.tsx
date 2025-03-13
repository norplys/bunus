"use client";
import { Loading } from "@/components/ui/loading";
import { useServiceUsers } from "@/lib/hooks/query/use-service-users";
import { User } from "@/lib/types/schema";
import { RxAvatar } from "react-icons/rx";

export default function Page() {
  const { data, isLoading } = useServiceUsers();
  const users = data?.data;

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {users?.map((user) => <ServiceUserCard key={user.id} user={user} />)}
        </ul>
      )}
    </div>
  );
}

type ServiceUserCardProps = {
  user: User;
};

function ServiceUserCard({ user }: ServiceUserCardProps) {
  return (
    <li className="border border-border flex rounded-lg gap-5 cursor-pointer overflow-hidden p-4">
      <RxAvatar className="h-14 w-14" />
      <div>
        <p className="font-bold">{user.name}</p>
        <p>{user.email}</p>
      </div>
    </li>
  );
}
