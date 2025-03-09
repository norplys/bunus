import { Modal } from "../modal/modal";
import {
  useForm,
  type UseFormRegisterReturn,
  type FieldError,
} from "react-hook-form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDetailMenu } from "@/lib/hooks/query/use-detail-menu";
import { Button } from "../ui/button";
import { useCategories } from "@/lib/hooks/query/use-categories";
import { Category } from "@/lib/types/schema";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useMutationMenu } from "@/lib/hooks/mutation/use-mutation-menu";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/lib/context/auth-context";
import toast from "react-hot-toast";

type DashboardMenuModalProps = {
  open: boolean;
  CloseModal: () => void;
  menuId: string | null;
  isEditMode?: boolean;
};

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MenuPayload = z.object({
  name: z.string(),
  price: z.number(),
  discountPrice: z.number(),
  description: z.string().optional(),
  categoryId: z.string(),
  available: z.boolean(),
  image: z.any(),
});

type MenuSchema = z.infer<typeof MenuPayload>;

export function DashboardMenuModal({
  open,
  CloseModal,
  menuId,
  isEditMode,
}: DashboardMenuModalProps) {
  const { data, isLoading } = useDetailMenu(menuId!);
  const menu = data?.data;

  const { data: categoryData, isLoading: categoryLoading } = useCategories();
  const categories = categoryData?.data;

  const { updateMenuMutation } = useMutationMenu();

  const { token } = useAuth();

  const [file, setFile] = useState<string | null>(null);

  useEffect(() => {
    if (menu?.image) {
      setFile(menu.image);
    } else {
      setFile(null);
    }
  }, [open]);

  const handleCloseModal = () => {
    if (file) {
      URL.revokeObjectURL(file);
    }

    setFile(null);
    reset();

    console.log("close modal");
    CloseModal();
  };

  const defaultValues = {
    name: menu?.name || "",
    price: menu?.price || 0,
    description: menu?.description || undefined,
    discountPrice: menu?.discountPrice || 0,
    categoryId: menu?.categoryId || "",
    available: menu?.available || false,
  };

  const submitHandler = async (data: MenuSchema) => {
    const payload = {
      ...data,
      discountPrice: data.discountPrice || null,
      description: data.description || undefined,
    };

    if (data.image[0]) {
      const formData = new FormData();

      formData.append("image", data.image[0]);

      const response = fetcher<{ image: string }>(`/upload/image`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data: url } = await toast.promise(response, {
        loading: "Mengunggah gambar...",
        success: "Berhasil mengunggah gambar",
        error: "Gagal mengunggah gambar",
      });

      payload.image = url.image;
    } else {
      delete payload.image;
    }

    updateMenuMutation.mutate(
      { data: payload, menuId: menuId! },
      {
        onSuccess: () => {
          toast.success("Berhasil mengubah menu");
          handleCloseModal();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuSchema>({
    resolver: zodResolver(MenuPayload),
    values: defaultValues,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      if (file) {
        URL.revokeObjectURL(file);
      }
      setFile(URL.createObjectURL(newFile));
    }
  };

  return (
    <Modal open={open} closeModal={handleCloseModal}>
      <form
        className="grid gap-5 bg-primary-foreground p-5 rounded-lg max-w-xl w-screen max-h-[80vh] overflow-y-auto"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="text-2xl font-bold">Edit Menu</h1>
        <ImageInput
          register={register("image", {
            onChange: handleImageChange,
          })}
          imageUrl={file}
        />
        <Input
          label="Nama Menu"
          placeholder="Nama Menu"
          register={register("name")}
          id="name"
          type="text"
          error={errors.name}
        />
        <Input
          label="Harga"
          placeholder="Harga"
          register={register("price")}
          id="price"
          type="number"
          error={errors.price}
        />
        <Input
          label="Harga Diskon (optional)"
          placeholder="Harga Diskon"
          register={register("discountPrice")}
          id="discountPrice"
          type="number"
          error={errors.price}
        />
        <Input
          label="Deskripsi"
          placeholder="Deskripsi"
          register={register("description")}
          id="description"
          type="textarea"
          error={errors.description}
        />
        <CategoryInput
          categories={categories}
          register={register("categoryId")}
        />
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("available")} />
          <label htmlFor="available">Tersedia</label>
        </div>
        <Button
          className="bg-accent text-primary-foreground py-2"
          type="submit"
        >
          Ubah
        </Button>
      </form>
    </Modal>
  );
}

type ImageInputProps = {
  register: UseFormRegisterReturn;
  imageUrl?: string | null;
};

function ImageInput({ register, imageUrl }: ImageInputProps) {
  return (
    <label
      htmlFor="image"
      className="cursor-pointer relative border rounded-lg overflow-hidden"
    >
      <Image
        src={imageUrl || "/images/menu/menu-placeholder.png"}
        width={300}
        height={300}
        alt="menu image"
        className="w-full max-h-60 object-cover"
      />
      <input type="file" id="image" {...register} className="hidden" />
    </label>
  );
}

type CategoryInputProps = {
  categories?: Category[];
  register: UseFormRegisterReturn;
  error?: FieldError | undefined;
};

function CategoryInput({ categories, register, error }: CategoryInputProps) {
  return (
    <select className="custom-input" {...register} id="categoryId">
      <option value="" disabled>
        Pilih Kategori
      </option>
      {categories?.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
