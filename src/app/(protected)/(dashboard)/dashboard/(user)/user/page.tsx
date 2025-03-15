"use client";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { useState } from "react";
import { useServiceUsers } from "@/lib/hooks/query/use-service-users";
import { useModal } from "@/lib/hooks/use-modal";
import { User } from "@/lib/types/schema";
import { RxAvatar } from "react-icons/rx";
import { DashboardUserModal } from "@/components/modal/dashboard-user-modal";

export default function Page() {
  const { data, isLoading } = useServiceUsers();
  const users = data?.data;

  const { open, openModal, closeModal } = useModal();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const handleOpenModal = (user: User | null, isEditMode: boolean) => {
    setIsEditMode(isEditMode);
    setUser(user);
    openModal();
  };

  return (
    <>
      <DashboardUserModal
        open={open}
        closeModal={closeModal}
        user={user}
        isEditMode={isEditMode}
      />
      <ActionButton handleOpenModal={handleOpenModal} />
      {isLoading ? (
        <Loading />
      ) : (
        <ul className="grid gap-2 mt-2">
          {users?.map((user) => <ServiceUserCard key={user.id} user={user} />)}
        </ul>
      )}
    </>
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

type ActionButtonProps = {
  handleOpenModal: (user: User | null, isEditMode: boolean) => void;
};

function ActionButton({ handleOpenModal }: ActionButtonProps) {
  const createUser = () => {
    handleOpenModal(null, false);
  };

  return (
    <div className="flex gap-4 items-center py-4 border-b">
      <Button
        className="bg-accent px-2 py-1 font-bold text-primary-foreground"
        onClick={createUser}
      >
        Tambah User
      </Button>
    </div>
  );
}
