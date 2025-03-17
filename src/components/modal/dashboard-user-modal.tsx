"use client";
import { User } from "@/lib/types/schema";
import { Modal } from "./modal";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useMutationUser } from "@/lib/hooks/mutation/use-mutation-user";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@/lib/types/enum";
import type { CreateServiceUserSchema } from "@/lib/hooks/mutation/use-mutation-user";

export type DashboardUserModalProps = {
  open: boolean;
  closeModal: () => void;
  user: User | null;
  isEditMode: boolean;
};

const ALLOWED_ROLES = [
  "MERCHANT",
  "CASHIER",
  "KITCHEN",
] as const satisfies UserRole[];

const UserSchema = (isEditMode: boolean) =>
  z.object({
    name: z.string(),
    email: z
      .string()
      .email()
      .regex(/@bunus\.com$/, {
        message: `Email must be a "bunus.com" email`,
      }),
    password: isEditMode ? z.string().optional() : z.string().min(6),
    role: z.enum(ALLOWED_ROLES),
  });

type UserSchema = z.infer<ReturnType<typeof UserSchema>>;

export function DashboardUserModal({
  open,
  closeModal,
  user,
  isEditMode,
}: DashboardUserModalProps) {
  const defaultValues = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    role: user?.role ?? "",
  } as UserSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(UserSchema(isEditMode)),
    values: defaultValues,
  });

  const { createServiceUserMutation, updateServiceUserMutation } =
    useMutationUser();

  const handleUser = (data: UserSchema) => {
    if (isEditMode) {
      if (!data.password) {
        delete data.password;
      }

      updateServiceUserMutation.mutate(
        { data, id: user!.id },
        {
          onSuccess: () => {
            toast.success("User berhasil diupdate");
            closeModal();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    } else {
      createServiceUserMutation.mutate(
        { data: data as CreateServiceUserSchema },
        {
          onSuccess: () => {
            toast.success("User berhasil dibuat");
            closeModal();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    }
  };

  return (
    <Modal open={open} closeModal={closeModal}>
      <form
        className="grid gap-5 bg-primary-foreground p-5 rounded-lg max-w-xl w-screen max-h-[80vh] overflow-y-auto"
        onSubmit={handleSubmit(handleUser)}
      >
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit" : "Buat"} User
        </h1>
        <Input
          label="Name"
          id="name"
          type="text"
          register={register("name")}
          error={errors.name}
        />
        <Input
          label="Email"
          id="email"
          type="email"
          register={register("email")}
          error={errors.email}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          register={register("password")}
          error={errors.password}
        />
        <label htmlFor="role" className="text-sm font-semibold">
          Role
        </label>
        <select
          {...register("role")}
          defaultValue={""}
          className="custom-input"
        >
          <option value="" disabled>
            Pilih Role
          </option>
          {ALLOWED_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
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
