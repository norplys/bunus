import { Modal } from "../modal/modal";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { useMutationCategory } from "@/lib/hooks/mutation/use-mutation-category";
import toast from "react-hot-toast";
import { Input } from "../ui/input";

type DashboardCategoryModalProps = {
  open: boolean;
  CloseModal: () => void;
  categoryId: string | null;
  isEditMode: boolean;
  initialName: string | null;
};

const CategoryPayload = z.object({
  name: z.string().min(4),
});

type CategorySchema = z.infer<typeof CategoryPayload>;

export function DashboardCategoryModal({
  open,
  CloseModal,
  categoryId,
  isEditMode,
  initialName,
}: DashboardCategoryModalProps) {
  const { createCategoryMutation, updateCategoryMutation } =
    useMutationCategory();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchema>({
    values: {
      name: initialName ?? "",
    },
  });

  const handleCategorySubmit = (data: CategorySchema) => {
    if (isEditMode && categoryId) {
      updateCategoryMutation.mutate(
        {
          data: { name: data.name },
          categoryId,
        },
        {
          onSuccess: () => {
            toast.success("Kategori berhasil diupdate");
            CloseModal();
            reset();
          },
          onError: (err) => {
            toast.error(err.message);
          },
        },
      );
    } else {
      createCategoryMutation.mutate(
        { data: { name: data.name } },
        {
          onSuccess: () => {
            toast.success("Kategori berhasil dibuat");
            CloseModal();
            reset();
          },
          onError: (err) => {
            toast.error(err.message);
          },
        },
      );
    }
  };

  const handleCloseModal = () => {
    CloseModal();
    reset();
  };

  return (
    <Modal
      open={open}
      closeModal={handleCloseModal}
      modalClassName="grid bg-background p-5 gap-5 rounded-lg layout"
    >
      <h3 className="text-lg font-semibold">
        {isEditMode ? "Edit" : "Buat"} Kategori
      </h3>
      <form
        onSubmit={handleSubmit(handleCategorySubmit)}
        className="grid gap-5"
      >
        <Input
          id="name"
          type="text"
          placeholder="Category Name"
          register={register("name")}
          error={errors.name}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <Button
          type="submit"
          className="bg-accent text-primary-foreground py-2"
        >
          {isEditMode ? "Edit" : "Buat"} Kategori
        </Button>
      </form>
    </Modal>
  );
}
