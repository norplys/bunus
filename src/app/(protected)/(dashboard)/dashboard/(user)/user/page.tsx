"use client";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { useState } from "react";
import { useServiceUsers } from "@/lib/hooks/query/use-service-users";
import { useModal } from "@/lib/hooks/use-modal";
import { User } from "@/lib/types/schema";
import { RxAvatar } from "react-icons/rx";
import { DashboardUserModal } from "@/components/modal/dashboard-user-modal";
import { BiTrash } from "react-icons/bi";
import { useMutationUser } from "@/lib/hooks/mutation/use-mutation-user";
import toast from "react-hot-toast";

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
          {users?.map((user) => (
            <ServiceUserCard
              key={user.id}
              user={user}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </ul>
      )}
    </>
  );
}

type ServiceUserCardProps = {
  user: User;
  handleOpenModal: (user: User | null, isEditMode: boolean) => void;
};

function ServiceUserCard({ user, handleOpenModal }: ServiceUserCardProps) {
  const { deleteServiceUserMutation } = useMutationUser();

  const deleteUser = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();

    deleteServiceUserMutation.mutate(user.id, {
      onSuccess: () => {
        toast.success("User berhasil dihapus");
      },
      onError: () => {
        toast.error("Gagal menghapus user");
      },
    });
  };

  const updateUser = () => {
    handleOpenModal(user, true);
  };

  return (
    <li
      className="border border-border flex grid-rows-1 rounded-lg gap-5 cursor-pointer overflow-hidden p-4 items-center"
      onClick={updateUser}
    >
      <RxAvatar className="h-14 w-14" />
      <div>
        <p className="font-bold">{user.name}</p>
        <p>{user.email}</p>
      </div>
      <BiTrash
        className="h-6 w-6 text-accent cursor-pointer ml-auto"
        onClick={deleteUser}
      />
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
