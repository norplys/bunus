"use client";
import { User } from "@/lib/types/schema";
import { Modal } from "./modal";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

export type DashboardUserModalProps = {
  open: boolean;
  closeModal: () => void;
  user: User | null;
  isEditMode: boolean;
};

export function DashboardUserModal({
  open,
  closeModal,
  user,
  isEditMode,
}: DashboardUserModalProps) {
  const { register, handleSubmit } = useForm();

  return (
    <Modal open={open} closeModal={closeModal}>
      <form className="grid gap-5 bg-primary-foreground p-5 rounded-lg max-w-xl w-screen max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit" : "Buat"} User
        </h1>
        <Input label="Name" id="name" type="text" register={register("name")} />
        <Input
          label="Email"
          id="email"
          type="email"
          register={register("email")}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          register={register("password")}
        />
        <Input label="Role" id="role" type="text" register={register("role")} />
        <Button
          type="submit"
          className="bg-accent text-primary-foreground py-2"
        >
          {isEditMode ? "Edit" : "Buat"} User
        </Button>
      </form>
    </Modal>
  );
}
